import { ShapeElement } from "../../gx/signals/navigation/types";
import Shape from "../abstraction/Shape";

export default class Diamond extends Shape {
  /**
   * Value of the side of the diamond
   */
  private _side: number;

  constructor(
    id: number,
    x: number,
    y: number,
    color: string,
    rotate: number,
    s: number
  ) {
    super(id, ShapeElement.DIAMOND, x, y, color, rotate);

    this._side = s;
  }

  // Getters

  get side() {
    return this._side;
  }

  get diagonal(): number {
    return (Math.sqrt(2) * this.side);
  }

  // Setters

  set side(s: number) {
    this._side = s;
  }

  perimeter(): number {
    const P = this.side * 4;

    // Truncate the result 2 numbers after the comma
    return Math.floor(P * 100) / 100;
  }

  area(): number {
    const A = Math.pow(this.diagonal, 2) / 2;

    // Truncate the result 2 numbers after the comma
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
      side: this.side,
    };
  }
}
