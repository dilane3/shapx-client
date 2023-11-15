import { ShapeElement } from "../../gx/signals/navigation/types";
import Shape from "../abstraction/Shape";

export default class Hexagon extends Shape {
  private _sides: number;
  private _radius: number;

  constructor(
    id: number,
    x: number,
    y: number,
    color: string,
    rotate: number,
    r: number,
    s: number
  ) {
    super(id, ShapeElement.POLYGON, x, y, color, rotate);

    this._radius = r;
    this._sides = s;
  }

  // Getters

  get radius() {
    return this._radius;
  }

  get sides() {
    return this._sides;
  }

  // Setters

  set radius(r: number) {
    this._radius = r;
  }

  set sides(s: number) {
    this._sides = s;
  }

  perimeter(): number {
    const P = this.radius * 6;

    // Truncate the result 2 numbers after the result
    return Math.floor(P * 100) / 100;
  }

  area(): number {
    const A = (3 * Math.sqrt(3) * Math.pow(this.radius, 2)) / 2;

    // Truncate the result 2 numbers after the result
    return Math.floor(A * 100) / 100;
  }

  // Extra methods

  /**
   * Return the properties of the shape
   */
  properties() {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      color: this.color,
      rotate: this.rotate,
      radius: this.radius,
      sides: this.sides,
    };
  }
}
