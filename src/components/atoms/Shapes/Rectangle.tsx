import { useEffect, useRef } from "react";
import Rectangle from "../../../entities/shapes/Rectangle";
import { Rect } from "react-konva";
import Konva from "konva";
import { useActions, useSignal } from "@dilane3/gx";
import {
  NavigationState,
  NavigationsElement,
} from "../../../gx/signals/navigation/types";
import { DrawingActions } from "../../../gx/signals/drawing/types";

type Props = {
  shape: Rectangle;
};

export default function RectUI({ shape }: Props) {
  // Ref
  const shapeRef = useRef<Konva.Rect>(null);

  // Global state
  const { currentItem } = useSignal<NavigationState>("navigation");

  // Global action
  const { selectShape } = useActions<DrawingActions>("drawing");

  // Effects
  useEffect(() => {
    if (!shapeRef.current) return;

    shapeRef.current.addEventListener("click", () => {
      selectShape(shape.id);
    });
  }, []);

  return (
    <Rect
      ref={shapeRef}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill={shape.color}
      draggable={currentItem === NavigationsElement.CURSOR}
    />
  );
}
