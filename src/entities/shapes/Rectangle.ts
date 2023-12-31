import { ShapeElement } from "../../gx/signals/navigation/types";
import Shape from "../abstraction/Shape";

/**
 * That class represent a Rectangle
 */
export default class Rectangle extends Shape {
  private _width: number;
  private _height: number;

  constructor(id: number, x: number, y: number, c: string, rotate: number, w: number, h: number) {
    super(id, ShapeElement.RECTANGLE, x, y, c, rotate);

    this._width = w;
    this._height = h;
  }

  // Getters

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  // Setters

  set width(w: number) {
    this._width = w;
  }

  set height(h: number) {
    this._height = h;
  }


  // Methods

  perimeter(): number {
    const P = (Math.abs(this.width) + Math.abs(this.height)) * 2;

    // Truncate the result 2 numbers after the comma
    return Math.floor(P * 100) / 100;
  }

  area(): number {
    const A = Math.abs(this.width) * Math.abs(this.height);

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
      rotate: this.rotate,
      width: this.width,
      height: this.height
    }
  }
}