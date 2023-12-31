import { useEffect, useMemo, useRef } from "react";
import { RegularPolygon, Transformer } from "react-konva";
import Konva from "konva";
import { useActions, useAsyncActions, useOperations, useSignal } from "@dilane3/gx";
import {
  NavigationState,
  NavigationsElement
} from "../../../gx/signals/navigation/types";
import {
  DrawingActions,
  DrawingState,
  DrawingOperations,
  DrawingAsyncActions,
} from "../../../gx/signals/drawing/types";
import ShapeFactory from "../../../entities/factories/ShapeFactory";
import Hexagon from '../../../entities/shapes/Hexagon';

type Props = {
  shape: Hexagon;
};

export default function HexagonUI({ shape }: Props) {
  // Ref
  const shapeRef = useRef<Konva.RegularPolygon>(null);

  const trRef = useRef<Konva.Transformer>(null);

  // Global state
  const { currentItem } = useSignal<NavigationState>("navigation");

  // Global action
  const { selectShape, updateShape } = useActions<DrawingActions>("drawing");
  const { updateShape: updateShapeAsync } =
    useAsyncActions<DrawingAsyncActions>("drawing");

  // Global state
  const {
    current: file,
    openedFiles,
    selectedShapeId,
  } = useSignal<DrawingState>("drawing");

  // Operations
  const { getSelectedShape } = useOperations<DrawingOperations>("drawing");

  const selectedShape = useMemo(() => {
    return getSelectedShape();
  }, [selectedShapeId, JSON.stringify(openedFiles)]);

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

  const handleDragEnd = async (e: Konva.KonvaEventObject<DragEvent>) => {
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

    const shapeData = shape.properties();

    // update the shape on the database
    await updateShapeAsync({
      file_id: file.id,
      ...shapeData,
      x,
      y
    });
  };

  const handleTransformEnd = async (_: Konva.KonvaEventObject<Event>) => {
    if (!file || !shapeRef.current) return;

    // Get new scale values
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Get new properties
    const radius = (Math.round(node.radius() * scaleX) + Math.round(node.radius() * scaleY)) /2;
    const rotate = Math.round(node.rotation());

    // Get a factory
    const shapeFactory = new ShapeFactory();

    // Create a new shape with new position
    const updatedShape = shapeFactory.create(shape.type, {
      ...shape.properties(),
      x: Math.round(node.x()),
      y: Math.round(node.y()),
      rotate,
      radius
    });

    // Reset scale
    node.scaleX(1);
    node.scaleY(1);

    // Update shape
    updateShape({ id: file.id, shape: updatedShape });

    const shapeData = shape.properties();

    // update the shape on the database
    await updateShapeAsync({
      file_id: file.id,
      ...shapeData,
      x: Math.round(node.x()),
      y: Math.round(node.y()),
      rotate,
      radius_x: radius
    });
  };

  return (
    <>
      <RegularPolygon
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        sides={shape.sides}
        radius={shape.radius}
        rotation={shape.rotate}
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
