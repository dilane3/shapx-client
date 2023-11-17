import { useContext, useEffect, useMemo, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import React from "react";
import Layout from "./components/layouts/Layout";
import {
  useActions,
  useAsyncActions,
  useOperations,
  useSignal,
} from "@dilane3/gx";
import {
  DrawingActions,
  DrawingAsyncActions,
  DrawingOperations,
  DrawingState,
} from "./gx/signals/drawing/types";
import {
  NavigationActions,
  NavigationState,
  NavigationsElement,
  ShapeElement,
} from "./gx/signals/navigation/types";
import Rectangle from "./entities/shapes/Rectangle";
import Hexagon from "./entities/shapes/Hexagon";
import Ellipse from "./entities/shapes/Ellipse";
import ShapeFactory from "./entities/factories/ShapeFactory";
import { generateId, sleep } from "./common/utils";
import RectUI from "./components/atoms/Shapes/Rectangle";
import EllipseUI from "./components/atoms/Shapes/Ellipse";
import HexagonUI from "./components/atoms/Shapes/Hexagon";
import Diamond from "./entities/shapes/Diamond";
import DiamondUI from "./components/atoms/Shapes/Diamond";
import { ExportContext } from "./contexts/export";
import File from "./entities/file/File";

function App() {
  // Context
  const { ref: stageRef } = useContext(ExportContext);

  // Reference
  const canvaRef = React.useRef<HTMLElement>(null);
  const drawingContainerRef = React.useRef<HTMLDivElement>(null);

  // Local state
  const [isDrawing, setIsDrawing] = useState(false);
  const [newShapeId, setNewShapeId] = useState<number | null>(null);
  const [update, setUpdate] = useState(false);

  // Global state
  const { currentItem, currentShape } =
    useSignal<NavigationState>("navigation");
  const { current: currentFile, selectedShapeId } = useSignal<DrawingState>("drawing");

  // Operations
  const { getSelectedShape, getCurrentFile } = useOperations<DrawingOperations>("drawing");

  const selectedShape = useMemo(() => {
    return getSelectedShape();
  }, [selectedShapeId, update]);

  const file = useMemo(() => {
    return getCurrentFile();
  }, [currentFile])

  // Global actions
  const { setCurrentItem } = useActions<NavigationActions>("navigation");
  const { addShape, updateShape, selectShape, removeUndesirableShapes } =
    useActions<DrawingActions>("drawing");
  const { createShape: createShapeAsync, updateShape: updateShapeAsync } =
    useAsyncActions<DrawingAsyncActions>("drawing");

  useEffect(() => {
    if (!canvaRef.current) return;

    const canvaElement = canvaRef.current;

    if (currentItem === NavigationsElement.SHAPE) {
      canvaElement.addEventListener("mousedown", handleMouseDown);

      if (isDrawing) {
        canvaElement.addEventListener("mousemove", handleMouseMove);
      }

      canvaElement.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      canvaElement.removeEventListener("mousedown", handleMouseDown);

      canvaElement.removeEventListener("mousemove", handleMouseMove);

      canvaElement.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDrawing, selectedShape, currentItem, currentShape]);

  useEffect(() => {
    if (!drawingContainerRef.current) return;

    // Get viewport dimensions
    const viewportHeight = drawingContainerRef.current.clientHeight;
    const viewportWidth = drawingContainerRef.current.clientWidth;

    const elementRect = drawingContainerRef.current.getBoundingClientRect();

    // Calculate the vertical center position
    const centerY = elementRect.top + File.FILE_HEIGHT / 2 - viewportHeight / 2;
    const centerX = elementRect.left + File.FILE_WIDTH / 2 - viewportWidth / 2;

    // Scroll to the middle of x and y
    drawingContainerRef.current.scrollTo({
      top: centerY,
      left: centerX,
    });
  }, []);

  useEffect(() => {
    const handler = async () => {
      if (!selectedShape || !file) return;

      const shapeData = selectedShape.properties();

      // update the shape on the database
      await updateShapeAsync({
        file_id: file.id,
        id: shapeData.id,
        ...shapeData,
        radius_x: shapeData.radius,
        radius_y: shapeData.radiusY,
      });
    };

    if (update) {
      handler();

      sleep().then(() => {
        setUpdate(false);
      });
    }
  }, [update, JSON.stringify(selectedShape)]);

  // Handlers
  const handleMouseDown = (event: any) => {
    selectShape(null);

    if (!canvaRef.current) return;

    if (currentItem === NavigationsElement.SHAPE) {
      const canvaElement = canvaRef.current;

      setIsDrawing(true);

      const x = event.clientX - canvaElement.getBoundingClientRect().left;
      const y = event.clientY - canvaElement.getBoundingClientRect().top;

      handleDraw({ x, y }); // Draw the shape
    }
  };

  const handleMouseMove = (event: any) => {
    if (!canvaRef.current || !selectedShape || !file) return;

    const canvaElement = canvaRef.current;
    const shapeFactory = new ShapeFactory();

    if (isDrawing && newShapeId === selectedShape.id) {
      const currentX =
        event.clientX - canvaElement.getBoundingClientRect().left;
      const currentY = event.clientY - canvaElement.getBoundingClientRect().top;

      const w = currentX - selectedShape.x;
      const h = currentY - selectedShape.y;

      // Update the shape
      const updatedShape = shapeFactory.create(selectedShape.type, {
        ...selectedShape.properties(),
        width: w,
        side: w,
        height: h,
        radius: w,
        radiusY: h,
      });

      updateShape({ id: file.id, shape: updatedShape });
    }
  };

  const handleMouseUp = () => {
    setCurrentItem({ item: NavigationsElement.CURSOR });
    removeUndesirableShapes();

    setIsDrawing(false);
    setUpdate(true);
  };

  const handleDisplayShapes = () => {
    return file?.shapes.map((shape) => {
      switch (shape.type) {
        case ShapeElement.RECTANGLE:
          return <RectUI key={shape.id} shape={shape as Rectangle} />;

        case ShapeElement.POLYGON:
          return <HexagonUI key={shape.id} shape={shape as Hexagon} />;

        case ShapeElement.ELLIPSE:
          return <EllipseUI key={shape.id} shape={shape as Ellipse} />;

        case ShapeElement.DIAMOND:
          return <DiamondUI key={shape.id} shape={shape as Diamond} />;

        default:
          return null;
      }
    });
  };

  const handleDraw = async (position: { x: number; y: number }) => {
    if (!file || !currentShape) return;

    if (currentItem === NavigationsElement.SHAPE) {
      const shapeFactory = new ShapeFactory();

      // Create a shape
      const shapeId = generateId();
      const shape = shapeFactory.create(currentShape, {
        id: shapeId,
        x: position.x,
        y: position.y,
        color: "#D3D3D3",
        rotate: 0,
        width: 0,
        side: 0,
        height: 0,
        radius: 0,
        radiusY: 0,
      });

      setNewShapeId(shapeId);

      // Add shape to the state
      addShape({ id: file.id, shape });

      const shapeData = shape.properties();

      // Save the shape into the database
      await createShapeAsync({
        file_id: file.id,
        ...shapeData,
        radius_x: shapeData.radius,
        radius_y: shapeData.radiusY,
      });
    }
  };

  const handleDeselect = () => {
    selectShape(null);
  };

  return (
    <Layout>
      <div
        ref={drawingContainerRef}
        className="w-full h-full overflow-auto px-4 py-4 flex"
      >
        {file && (
          <section
            ref={canvaRef}
            style={{
              width: File.FILE_WIDTH,
              height: File.FILE_HEIGHT,
            }}
            className="bg-white"
          >
            <Stage
              id="canva"
              ref={stageRef}
              width={File.FILE_WIDTH}
              height={File.FILE_HEIGHT}
            >
              <Layer>
                <Rect
                  x={0}
                  y={0}
                  width={canvaRef.current?.offsetWidth}
                  height={canvaRef.current?.offsetHeight}
                  fill="#FFF"
                  onClick={handleDeselect}
                />
                {handleDisplayShapes()}
              </Layer>
            </Stage>
          </section>
        )}
      </div>
    </Layout>
  );
}

export default App;
