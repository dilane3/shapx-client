import { useRef } from "react";
import { ReactPropsChildren } from "../common/types";
import {
  ExportContext,
  ExportFiles,
  ExportFilesType,
} from "../contexts/export";
import Konva from "konva";
import { useSignal } from "@dilane3/gx";
import { DrawingState } from "../gx/signals/drawing/types";

export default function ExportProvider({ children }: ReactPropsChildren) {
  const ref = useRef<Konva.Stage>(null);

  // Global state
  const { current: file } = useSignal<DrawingState>("drawing");

  // Handlers
  const handleExport = (target: ExportFilesType) => {
    if (!ref.current || !file) return;

    const canvaElement = ref.current;

    if (target === ExportFiles.PNG || target === ExportFiles.JPG) {
      const dataURL = canvaElement.toDataURL({
        mimeType: `image/${target}`,
        quality: 1,
        pixelRatio: 1,
      });

      const link = document.createElement("a");

      link.download = file.name.replace(" ", "-").toLowerCase();
      link.href = dataURL;
      link.click();
    } else {
      // Get encrypted data
      const data = file.exportToShapx();
      const filename = file.name.replace(" ", "-").toLowerCase() + ".shapx";

      // Convert the data to a Blob
      const blob = new Blob([data], { type: "text/plain" });

      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      // Set the filename
      link.download = filename;

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger the click event to download the file
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
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
