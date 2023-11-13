import { useSignal } from "@dilane3/gx";
import NavItem from "../atoms/NavItems/NavItem";
import {
  NavigationState,
  NavigationsElement,
  ShapeElement,
} from "../../gx/signals/navigation/types";

export default function Navbar() {
  // Global state
  const { currentItem, currentShape } = useSignal<NavigationState>("navigation");

  // Handlers
  const handleGetShapeIcon = () => {
    switch (currentShape) {
      case ShapeElement.RECTANGLE:
        return "square";
      case ShapeElement.CIRCLE:
        return "circle";
      case ShapeElement.POLYGON:
        return "hexagon";
      case ShapeElement.DIAMOND:
        return "diamond";
      default:
        return "square";
    }
  }

  return (
    <header className="w-full h-12 bg-secondary flex justify-start items-center px-8 border-b-[1px] border-gray">
      <span className="font-latoBlack">Shapx</span>

      <div className="ml-8 flex flex-row">
        <NavItem
          icon="cursor"
          active={currentItem === NavigationsElement.CURSOR}
          value={NavigationsElement.CURSOR}
        />
        <NavItem
          icon={handleGetShapeIcon()}
          size={14}
          hasDropdown
          active={currentItem === NavigationsElement.SHAPE}
          value={NavigationsElement.SHAPE}
        />
      </div>
    </header>
  );
}
