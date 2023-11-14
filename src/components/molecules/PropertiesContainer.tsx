import { useOperations, useSignal } from "@dilane3/gx";
import { DrawingOperations, DrawingState } from "../../gx/signals/drawing/types";
import { ShapeElement } from "../../gx/signals/navigation/types";
import Circle from "../../entities/shapes/Circle";
import Rectangle from "../../entities/shapes/Rectangle";
import { useMemo } from "react";

export default function PropertiesContainer() {
  // Global state
  const { current: file, files, selectedShapeId } = useSignal<DrawingState>("drawing");

  // Operations
  const { getSelectedShape } = useOperations<DrawingOperations>("drawing");

  const selectedShape = useMemo(() => {
    return getSelectedShape()
  }, [selectedShapeId, JSON.stringify(files)]);

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
            <div className="flex items-center">
              <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
                <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                  X
                </span>
                <input
                  className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
                  value={selectedShape.x}
                />
              </div>

              <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
                <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                  Y
                </span>
                <input
                  className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
                  value={selectedShape.y}
                />
              </div>
            </div>

            {selectedShape.type === ShapeElement.RECTANGLE ? (
              <div className="flex items-center">
                <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
                  <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                    W
                  </span>
                  <input
                    className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
                    value={(selectedShape as Rectangle).width}
                  />
                </div>

                <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
                  <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                    H
                  </span>
                  <input
                    className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
                    value={(selectedShape as Rectangle).height}
                  />
                </div>
              </div>
            ) : selectedShape.type === ShapeElement.CIRCLE ? (
              <div className="flex items-center">
                <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
                  <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                    R
                  </span>
                  <input
                    className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
                    value={(selectedShape as Circle).radius}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="px-4 h-auto w-full border-b-[1px] border-gray flex flex-col gap-2 py-2">
            <div className="flex items-center">
              <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
                <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
                  P
                </span>
                <input
                  className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
                  value={selectedShape.perimeter()}
                  disabled
                />
              </div>

              <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
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
          </div>
        </>
      )}
    </aside>
  );
}
