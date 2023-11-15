import { useOperations, useSignal } from "@dilane3/gx";
import { DrawingOperations, DrawingState } from "../../gx/signals/drawing/types";
import ShapeItem from "../atoms/ShapeItems/ShapeItem";
import { useMemo } from "react";

export default function ShapesContainer() {
  // Global state
  const { files } = useSignal<DrawingState>("drawing");

  // Operations
  const { getCurrentFile } = useOperations<DrawingOperations>("drawing");

  const currentFile = useMemo(() => {
    return getCurrentFile();
  }, [JSON.stringify(files)]);

  return (
    <aside className="w-[15rem] h-full border-r-[1px] border-gray">
      <div className="px-4 h-10 w-full border-b-[1px] border-gray flex items-center">
        <span className="font-latoBold text-[0.9em]">Shapes</span>
      </div>

      <div className="overflow-y-auto h-shape-container">
        {
          currentFile?.shapes.map((shape) => (
            <ShapeItem key={shape.id} shape={shape} />
          ))
        }
      </div>
    </aside>
  )
}