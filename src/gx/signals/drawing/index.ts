import { createSignal } from "@dilane3/gx";
import { DrawingState } from "./types";
import File from "../../../entities/file/File";
import Shape from "../../../entities/abstraction/Shape";

const file = new File(1, "My drawing");

export const drawingSignal = createSignal<DrawingState>({
  name: "drawing",
  state: {
    files: [file],
    loading: true,
    current: file,
    selectedShapeId: null
  },
  actions: {
    loadFiles: (state, files: Array<File>) => {
      state.files = files;
      state.loading = false;

      return state;
    },

    createFile: (state, file: File) => {
      state.files.push(file);
      state.current = file;

      return state;
    },

    renameFile: (state, payload: { id: number; name: string }) => {
      // Find the file by id
      const file = state.files.find(file => file.id === payload.id);

      if (file) {
        file.name = payload.name;
      }

      return state;
    },

    addShape: (state, payload: { id: number, shape: Shape }) => {
      // Find the file by id
      const file = state.files.find(file => file.id === payload.id);

      if (file) {
        file.add(payload.shape);
        state.selectedShapeId = payload.shape.id;
      }

      return state;
    },

    removeShape: (state, payload: { id: number, shape: Shape }) => {
      // Find the file by id
      const file = state.files.find(file => file.id === payload.id);

      if (file) {
        file.remove(payload.shape);
      }

      return state;
    },

    updateShape: (state, payload: { id: number, shape: Shape }) => {
      // Find the file by id
      const file = state.files.find(file => file.id === payload.id);

      if (file) {
        file.updateShape(payload.shape);
      }

      return state;
    },

    selectShape: (state, shapeId: number) => {
      state.selectedShapeId = shapeId;

      return state;
    } 
  },

  // List of operations
  operations: {
    getSelectedShape: (state) => {
      if (state.selectedShapeId) {
        const file = state.files.find(file => file.id === state.current?.id);

        if (file) {
          return file.getShape(state.selectedShapeId);
        }
      }

      return null;
    },

    getCurrentFile: (state) => {
      if (state.current) {
        return state.files.find(file => file.id === state.current?.id)
      }

      return null;
    }
  }
});