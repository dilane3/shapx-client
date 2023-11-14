import { useEffect, useMemo, useState } from "react";
import { Stage, Layer } from "react-konva";
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
import RectUI from "./components/atoms/Shapes/Rectangle";
import Rectangle from "./entities/shapes/Rectangle";
import CircleUI from "./components/atoms/Shapes/Circle";
import Circle from "./entities/shapes/Circle";
import { generateId } from "./common/utils";

function App() {
  const canvaRef = React.useRef<HTMLElement>(null);

  // Local state
  const [isDrawing, setIsDrawing] = useState(false);

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
  const { addShape, updateShape } = useActions<DrawingActions>("drawing");

  // useEffect(() => {
  //   if (!canvaRef.current) return;

  //   canvaRef.current.addEventListener("click", handleMouseClick);

  //   return () => {
  //     canvaRef.current?.removeEventListener("click", handleMouseClick);
  //   };
  // }, [currentItem, currentShape, file]);

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

    if (isDrawing) {
      const currentX =
        event.clientX - canvaElement.getBoundingClientRect().left;
      const currentY = event.clientY - canvaElement.getBoundingClientRect().top;

      const w = currentX - selectedShape.x;
      const h = currentY - selectedShape.y;

      // Update the shape
      switch (selectedShape.type) {
        case ShapeElement.RECTANGLE: {
          const shape = new Rectangle(
            selectedShape.id,
            selectedShape.x,
            selectedShape.y,
            selectedShape.color,
            w,
            h
          );

          updateShape({ id: file.id, shape });

          break;
        }

        case ShapeElement.CIRCLE: {
          const shape = new Circle(
            selectedShape.id,
            // (currentX + selectedShape.x)/2,
            // (currentY + selectedShape.y)/2,
            selectedShape.x,
            selectedShape.y,
            selectedShape.color,
            w
          );

          updateShape({ id: file.id, shape });

          break;
        }

        default:
          break;
      }
    }
  };

  const handleMouseUp = () => {
    console.log("finished");

    setIsDrawing(false);
  };

  const handleDisplayShapes = () => {
    return file?.shapes.map((shape) => {
      switch (shape.type) {
        case ShapeElement.RECTANGLE:
          return <RectUI key={shape.id} shape={shape as Rectangle} />;

        case ShapeElement.CIRCLE:
          return <CircleUI key={shape.id} shape={shape as Circle} />;

        default:
          return null;
      }
    });
  };

  const handleDraw = (position: { x: number; y: number }) => {
    if (!file) return;

    if (currentItem === NavigationsElement.SHAPE) {
      // Create a shape
      switch (currentShape) {
        case ShapeElement.RECTANGLE: {
          const shape = new Rectangle(
            generateId(),
            position.x,
            position.y,
            "lightgrey",
            0,
            0
          );

          addShape({ id: file.id, shape });

          console.log({ shape });

          break;
        }

        case ShapeElement.CIRCLE: {
          const shape = new Circle(
            generateId(),
            position.x,
            position.y,
            "lightgrey",
            0
          );

          addShape({ id: file.id, shape });

          break;
        }

        default:
          break;
      }
    }
  };

  return (
    <Layout>
      <section
        ref={canvaRef}
        className="w-full h-full bg-white overflow-hidden"
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          scale={{ x: 1, y: 1 }}
        >
          <Layer>{handleDisplayShapes()}</Layer>
        </Stage>
      </section>
    </Layout>
  );
}

export default App;
