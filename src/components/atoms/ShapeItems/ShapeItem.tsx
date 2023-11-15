import { useActions, useOperations, useSignal } from "@dilane3/gx";
import Shape from "../../../entities/abstraction/Shape";
import { ShapeElement } from "../../../gx/signals/navigation/types";
import Icon from "../Icons/Icon";
import {
  DrawingActions,
  DrawingOperations,
  DrawingState,
} from "../../../gx/signals/drawing/types";
import { twMerge } from "tailwind-merge";
import { useMemo } from "react";

type Props = {
  shape: Shape;
};

export default function ShapeItem({ shape }: Props) {
  // Global actions
  const { selectShape } = useActions<DrawingActions>("drawing");

  // Global state
  const { files, selectedShapeId } = useSignal<DrawingState>("drawing");

  // Operations
  const { getSelectedShape } = useOperations<DrawingOperations>("drawing");

  const selectedShape = useMemo(() => {
    return getSelectedShape();
  }, [selectedShapeId, JSON.stringify(files)]);

  // Handlers
  const handleGetShapeIcon = () => {
    switch (shape.type) {
      case ShapeElement.RECTANGLE:
        return "square";
      case ShapeElement.CIRCLE:
        return "circle";
      case ShapeElement.ELLIPSE: 
        return "circle";
      case ShapeElement.POLYGON:
        return "hexagon";
      case ShapeElement.DIAMOND:
        return "diamond";
      default:
        return "square";
    }
  };

  const handleSelectShape = () => {
    selectShape(shape.id);
  };

  return (
    <div
      className={twMerge(
        "h-10 w-full transition-colors pl-8 pr-4 flex items-center hover:bg-primary-200 hover:cursor-default",
        selectedShape?.id === shape.id && "bg-primary"
      )}
      onClick={handleSelectShape}
    >
      <Icon name={handleGetShapeIcon()} size={14} />

      <span className="font-latoRegular ml-4 text-[0.7em] capitalize">
        {shape.type}
      </span>
    </div>
  );
}
