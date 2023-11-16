import { useActions, useSignal } from "@dilane3/gx";
import File from "../../../entities/file/File";
import Icon from "../Icons/Icon";
import { twMerge } from "tailwind-merge";
import {
  DrawingActions,
  DrawingState,
} from "../../../gx/signals/drawing/types";

type Props = {
  active?: boolean;
  file: File;
};

export default function TabItem({ active = false, file }: Props) {
  // Global state
  const { current: currentFile } = useSignal<DrawingState>("drawing");

  // Global actions
  const { selectFile } = useActions<DrawingActions>("drawing");

  // Handler
  const handleSelectFile = () => {
    if (currentFile?.id !== file.id) selectFile(file);
  };

  return (
    <div
      className={twMerge(
        "relative max-w-[10rem] h-8 rounded-md rounded-b-none px-4 text-[0.8em] transition-all flex items-center",
        currentFile?.id === file.id && "bg-tertiary"
      )}
      onClick={handleSelectFile}
    >
      <span className="font-latoRegular text-ellipsis overflow-hidden whitespace-nowrap">
        {`${file.name}.shapx`}
      </span>

      {currentFile?.id === file.id ? (
        <div className="ml-4 rounded-full h-full flex items-center hover:cursor-pointer">
          <Icon name="x" size={14} classes="mt-1" />
        </div>
      ) : (
        <>
          <span className="absolute h-4 w-[1px] right-0 bg-gray"></span>
          <span className="absolute h-4 w-[1px] left-0 bg-gray"></span>
        </>
      )}
    </div>
  );
}
