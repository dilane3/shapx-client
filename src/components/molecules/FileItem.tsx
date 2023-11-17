import { useActions } from "@dilane3/gx";
import File from "../../entities/file/File";
import { DrawingActions } from "../../gx/signals/drawing/types";
import { NavigationActions } from "../../gx/signals/navigation/types";

type Props = {
  file: File;
};

export default function FileItem({ file }: Props) {
  // Global actions
  const { loadFile } = useActions<DrawingActions>("drawing");
  const { openFileExplorer } = useActions<NavigationActions>("navigation");

  // Handlers
  const handleLoadFile = () => {
    loadFile(file);

    openFileExplorer();
  };

  return (
    <div
      className="w-[16rem] h-10 rounded-md bg-tertiary transition-all border-[1px] border-transparent hover:border-primary px-4 text-ellipsis whitespace-nowrap overflow-hidden flex items-center font-latoBold text-white"
      onClick={handleLoadFile}
    >
      {file.name + ".shapx"}
    </div>
  );
}
