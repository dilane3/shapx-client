import { useSignal } from "@dilane3/gx";
import NavItem from "../atoms/NavItems/NavItem";
import {
  NavigationState,
  NavigationsElement,
  ShapeElement,
} from "../../gx/signals/navigation/types";
import Icon from "../atoms/Icons/Icon";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

export default function Navbar() {
  // Local state
  const [isHovered, setIsHovered] = useState(false);

  // Global state
  const { currentItem, currentShape } =
    useSignal<NavigationState>("navigation");

  // Handlers
  const handleGetShapeIcon = () => {
    switch (currentShape) {
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

  return (
    <header className="w-full h-12 bg-secondary flex justify-start items-center border-b-[1px] border-gray">
      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <div
            className="h-full w-auto px-4 flex items-center justify-center hover:bg-tertiary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="font-latoBlack text-[1.2em]">Shapx</span>

            <div className="h-full flex items-center">
              <Icon
                name="chevron-down"
                size={10}
                classes={twMerge(
                  "transition-all ml-2 flex items-center justify-center",
                  isHovered ? "translate-y-1" : "translate-y-0"
                )}
              />
            </div>
          </div>
        </MenuHandler>
        <MenuList className="bg-secondary w-[14rem] border-0 border-t-[1px] border-gray rounded-none shadow-md shadow-tertiary mt-2 ml-2 px-0 py-1">
          <MenuItem
            className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
            onClick={() => {}}
          >
            <div className="w-full flex flex-row items-center">
              {/* <Icon name="square" size={16} /> */}
              <span className="ml-4">New Drawing</span>
            </div>
          </MenuItem>

          <hr className="my-1 border-gray" />

          <MenuItem
            className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
            onClick={() => {}}
          >
            <div className="w-full flex flex-row items-center">
              {/* <Icon name="square" size={16} /> */}
              <span className="ml-4">Open Existing</span>
            </div>
          </MenuItem>

          <MenuItem
            className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
            onClick={() => {}}
          >
            <div className="w-full flex flex-row items-center">
              {/* <Icon name="square" size={16} /> */}
              <span className="ml-4">Load SHAPX File</span>
            </div>
          </MenuItem>

          <hr className="my-1 border-gray" />

          <MenuItem
            className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
            onClick={() => {}}
          >
            <Menu placement="right-start" allowHover>
              <MenuHandler>
                <div className="w-full flex flex-row items-center">
                  {/* <Icon name="square" size={16} /> */}
                  <span className="ml-4">Export As ...</span>
                </div>
              </MenuHandler>

              <MenuList className="bg-secondary w-[14rem] border-0 border-t-[1px] border-gray rounded-none shadow-md shadow-tertiary mt-2 ml-4 px-0 py-1">
                <MenuItem className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200">To SHAPX</MenuItem>
                <MenuItem className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200">To PNG</MenuItem>
                <MenuItem className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200">To JPG</MenuItem>
              </MenuList>
            </Menu>
          </MenuItem>
        </MenuList>
      </Menu>

      <div className="flex flex-row">
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
