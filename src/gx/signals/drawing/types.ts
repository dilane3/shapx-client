import { AsyncActionResponse } from "@dilane3/gx";
import Shape from "../../../entities/abstraction/Shape";
import File from "../../../entities/file/File";

export type DrawingState = {
  files: Array<File>;
  loading: boolean;
  current: File | null;
  openedFiles: Array<File>;
  selectedShapeId: number | null;
};

export type DrawingActions = {
  loadFiles: (files: Array<File>) => void;

  createFile: (file: File) => void;

  renameFile: (payload: { id: number; name: string }) => void;

  removeFile: (payload: { id: number }) => void;

  selectFile: (file: File) => void;

  addShape: (payload: { id: number; shape: Shape }) => void;

  removeShape: (payload: { id: number; shape: Shape }) => void;

  updateShape: (payload: { id: number; shape: Shape }) => void;

  selectShape: (shapeId: number | null) => void;

  removeUndesirableShapes: () => void;
};

export type DrawingOperations = {
  getSelectedShape: () => Shape | null;

  getCurrentFile: () => File | null;
};

export type DrawingAsyncActions = {
  // Files
  loadFiles: () => AsyncActionResponse<DrawingState, Array<File>>;
  createFile: (data: {
    id: number;
    name: string;
  }) => AsyncActionResponse<DrawingState, boolean | null>;
  updateFile: (data: {
    id: number;
    name: string;
  }) => AsyncActionResponse<DrawingState, boolean | null>;

  // Shapes
  createShape: (data: {
    file_id: number;
    [key: string]: any;
  }) => AsyncActionResponse<DrawingState, boolean | null>;
  updateShape: (data: {
    file_id: number;
    id: number,
    [key: string]: any;
  }) => AsyncActionResponse<DrawingState, boolean | null>;
};
