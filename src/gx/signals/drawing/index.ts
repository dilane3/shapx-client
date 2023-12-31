import { createSignal } from "@dilane3/gx";
import { DrawingState } from "./types";
import File from "../../../entities/file/File";
import Shape from "../../../entities/abstraction/Shape";
import {
  createFile,
  createShape,
  deleteShape,
  loadFiles,
  updateFile,
  updateShape,
} from "./asyncActions";

export const drawingSignal = createSignal<DrawingState>({
  name: "drawing",
  state: {
    files: [],
    loading: false,
    current: null,
    openedFiles: [],
    selectedShapeId: null,
  },
  actions: {
    loadFiles: (state, files: Array<File>) => {
      state.files = files;
      state.loading = false;

      return state;
    },

    loadFile: (state, file: File) => {
      state.current = file;
      state.openedFiles.push(file);

      return state;
    },

    createFile: (state, file: File) => {
      state.current = file;
      state.openedFiles.push(file);
      state.files.push(file);

      console.log(file);
      return state;
    },

    renameFile: (state, payload: { id: number; name: string }) => {
      // Find the file by id
      const file = state.openedFiles.find((file) => file.id === payload.id);

      if (file) {
        file.name = payload.name;
      }

      return state;
    },

    removeFile: (state, payload: { id: number }) => {
      // Find the file by id
      const index = state.openedFiles.findIndex(
        (file) => file.id === payload.id
      );

      if (index !== -1) {
        state.openedFiles.splice(index, 1);

        if (state.openedFiles.length === 0) {
          state.current = null;
        } else {
          state.current = state.openedFiles[state.openedFiles.length - 1];
        }
      }

      return state;
    },

    selectFile: (state, file: File) => {
      state.current = file;
      state.selectedShapeId = null;

      return state;
    },

    addShape: (state, payload: { id: number; shape: Shape }) => {
      // Find the file by id
      const file = state.openedFiles.find((file) => file.id === payload.id);

      if (file) {
        file.add(payload.shape);
        state.selectedShapeId = payload.shape.id;
      }

      return state;
    },

    removeShape: (state, payload: { id: number; shape: Shape }) => {
      // Find the file by id
      const file = state.openedFiles.find((file) => file.id === payload.id);

      if (file) {
        file.remove(payload.shape);
      }

      return state;
    },

    updateShape: (state, payload: { id: number; shape: Shape }) => {
      // Find the file by id
      const file = state.openedFiles.find((file) => file.id === payload.id);

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
      const file = state.openedFiles.find(
        (file) => file.id === state.current?.id
      );

      if (file) {
        file.removeUndesirableShapes();
      }

      return state;
    },
  },

  // List of operations
  operations: {
    getSelectedShape: (state) => {
      if (state.selectedShapeId) {
        const file = state.openedFiles.find(
          (file) => file.id === state.current?.id
        );

        if (file) {
          return file.getShape(state.selectedShapeId);
        }
      }

      return null;
    },

    getCurrentFile: (state) => {
      if (state.current) {
        return state.openedFiles.find((file) => file.id === state.current?.id);
      }

      return null;
    },
  },

  // Async actions
  asyncActions: (builder) => ({
    // Files handlers
    loadFiles: builder
      .use(loadFiles)
      .onPending((state) => {
        state.loading = true;

        return state;
      })
      .onFulfilled((state, response: Array<File>) => {
        state.loading = false;
        state.files = response;

        return state;
      })
      .onRejected((state, _: any) => {
        state.loading = false;

        return state;
      }),

    createFile: builder.use(createFile).onPending((state) => state),

    updateFile: builder
      .use(updateFile)
      .onPending((state) => state)
      .onFulfilled((state) => {
        return state;
      })
      .onRejected((state) => {
        return state;
      }),

    // Shapes handlers
    createShape: builder
      .use(createShape)
      .onPending((state) => state)
      .onFulfilled((state) => {
        return state;
      })
      .onRejected((state) => {
        return state;
      }),

    updateShape: builder
      .use(updateShape)
      .onPending((state) => state)
      .onFulfilled((state, _: any) => {
        return state;
      })
      .onRejected((state, _) => {
        return state;
      }),

    deleteShape: builder
      .use(deleteShape)
      .onPending((state) => state)
      .onFulfilled((state, _: any) => {
        return state;
      })
      .onRejected((state, _) => {
        return state;
      }),
  }),
});
