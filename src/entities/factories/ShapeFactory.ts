import {
  ShapeElement,
  ShapeElementType,
} from "../../gx/signals/navigation/types";
import Circle from "../shapes/Circle";
import Diamond from "../shapes/Diamond";
import Ellipse from "../shapes/Ellipse";
import Hexagon from "../shapes/Hexagon";
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
          data.rotate,
          data.radius as number
        );

      case ShapeElement.ELLIPSE:
        return new Ellipse(
          data.id,
          data.x,
          data.y,
          data.color,
          data.rotate,
          data.radius as number,
          data.radiusY as number
        );

      case ShapeElement.RECTANGLE:
        return new Rectangle(
          data.id,
          data.x,
          data.y,
          data.color,
          data.rotate,
          data.width as number,
          data.height as number
        );

      case ShapeElement.POLYGON:
        return new Hexagon(
          data.id,
          data.x,
          data.y,
          data.color,
          data.rotate,
          data.radius as number,
          6 // 6 sides for hexagon
        )

      case ShapeElement.DIAMOND: 
          return new Diamond(
            data.id,
            data.x,
            data.y,
            data.color,
            data.rotate,
            data.side as number
          )

      default:
        throw new Error("Invalid shape type");
    }
  }
}
