import { useRef } from "react";
import { ReactPropsChildren } from "../common/types";
import {
  ExportContext,
  ExportFiles,
  ExportFilesType,
} from "../contexts/export";
import Konva from "konva";

export default function ExportProvider({ children }: ReactPropsChildren) {
  const ref = useRef<Konva.Stage>(null);

  // Handlers
  const handleExport = (target: ExportFilesType) => {
    if (!ref.current) return;

    const canvaElement = ref.current;

    if (target === ExportFiles.PNG || target === ExportFiles.JPG) {
      const dataURL = canvaElement.toDataURL({
        mimeType: `image/${target}`,
        quality: 1,
        pixelRatio: 1,
      });

      const link = document.createElement("a");

      link.download = "image.png";
      link.href = dataURL;
      link.click();
    } else {
      // TODO: implement the export feature for shapx file
    }
  };

  const value = {
    ref,
    exportTo: handleExport,
  };

  return (
    <ExportContext.Provider value={value}>{children}</ExportContext.Provider>
  );
}
