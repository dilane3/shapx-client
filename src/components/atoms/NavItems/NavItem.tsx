import React, { useEffect } from "react";
import Icon from "../Icons/Icon";
import { twMerge } from "tailwind-merge";
import {
  NavigationActions,
  NavigationsElementType,
  ShapeElement,
  ShapeElementType,
} from "../../../gx/signals/navigation/types";
import { useActions } from "@dilane3/gx";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

type NavItemProps = {
  icon: string;
  size?: number;
  hasDropdown?: boolean;
  active?: boolean;
  value: NavigationsElementType;
};

export default function NavItem({
  icon,
  hasDropdown = false,
  size = 20,
  active = false,
  value,
}: NavItemProps) {
  // Local state
  const [isHovered, setIsHovered] = React.useState(false);
  const [iconIsHovered, setIconIsHovered] = React.useState(false);

  // Global actions
  const { setCurrentItem, setCurrentShape } =
    useActions<NavigationActions>("navigation");

  // Handlers
  const handleChangeItem = () => {
    setCurrentItem({ item: value });
  };

  const handleChangeShape = (shape: ShapeElementType) => {
    setCurrentShape(shape);
  };

  return (
    <div
      className={twMerge(
        "h-12 w-12 flex flex-row items-center p-1 transition-colors",
        !active
          ? iconIsHovered
            ? "bg-tertiary"
            : "bg-transparent"
          : "bg-primary"
      )}
      onMouseEnter={() => setIconIsHovered(true)}
      onMouseLeave={() => setIconIsHovered(false)}
    >
      <div
        className={twMerge(
          "h-full flex flex-row items-center justify-center",
          hasDropdown ? "w-8" : "w-full"
        )}
        onClick={handleChangeItem}
      >
        <Icon name={icon} size={size} />
      </div>

      {hasDropdown && (
        <Menu
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <MenuHandler>
            <div
              className="h-full flex flex-row items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Icon
                name="chevron-down"
                size={10}
                classes={twMerge(
                  "transition-all",
                  isHovered ? "translate-y-1" : "translate-y-0"
                )}
              />
            </div>
          </MenuHandler>
          <MenuList className="bg-secondary w-[14rem] border-0 border-t-[1px] border-gray rounded-none shadow-md shadow-tertiary mt-2 px-0">
            <MenuItem
              className="text-white font-latoRegular rounded-none px-8 hover:bg-primary-200"
              onClick={() => handleChangeShape(ShapeElement.RECTANGLE)}
            >
              <div className="w-full flex flex-row items-center">
                <Icon name="square" size={16} />
                <span className="ml-4">Rectangle</span>
              </div>
            </MenuItem>
            <MenuItem
              className="text-white font-latoRegular rounded-none px-8 hover:bg-primary-200"
              onClick={() => handleChangeShape(ShapeElement.ELLIPSE)}
            >
              <div className="w-full flex flex-row items-center">
                <Icon name="circle" size={18} />
                <span className="ml-4">Ellipse</span>
              </div>
            </MenuItem>
            <MenuItem
              className="text-white font-latoRegular rounded-none px-8 hover:bg-primary-200"
              onClick={() => handleChangeShape(ShapeElement.DIAMOND)}
            >
              <div className="w-full flex flex-row items-center">
                <Icon name="diamond" size={18} />
                <span className="ml-4">Diamond</span>
              </div>
            </MenuItem>
            <MenuItem
              className="text-white font-latoRegular rounded-none px-8 hover:bg-primary-200"
              onClick={() => handleChangeShape(ShapeElement.POLYGON)}
            >
              <div className="w-full flex flex-row items-center">
                <Icon name="hexagon" size={18} />
                <span className="ml-4">Polygon</span>
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </div>
  );
}
