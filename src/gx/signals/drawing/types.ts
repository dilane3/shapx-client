import Shape from "../../../entities/abstraction/Shape";
import File from "../../../entities/file/File";

export type DrawingState = {
  files: Array<File>,
  loading: boolean,
  current: File | null,
  selectedShape: Shape | null
};

export type DrawingActions = {
  loadFiles: (files: Array<File>) => void,

  createFile: (file: File) => void,

  renameFile: (payload: { id: number; name: string }) => void,

  addShape: (payload: { id: number, shape: Shape }) => void,

  removeShape: (payload: { id: number, shape: Shape }) => void,

  updateShape: (payload: { id: number, shape: Shape }) => void,

  selectShape: (shape: Shape) => void,
};