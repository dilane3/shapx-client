import { Stage } from "konva/lib/Stage";
import { createContext } from "react";

export const ExportFiles = {
  PNG: "png",
  JPG: "jpeg",
  SHAPX: "shapx"
} as const;

export type ExportFilesType = (typeof ExportFiles)[keyof typeof ExportFiles];

export type ExportContextType = {
  ref:  React.RefObject<Stage> | null,
  exportTo: (target: ExportFilesType) => void
}

export const ExportContext = createContext<ExportContextType>({
  ref: null,
  exportTo: (_: ExportFilesType) => {}
});