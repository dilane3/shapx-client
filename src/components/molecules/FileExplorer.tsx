import { useActions, useAsyncActions, useSignal } from "@dilane3/gx";
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
import {
  DrawingActions,
  DrawingAsyncActions,
  DrawingState,
} from "../../gx/signals/drawing/types";
import { generateId } from "../../common/utils";
import File from "../../entities/file/File";

export default function FileExplorer() {
  // Global state
  const { fileExplorerOpened } = useSignal<NavigationState>("navigation");
  const { files } = useSignal<DrawingState>("drawing");

  // Global actions
  const { openFileExplorer } = useActions<NavigationActions>("navigation");
  const { createFile } = useActions<DrawingActions>("drawing");
  const { createFile: createFileAsync } =
    useAsyncActions<DrawingAsyncActions>("drawing");

  // Handlers
  const handleCreateNewFile = async () => {
    const file = new File(generateId(), "Untitled");

    // Adding the file into the state
    createFile(file);

    openFileExplorer();

    // Save file into the database
    await createFileAsync({ id: file.id, name: file.name });
  };

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

      <DialogBody className="h-[20rem] flex flex-row gap-3 flex-wrap overflow-x-auto">
        {files.length > 0 ? (
          files.map((file) => <FileItem key={file.id} file={file} />)
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-white mb-4 font-latoRegular">
              You don't have any work yet.
            </span>
            <Button
              className="px-8 bg-primary text-white font-latoBold text-xs"
              onClick={handleCreateNewFile}
            >
              Create a new file
            </Button>
          </div>
        )}
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
