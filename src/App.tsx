import { useEffect, useMemo, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import React from "react";
import Layout from "./components/layouts/Layout";
import { useActions, useOperations, useSignal } from "@dilane3/gx";
import {
  DrawingActions,
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
import { generateId } from "./common/utils";
import RectUI from "./components/atoms/Shapes/Rectangle";
import EllipseUI from "./components/atoms/Shapes/Ellipse";
import HexagonUI from "./components/atoms/Shapes/Hexagon";
import { Button } from "@material-tailwind/react";
import Konva from "konva";
import Diamond from "./entities/shapes/Diamond";
import DiamondUI from "./components/atoms/Shapes/Diamond";

function App() {
  const canvaRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<Konva.Stage>(null);

  // Local state
  const [isDrawing, setIsDrawing] = useState(false);
  const [newShapeId, setNewShapeId] = useState<number | null>(null);

  // Global state
  const { currentItem, currentShape } =
    useSignal<NavigationState>("navigation");
  const { current: file, selectedShapeId } = useSignal<DrawingState>("drawing");

  // Operations
  const { getSelectedShape } = useOperations<DrawingOperations>("drawing");

  const selectedShape = useMemo(() => {
    return getSelectedShape();
  }, [selectedShapeId]);

  // Global actions
  const { setCurrentItem } = useActions<NavigationActions>("navigation");
  const { addShape, updateShape, selectShape, removeUndesirableShapes } =
    useActions<DrawingActions>("drawing");

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

  const handleDraw = (position: { x: number; y: number }) => {
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
      addShape({ id: file.id, shape });
    }
  };

  const handleExportToImage = () => {
    if (!stageRef.current) return;

    const canvaElement = stageRef.current;

    const dataURL = canvaElement.toDataURL({
      mimeType: "image/png",
      quality: 1,
      pixelRatio: 1,
    });

    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;
    link.click();
  };

  return (
    <Layout>
      <Button className="bg-primary" onClick={handleExportToImage}>Export</Button>
      <div className="w-full h-full bg-whitte overflow-auto">
        <section
          ref={canvaRef}
          style={{
            width: window.innerWidth,
            height: window.innerHeight,
          }}
        >
          <Stage
            id="canva"
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
            scale={{ x: 1, y: 1 }}
            style={{ backgroundColor: "#FFF" }}
            className="w-full h-full"
          >
            <Layer>
              <Rect
                x={0}
                y={0}
                width={window.innerWidth}
                height={window.innerHeight}
                fill="#FFF"
              />
              {handleDisplayShapes()}
            </Layer>
          </Stage>
        </section>
      </div>
    </Layout>
  );
}

export default App;
