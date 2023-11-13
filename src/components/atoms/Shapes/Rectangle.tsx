import { useRef } from "react";
import Rectangle from "../../../entities/shapes/Rectangle";
import { Rect } from "react-konva";
import Konva from "konva";

type Props = {
  shape: Rectangle
}

export default function RectUI({ shape }: Props) {
  // Ref
  const shapeRef = useRef<Konva.Rect>(null)

  return (
    <Rect
      ref={shapeRef}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill={shape.color}
      draggable
    />
  );
}
