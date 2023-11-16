import { useActions, useSignal } from "@dilane3/gx";
import NavItem from "../atoms/NavItems/NavItem";
import {
  NavigationState,
  NavigationsElement,
  ShapeElement,
} from "../../gx/signals/navigation/types";
import Icon from "../atoms/Icons/Icon";
import { twMerge } from "tailwind-merge";
import { useContext, useRef, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ExportContext,
  ExportFiles,
  ExportFilesType,
} from "../../contexts/export";
import { generateId, sleep } from "../../common/utils";
import { DrawingActions, DrawingState } from "../../gx/signals/drawing/types";
import FileEntity from "../../entities/file/File";
import TabItem from "../atoms/Tabs/Tab";

export default function Navbar() {
  // Reference
  const inputRef = useRef<HTMLInputElement>(null);

  // Context
  const { exportTo } = useContext(ExportContext);

  // Local state
  const [isHovered, setIsHovered] = useState(false);

  // Global state
  const { currentItem, currentShape } =
    useSignal<NavigationState>("navigation");
  const { openedFiles, current: file } = useSignal<DrawingState>("drawing");

  // Global actions
  const { selectShape, createFile } = useActions<DrawingActions>("drawing");

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

  const handleExportTo = async (target: ExportFilesType) => {
    selectShape(null);

    await sleep(2000);

    exportTo(target);
  };

  const handleLoadShapxFile = (file: File) => {
    // Read content
    const reader = new FileReader();

    reader.onload = function (e) {
      if (!e.target) return;

      const fileContent = e.target.result as string;

      const loadedFile = FileEntity.loadShapxData(fileContent);

      createFile(loadedFile);
    };

    // Read the file as text
    reader.readAsText(file);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const file = e.target.files[0];

      const extension = file.name.split(".")[1];

      if (extension.toLowerCase() !== "shapx")
        throw new Error("Only SHAPX files are supported");

      handleLoadShapxFile(file);
    }
  };

  const handleOpenFileExplorer = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleCreateNewFile = () => {
    const file = new FileEntity(generateId(), "Untitled");

    createFile(file);
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

            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={handleChangeFile}
              accept=".shapx"
            />
          </div>
        </MenuHandler>
        <MenuList className="bg-secondary w-[14rem] border-0 border-t-[1px] border-gray rounded-none shadow-md shadow-tertiary mt-2 ml-2 px-0 py-1">
          <MenuItem
            className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
            onClick={handleCreateNewFile}
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
            onClick={handleOpenFileExplorer}
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
                <MenuItem
                  className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
                  onClick={() => handleExportTo(ExportFiles.SHAPX)}
                >
                  To SHAPX
                </MenuItem>
                <MenuItem
                  className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
                  onClick={() => handleExportTo(ExportFiles.PNG)}
                >
                  To PNG
                </MenuItem>
                <MenuItem
                  className="text-white font-latoRegular rounded-none px-4 hover:bg-primary-200"
                  onClick={() => handleExportTo(ExportFiles.JPG)}
                >
                  To JPG
                </MenuItem>
              </MenuList>
            </Menu>
          </MenuItem>
        </MenuList>
      </Menu>

      {file && (
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
      )}

      <div className="h-full w-full ml-8 flex flex-row flex-nowrap items-end overflow-auto mt-[1px]">
        {openedFiles.map((file) => (
          <TabItem key={file.id} file={file} />
        ))}
      </div>
    </header>
  );
}
