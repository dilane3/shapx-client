import { useEffect, useState } from "react";
import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";
import React from "react";
import Layout from "./components/layouts/Layout";
import { useActions, useSignal } from "@dilane3/gx";
import { DrawingActions, DrawingState } from "./gx/signals/drawing/types";
import { NavigationActions, NavigationState, NavigationsElement, ShapeElement } from "./gx/signals/navigation/types";
import RectUI from "./components/atoms/Shapes/Rectangle";
import Rectangle from "./entities/shapes/Rectangle";
import CircleUI from "./components/atoms/Shapes/Circle";
import Circle from "./entities/shapes/Circle";

function App() {
  const canvaRef = React.useRef<HTMLElement>(null);

  // Global state
  const { current: file } = useSignal<DrawingState>("drawing");
  const { currentItem, currentShape } = useSignal<NavigationState>("navigation");

  // Global actions
  const { setCurrentItem } = useActions<NavigationActions>("navigation");
  const { addShape } = useActions<DrawingActions>("drawing");

  useEffect(() => {
    if (!canvaRef.current) return;

    const canvaElement = canvaRef.current;

    canvaElement.addEventListener("click", (e: any) => handleMouseClick(e, canvaElement));
    
    return () => {
      // canvaElement.removeEventListener("click", (e: any) => handleMouseClick(e, canvaElement));
    }
  }, [currentItem, currentShape, file])

  // useEffect(() => {
  //   if (!circleRef.current) return;

  //   circleRef.current.on("dragstart", () => {
  //     console.log("dragstart");
  //   });

  //   circleRef.current.on("dragend", (data) => {
  //     console.log(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!canvaRef.current) return;

  //   const canvaElement = canvaRef.current;

  //   canvaElement.addEventListener("mousedown", (event: any) =>
  //     handleMouseDown(event, canvaElement)
  //   );

  //   canvaElement.addEventListener("mousemove", (event: any) =>
  //     handleMouseMove(event, canvaElement)
  //   );

  //   canvaElement.addEventListener("mouseup", handleMouseUp);
  //   canvaElement.addEventListener("mouseleave", handleMouseUp);

  //   return () => {
  //     canvaElement.removeEventListener("mousedown", (event: any) =>
  //       handleMouseDown(event, canvaElement)
  //     );

  //     if (isDrawing) {
  //       canvaElement.removeEventListener("mousemove", (event: any) =>
  //         handleMouseMove(event, canvaElement)
  //       );
  //     }

  //     canvaElement.removeEventListener("mouseup", handleMouseUp);
  //     canvaElement.removeEventListener("mouseleave", handleMouseUp);
  //   };
  // }, [position, dimension, isDrawing]);

  // // Handlers
  // const handleMouseDown = (event: any, canvaElement: any) => {
  //   setIsDrawing(true);

  //   const x = event.clientX - canvaElement.getBoundingClientRect().left;
  //   const y = event.clientY - canvaElement.getBoundingClientRect().top;

  //   setPosition({ x, y });
  // };

  // const handleMouseMove = (event: any, canvaElement: any) => {
  //   if (isDrawing) {
  //     const currentX = event.clientX - canvaElement.getBoundingClientRect().left;
  //     const currentY = event.clientY - canvaElement.getBoundingClientRect().top;

  //     const w = currentX - position.x;
  //     const h = currentY - position.y;

  //     setDimension({ w, h });
  //   }
  // };

  // const handleMouseUp = (event: any) => {
  //   console.log({
  //     ...position,
  //     ...dimension,
  //   });
  //   console.log("finished")

  //   setIsDrawing(false)
  // };

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

  const handleMouseClick = (event: any, canvaElement: HTMLElement) => {
    console.log({ file, currentItem, currentShape })

    if (!file) return;

    if (currentItem === NavigationsElement.SHAPE) {
      const x = event.clientX - canvaElement.getBoundingClientRect().left;
      const y = event.clientY - canvaElement.getBoundingClientRect().top;
  
      // Create a shape
      switch(currentShape) {
        case ShapeElement.RECTANGLE: {
          const shape = new Rectangle(3, x, y, "blue", 100, 100);

          addShape({ id: file.id, shape });

          break;
        }

        case ShapeElement.CIRCLE: {
          const shape = new Circle(3, x, y, "red", 100);

          addShape({ id: file.id, shape });

          break;
        }

        default: break;
      }
    }
  }

  return (
    <Layout>
      <section ref={canvaRef} className="w-full h-full bg-white overflow-auto">
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
