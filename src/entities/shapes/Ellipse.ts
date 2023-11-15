import { ShapeElement } from "../../gx/signals/navigation/types";
import Circle from "./Circle";

export default class Ellipse extends Circle {
  private _radiusY: number;

  constructor(
    id: number,
    x: number,
    y: number,
    color: string,
    rotate: number,
    rx: number,
    ry: number
  ) {
    super(id, x, y, color, rotate, rx);

    this._radiusY = ry;
    this.type = ShapeElement.ELLIPSE;
  }

  // Getters

  get radiusY() {
    return this._radiusY;
  }

  // Setters

  set radiusY(ry: number) {
    this._radiusY = ry;
  }

  // Methods

  /**
   * This method calculate the perimeter of an ellipse based on the formula of Ramanujan
   *
   * When radiusX = radiusY, the formula becomes P = 2πR
   */
  perimeter(): number {
    const P =
      Ellipse.PI *
      (3 * (this.radius + this.radiusY) -
        Math.sqrt(
          (3 * this.radius + this.radiusY) * (this.radius + 3 * this.radiusY)
        ));

    // Truncate the result 2 numbers after the result
    return Math.floor(P * 100) / 100;
  }

  area(): number {
    const A = Ellipse.PI * this.radius * this.radiusY;

    // Truncate the result 2 numbers after the result
    return Math.floor(A * 100) / 100;
  }

  // Extra methods
  /**
   * Return the properties of the shape
   */
  properties(): any {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      color: this.color,
      radius: this.radius,
      radiusY: this.radiusY,
    };
  }
}
