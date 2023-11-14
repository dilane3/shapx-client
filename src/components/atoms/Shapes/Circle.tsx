import { useRef } from "react";
import { Circle } from "react-konva";
import Konva from "konva";
import CircleEntity from "../../../entities/shapes/Circle";
import { useSignal } from "@dilane3/gx";
import { NavigationState, NavigationsElement } from "../../../gx/signals/navigation/types";

type Props = {
  shape: CircleEntity
}

export default function CircleUI({ shape }: Props) {
  // Ref
  const shapeRef = useRef<Konva.Circle>(null)

  // Global state
  const { currentItem } = useSignal<NavigationState>("navigation");

  return (
    <Circle
      ref={shapeRef}
      x={shape.x}
      y={shape.y}
      radius={shape.radius}
      fill={shape.color}
      draggable={currentItem === NavigationsElement.CURSOR}
    />
  );
}
