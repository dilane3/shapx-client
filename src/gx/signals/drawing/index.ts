import { createSignal } from "@dilane3/gx";
import { DrawingState } from "./types";
import File from "../../../entities/file/File";
import Shape from "../../../entities/abstraction/Shape";
import { generateId } from "../../../common/utils";

const file = new File(generateId(), "My drawing");
const file2 = new File(generateId(), "My drawing 2");

export const drawingSignal = createSignal<DrawingState>({
  name: "drawing",
  state: {
    files: [file],
    loading: true,
    current: file,
    openedFiles: [file, file2],
    selectedShapeId: null
  },
  actions: {
    loadFiles: (state, files: Array<File>) => {
      state.files = files;
      state.loading = false;

      return state;
    },

    createFile: (state, file: File) => {
      state.current = file;
      state.openedFiles.push(file);

      return state;
    },

    renameFile: (state, payload: { id: number; name: string }) => {
      // Find the file by id
      const file = state.openedFiles.find(file => file.id === payload.id);

      if (file) {
        file.name = payload.name;
      }

      return state;
    },

    selectFile: (state, file: File) => {
      state.current = file;
      state.selectedShapeId = null;

      return state;
    },

    addShape: (state, payload: { id: number, shape: Shape }) => {
      // Find the file by id
      const file = state.openedFiles.find(file => file.id === payload.id);

      if (file) {
        file.add(payload.shape);
        state.selectedShapeId = payload.shape.id;
      }

      return state;
    },

    removeShape: (state, payload: { id: number, shape: Shape }) => {
      // Find the file by id
      const file = state.openedFiles.find(file => file.id === payload.id);

      if (file) {
        file.remove(payload.shape);
      }

      return state;
    },

    updateShape: (state, payload: { id: number, shape: Shape }) => {
      // Find the file by id
      const file = state.openedFiles.find(file => file.id === payload.id);

      if (file) {
        file.updateShape(payload.shape);
      }

      return state;
    },

    selectShape: (state, shapeId: number | null) => {
      state.selectedShapeId = shapeId;

      return state;
    },

    removeUndesirableShapes: (state) => {
      // Find the file by id
      const file = state.openedFiles.find(file => file.id === state.current?.id);

      if (file) {
        file.removeUndesirableShapes();
      }

      return state;
    }
  },

  // List of operations
  operations: {
    getSelectedShape: (state) => {
      if (state.selectedShapeId) {
        const file = state.openedFiles.find(file => file.id === state.current?.id);

        if (file) {
          return file.getShape(state.selectedShapeId);
        }
      }

      return null;
    },

    getCurrentFile: (state) => {
      if (state.current) {
        return state.openedFiles.find(file => file.id === state.current?.id)
      }

      return null;
    }
  }
});