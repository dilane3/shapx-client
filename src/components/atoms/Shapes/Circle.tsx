import { useRef } from "react";
import { Circle } from "react-konva";
import Konva from "konva";
import CircleEntity from "../../../entities/shapes/Circle";

type Props = {
  shape: CircleEntity
}

export default function CircleUI({ shape }: Props) {
  // Ref
  const shapeRef = useRef<Konva.Circle>(null)

  return (
    <Circle
      ref={shapeRef}
      x={shape.x}
      y={shape.y}
      radius={shape.radius}
      fill={shape.color}
      draggable
    />
  );
}
