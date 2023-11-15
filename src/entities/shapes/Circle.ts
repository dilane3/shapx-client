import { ShapeElement } from "../../gx/signals/navigation/types";
import Shape from "../abstraction/Shape";

export default class Circle extends Shape {
  private _radius: number;

  static PI: number = Math.PI;

  constructor(id: number, x: number, y: number, color: string, rotate: number, r: number) {
    super(id, ShapeElement.CIRCLE, x, y, color, rotate);

    this._radius = r;
  }

  // Getters
  get radius() {
    return this._radius;
  }

  // Setters
  set radius(r: number) {
    this._radius = r;
  }

  // Methods

  perimeter(): number {
    const P = 2 * Math.abs(this.radius) * Circle.PI;

    // Truncate the result 2 numbers after the comma
    return Math.floor(P * 100) / 100;
  }

  area(): number {
    const A = Circle.PI * Math.pow(this._radius, 2);

    // Truncate the result 2 numbers after the comma
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
    }
  }
}