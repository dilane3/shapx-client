import { useActions, useSignal } from "@dilane3/gx";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import {
  NavigationActions,
  NavigationState,
} from "../../gx/signals/navigation/types";
import FileItem from "./FileItem";
import { DrawingState } from "../../gx/signals/drawing/types";

export default function FileExplorer() {
  // Global state
  const { fileExplorerOpened } = useSignal<NavigationState>("navigation");
  const { files } = useSignal<DrawingState>("drawing");

  // Global actions
  const { openFileExplorer } = useActions<NavigationActions>("navigation");

  return (
    <Dialog
      open={fileExplorerOpened}
      size={"xl"}
      handler={openFileExplorer}
      className="bg-secondary"
    >
      <DialogHeader className="text-white font-latoBlack flex justify-center w-full">
        Select a file to load
      </DialogHeader>
      <hr className="border-gray" />

      <DialogBody className="min-h-[20rem] h-full flex flex-row gap-3 flex-wrap overflow-x-auto">
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={openFileExplorer}
          className="mr-1 bg-primary text-white font-latoBold"
        >
          <span>Close</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
