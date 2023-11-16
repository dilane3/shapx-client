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
import { useMemo, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import ShapeFactory from "../../../entities/factories/ShapeFactory";
import { generateId } from "../../../common/utils";

type Props = {
  shape: Shape;
};

export default function ShapeItem({ shape }: Props) {
  // Local state
  const [menuOpened, setMenuOpened] = useState(false);

  // Global actions
  const { selectShape, addShape, removeShape } =
    useActions<DrawingActions>("drawing");

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

    // close menu
    setMenuOpened(false);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setMenuOpened(true);
  };

  const handleDuplicate = () => {
    if (!file) return;

    // Get Factory
    const shapeFactory = new ShapeFactory();

    const duplicatedShape = shapeFactory.create(shape.type, {
      ...shape.properties(),
      id: generateId(),
    });

    // Add duplicated shape
    addShape({ id: file.id, shape: duplicatedShape });

    // close menu
    setMenuOpened(false);
  };

  const handleRemoveShape = () => {
    if (!file) return;

    // Remove shape
    removeShape({ id: file.id, shape });
  };

  return (
    <div
      className={twMerge(
        "h-10 w-full transition-colors pl-8 pr-4 flex items-center hover:bg-primary-200 hover:cursor-default",
        selectedShape?.id === shape.id && "bg-primary"
      )}
      onClick={handleSelectShape}
      onContextMenu={handleContextMenu}
      onMouseLeave={() => setMenuOpened(false)}
    >
      <Icon name={handleGetShapeIcon()} size={14} />

      <span className="font-latoRegular ml-4 text-[0.7em] capitalize">
        {shape.type}
      </span>

      <Menu
        placement="bottom"
        open={menuOpened}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <span />
        </MenuHandler>
        <MenuList className="bg-secondary w-[14rem] border-0 border-t-[1px] border-gray rounded-none shadow-md shadow-tertiary mt-2 ml-2 px-0 py-1">
          <MenuItem
            className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
            onClick={handleSelectShape}
          >
            Select
          </MenuItem>
          <MenuItem
            className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
            onClick={handleDuplicate}
          >
            Duplicate
          </MenuItem>
          <MenuItem
            className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
            onClick={handleRemoveShape}
          >
            Remove
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
