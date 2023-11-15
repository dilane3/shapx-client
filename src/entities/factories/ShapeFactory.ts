import {
  ShapeElement,
  ShapeElementType,
} from "../../gx/signals/navigation/types";
import Circle from "../shapes/Circle";
import Rectangle from "../shapes/Rectangle";
import AbstractShapeFactory, { ShapeData } from "./AbstractFactory";

export default class ShapeFactory extends AbstractShapeFactory {
  create(shapeType: ShapeElementType, data: ShapeData) {
    switch (shapeType) {
      case ShapeElement.CIRCLE:
        return new Circle(
          data.id,
          data.x,
          data.y,
          data.color,
          data.radius as number
        );

      case ShapeElement.RECTANGLE:
        return new Rectangle(
          data.id,
          data.x,
          data.y,
          data.color,
          data.width as number,
          data.height as number
        );
        
      default:
        throw new Error("Invalid shape type");
    }
  }
}
