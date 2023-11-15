import { useOperations, useSignal, useActions } from "@dilane3/gx";
import {
  DrawingOperations,
  DrawingState,
  DrawingActions,
} from "../../gx/signals/drawing/types";
import { ShapeElement } from "../../gx/signals/navigation/types";
import Circle from "../../entities/shapes/Circle";
import Rectangle from "../../entities/shapes/Rectangle";
import { ChangeEvent, useMemo, useState } from "react";
import ColorPicker from "./ColorPicker";
import Ellipse from "../../entities/shapes/Ellipse";
import ShapeFactory from "../../entities/factories/ShapeFactory";
import Icon from "../atoms/Icons/Icon";
import Diamond from "../../entities/shapes/Diamond";

export default function PropertiesContainer() {
  // Local state
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Global state
  const {
    current: file,
    files,
    selectedShapeId,
  } = useSignal<DrawingState>("drawing");

  // Operations
  const { getSelectedShape } = useOperations<DrawingOperations>("drawing");

  // Global actions
  const { updateShape } = useActions<DrawingActions>("drawing");

  const selectedShape = useMemo(() => {
    return getSelectedShape();
  }, [selectedShapeId, JSON.stringify(files)]);

  // Handlers
  const handleChangeColor = (color: any) => {
    if (!selectedShape || !file) return;

    // Get Factory
    const shapeFactory = new ShapeFactory();

    const shape = shapeFactory.create(selectedShape.type, {
      ...selectedShape.properties(),
      color: color.hex,
    });

    updateShape({ id: file.id, shape });
  };

  const handleChangeProperty = (
    e: ChangeEvent<HTMLInputElement>,
    property: string
  ): void => {
    const value = e.target.value;
    const numberValue = Number(value);

    if (!selectedShape || !file) return;
    if (isNaN(numberValue)) return;

    // Get Factory
    const shapeFactory = new ShapeFactory();

    const shape = shapeFactory.create(selectedShape.type, {
      ...selectedShape.properties(),
      [property]: numberValue,
    });

    updateShape({ id: file.id, shape });
  };

  return (
    <aside className="w-[15rem] h-full border-l-[1px] border-gray">
      {selectedShape && (
        <>
          <div className="px-4 h-10 w-full border-b-[1px] border-gray flex items-center justify-center">
            <span className="font-latoBold text-[0.9em] capitalize">
              {selectedShape.type}
            </span>
          </div>

          <div className="px-4 h-auto w-full border-b-[1px] border-gray flex flex-col gap-2 py-2">
            <span className="text-[0.7rem] font-latoBold ml-2">Parameters</span>

            <div className="flex items-center">
              <div
                className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                title="Position X"
              >
                <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                  X
                </span>
                <input
                  className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default"
                  value={selectedShape.x}
                  onChange={(e) => handleChangeProperty(e, "x")}
                />
              </div>

              <div
                className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                title="Position Y"
              >
                <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                  Y
                </span>
                <input
                  className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default"
                  value={selectedShape.y}
                  onChange={(e) => handleChangeProperty(e, "y")}
                />
              </div>
            </div>

            {selectedShape.type === ShapeElement.RECTANGLE ? (
              <div className="flex items-center">
                <div
                  className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                  title="Width"
                >
                  <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                    W
                  </span>
                  <input
                    className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default"
                    value={(selectedShape as Rectangle).width}
                    onChange={(e) => handleChangeProperty(e, "width")}
                  />
                </div>

                <div
                  className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                  title="Height"
                >
                  <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                    H
                  </span>
                  <input
                    className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default"
                    value={(selectedShape as Rectangle).height}
                    onChange={(e) => handleChangeProperty(e, "height")}
                  />
                </div>
              </div>
            ) : selectedShape.type === ShapeElement.DIAMOND ? (
              <div className="flex items-center">
                <div
                  className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                  title="Side value"
                >
                  <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                    S
                  </span>
                  <input
                    className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default"
                    value={(selectedShape as Diamond).side}
                    onChange={(e) => handleChangeProperty(e, "side")}
                  />
                </div>
              </div>
            ) :null}

            <div className="flex items-center">
              <div
                className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                title="Rotate"
              >
                <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                  <Icon name="arrow-clockwise" size={14} />
                </span>
                <input
                  className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default"
                  value={selectedShape.rotate}
                  onChange={(e) => handleChangeProperty(e, "rotate")}
                />
              </div>
            </div>
          </div>

          <div className="px-4 h-auto w-full border-b-[1px] border-gray flex flex-col gap-2 py-2">
            <span className="text-[0.7rem] font-latoBold ml-2">
              Geometric properties
            </span>

            <div className="flex items-center">
              <div
                className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                title="Perimeter"
              >
                <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                  P
                </span>
                <input
                  className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
                  value={selectedShape.perimeter()}
                  disabled
                />
              </div>

              <div
                className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                title="Area"
              >
                <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                  A
                </span>
                <input
                  className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
                  value={selectedShape.area()}
                  disabled
                />
              </div>
            </div>

            {selectedShape.type === ShapeElement.POLYGON ? (
              <div className="flex items-center">
                <div
                  className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                  title="Radius"
                >
                  <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                    R
                  </span>
                  <input
                    className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default"
                    value={(selectedShape as Circle).radius}
                    onChange={(e) => handleChangeProperty(e, "radius")}
                  />
                </div>
              </div>
            ) : selectedShape.type === ShapeElement.ELLIPSE ? (
              <div className="flex items-center">
                <div
                  className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                  title="Radius X"
                >
                  <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                    RX
                  </span>
                  <input
                    className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default"
                    value={(selectedShape as Ellipse).radius}
                    onChange={(e) => handleChangeProperty(e, "radius")}
                  />
                </div>

                <div
                  className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                  title="Radius Y"
                >
                  <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                    RY
                  </span>
                  <input
                    className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default"
                    value={(selectedShape as Ellipse).radiusY}
                    onChange={(e) => handleChangeProperty(e, "radiusY")}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="px-4 h-auto w-full border-b-[1px] border-gray flex flex-col gap-2 py-2">
            <div className="relative flex flex-col items-start justify-center">
              <span className="text-[0.7rem] font-latoBold ml-2">Fill</span>

              <div
                className="mt-2 w-full flex items-center px-2 py-2 border-[1px] border-transparent hover:border-gray hover:cursor-default"
                onClick={() => setShowColorPicker(true)}
              >
                <div
                  className="w-[20px] h-[20px]"
                  style={{ backgroundColor: selectedShape.color }}
                ></div>
                <span className="uppercase w-full bg-transparent outline-0 font-latoRegular text-[0.7em] ml-2 hover:cursor-default">
                  {selectedShape.color.slice(1)}
                </span>
              </div>

              {showColorPicker && (
                <ColorPicker
                  color={selectedShape.color}
                  onChangeColor={handleChangeColor}
                  onClose={() => setShowColorPicker(false)}
                />
              )}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
