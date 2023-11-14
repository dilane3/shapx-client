import { ShapeElement } from "../../gx/signals/navigation/types";
import Shape from "../abstraction/Shape";

export default class Circle extends Shape {
  private _radius: number;

  static pi: number = 3.14;

  constructor(id: number, x: number, y: number, color: string, r: number) {
    super(id, ShapeElement.CIRCLE, x, y, color);

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
    return 2 * Math.abs(this.radius) * Circle.pi;
  }

  area(): number {
    return Circle.pi * Math.pow(this._radius, 2);
  }
}