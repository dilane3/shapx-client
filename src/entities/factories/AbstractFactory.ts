import { ShapeElementType } from "../../gx/signals/navigation/types";
import Shape from "../abstraction/Shape";

export type ShapeData = {
  id: number;
  x: number;
  y: number;
  color: string;
  rotate: number;
  width?: number;
  height?: number;
  radius?: number;
  radiusY?: number;
};

export default abstract class AbstractShapeFactory {
  /**
   * This method is the one that will be used by the client code to create the shapes.
   * @param shapeType
   * @param data
   */
  abstract create(shapeType: ShapeElementType, data: ShapeData): Shape;
}
