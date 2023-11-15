import { useEffect, useMemo, useRef } from "react";
import { Ellipse, Transformer } from "react-konva";
import Konva from "konva";
import EllipseEntity from "../../../entities/shapes/Ellipse";
import { useActions, useOperations, useSignal } from "@dilane3/gx";
import {
  NavigationState,
  NavigationsElement,
  ShapeElement,
} from "../../../gx/signals/navigation/types";
import {
  DrawingActions,
  DrawingState,
  DrawingOperations,
} from "../../../gx/signals/drawing/types";
import ShapeFactory from "../../../entities/factories/ShapeFactory";

type Props = {
  shape: EllipseEntity;
};

export default function EllipseUI({ shape }: Props) {
  // Ref
  const shapeRef = useRef<Konva.Ellipse>(null);

  const trRef = useRef<Konva.Transformer>(null);

  // Global state
  const { currentItem } = useSignal<NavigationState>("navigation");

  // Global action
  const { selectShape, updateShape } = useActions<DrawingActions>("drawing");

  // Global state
  const {
    current: file,
    files,
    selectedShapeId,
  } = useSignal<DrawingState>("drawing");

  // Operations
  const { getSelectedShape } = useOperations<DrawingOperations>("drawing");

  const selectedShape = useMemo(() => {
    return getSelectedShape();
  }, [selectedShapeId, JSON.stringify(files)]);

  // Effects
  useEffect(() => {
    if (!shapeRef.current) return;

    shapeRef.current.addEventListener("click", handleSelect);
    shapeRef.current.addEventListener("dragstart", handleSelect);
  }, []);

  useEffect(() => {
    if (!shapeRef.current || !trRef.current) return;

    if (selectedShape?.id === shape.id) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedShape]);

  const handleSelect = () => {
    selectShape(shape.id);
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    if (!file) return;

    // Get new position
    const x = Math.round(e.target.x());
    const y = Math.round(e.target.y());

    // Get a factory
    const shapeFactory = new ShapeFactory();

    // Create a new shape with new position
    const updatedShape = shapeFactory.create(shape.type, {
      ...shape.properties(),
      x,
      y,
    });

    // Update shape
    updateShape({ id: file.id, shape: updatedShape });
  };

  const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    if (!file || !shapeRef.current) return;

    // Get new scale values
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Get new properties
    const radiusX = Math.round(node.radiusX() * scaleX);
    const radiusY = Math.round(node.radiusY() * scaleY);
    const width = Math.round(node.width() * scaleX);
    const height = Math.round(node.height() * scaleY);

    // Get a factory
    const shapeFactory = new ShapeFactory();

    // Create a new shape with new position
    const updatedShape = shapeFactory.create(shape.type, {
      ...shape.properties(),
      x: Math.round(node.x()),
      y: Math.round(node.y()),
      radius: radiusX,
      radiusY,
      width,
      height,
    });

    // Update shape
    updateShape({ id: file.id, shape: updatedShape });

    // Reset scale
    node.scaleX(1);
    node.scaleY(1);
  };

  return (
    <>
      <Ellipse
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        radiusX={shape.radius}
        radiusY={shape.radiusY}
        fill={shape.color}
        draggable={currentItem === NavigationsElement.CURSOR}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />

      {selectedShape?.id === shape.id && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}