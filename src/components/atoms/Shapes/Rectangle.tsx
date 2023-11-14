import { useEffect, useMemo, useRef } from "react";
import Rectangle from "../../../entities/shapes/Rectangle";
import { Rect, Transformer } from "react-konva";
import Konva from "konva";
import { useActions, useOperations, useSignal } from "@dilane3/gx";
import {
  NavigationState,
  NavigationsElement,
} from "../../../gx/signals/navigation/types";
import {
  DrawingActions,
  DrawingOperations,
  DrawingState,
} from "../../../gx/signals/drawing/types";

type Props = {
  shape: Rectangle;
};

export default function RectUI({ shape }: Props) {
  // Ref
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  // Global state
  const { currentItem } = useSignal<NavigationState>("navigation");

  // Global action
  const { selectShape } = useActions<DrawingActions>("drawing");

  // Global state
  const { files, selectedShapeId } = useSignal<DrawingState>("drawing");

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

  return (
    <>
      <Rect
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        fill={shape.color}
        draggable={currentItem === NavigationsElement.CURSOR}
        // stroke={selectedShape?.id === shape.id ? "#FF626B" : "transparent"}
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
