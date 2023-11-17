import { createAsyncAction } from "@dilane3/gx";
import instance from "../../../api";
import Shape from "../../../entities/abstraction/Shape";
import ShapeFactory from "../../../entities/factories/ShapeFactory";
import File from "../../../entities/file/File";

// Async actions for files
export const loadFiles = createAsyncAction(async () => {
  const response = await instance.get("/files");

  if (response.data) {
    const data = response.data;

    // Get factory
    const shapeFactory = new ShapeFactory();

    const files: Array<File> = [];

    for (const fileData of data.data) {
      const shapes: Array<Shape> = fileData.shapes.map((shape: any) => {
        return shapeFactory.create(shape.type, shape);
      });

      const file = new File(fileData.id, fileData.name, shapes);

      files.push(file);
    }

    return files;
  }

  return [];
});

export const createFile = createAsyncAction(
  async (data: { id: number; name: string }) => {
    const response = await instance.post("/files", data);

    if (response.data) {
      return true;
    }

    return null;
  }
);

export const updateFile = createAsyncAction(
  async (data: { id: number, name: string }) => {
    const response = await instance.patch(`/files/${data.id}`, { name: data.name });

    if (response.data) {
      return true;
    }

    return null;
  }
);


// Async actions for shapes
export const createShape = createAsyncAction(
  async (data: { file_id: number, [key: string]: any }) => {
    const response = await instance.post("/shapes", data);

    if (response.data) {
      return true;
    }

    return null;
  }
);

export const updateShape = createAsyncAction(
  async (data: { file_id: number, id: number, [key: string]: any }) => {
    const response = await instance.patch(`/shapes/${data.id}`, data);

    if (response.data) {
      return true;
    }

    return null;
  }
);

export const deleteShape = createAsyncAction(
  async (id: number) => {
    const response = await instance.delete(`/shapes/${id}`);

    if (response.data) {
      return true;
    }

    return null;
  }
);