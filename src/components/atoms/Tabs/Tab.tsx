import { useActions, useAsyncActions, useSignal } from "@dilane3/gx";
import File from "../../../entities/file/File";
import Icon from "../Icons/Icon";
import { twMerge } from "tailwind-merge";
import {
  DrawingActions,
  DrawingAsyncActions,
  DrawingState,
} from "../../../gx/signals/drawing/types";
import React, { useEffect, useRef, useState } from "react";
import { sleep } from "../../../common/utils";

type Props = {
  file: File;
};

export default function TabItem({ file }: Props) {
  // Local state
  const [isRenaming, setIsRenaming] = useState(false);
  const [update, setUpdate] = useState(false);

  // Global state
  const { current: currentFile } = useSignal<DrawingState>("drawing");

  // Global actions
  const { selectFile, removeFile, renameFile } =
    useActions<DrawingActions>("drawing");
  const { updateFile } = useAsyncActions<DrawingAsyncActions>("drawing");

  // Effects
  useEffect(() => {
    window.addEventListener("click", handleClickSomewhere);

    return () => {
      window.removeEventListener("click", handleClickSomewhere);
    };
  }, [isRenaming]);

  useEffect(() => {
    const handler = async () => {
      // Rename the file on the database
      await updateFile({ id: file.id, name: file.name });
    };

    if (update) {
      handler();
      setIsRenaming(false);

      sleep().then(() => {
        setUpdate(false);
      });
    }

    console.log({ update });
  }, [update]);

  // Handler
  const handleSelectFile = () => {
    if (currentFile?.id !== file.id) selectFile(file);
  };

  const handleCloseFile = () => {
    removeFile({ id: file.id });
  };

  const handleClickSomewhere = () => {
    if (file.name === "") return;

    console.log({ isRenaming, update });

    if (isRenaming) setUpdate(true);
  };

  const handleDoubleClickToRename = () => {
    setIsRenaming(true);
  };

  const handleRenameFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    renameFile({ id: file.id, name: e.target.value });
  };

  return (
    <div
      className={twMerge(
        "relative max-w-[10rem] h-8 rounded-md rounded-b-none px-4 text-[0.8em] transition-all flex items-center",
        currentFile?.id === file.id &&
          "bg-tertiary border-b-[1px] border-b-tertiary"
      )}
      onClick={handleSelectFile}
      onDoubleClick={handleDoubleClickToRename}
    >
      {isRenaming ? (
        <input
          className="outline-none border-0 w-full bg-transparent"
          value={file.name}
          onChange={handleRenameFile}
          autoFocus
        />
      ) : (
        <span className="font-latoRegular text-ellipsis overflow-hidden whitespace-nowrap">
          {`${file.name}.shapx`}
        </span>
      )}

      {currentFile?.id === file.id ? (
        <div
          className="ml-4 rounded-full h-full flex items-center hover:cursor-pointer"
          onClick={handleCloseFile}
        >
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
