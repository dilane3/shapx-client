import { ShapeElementType } from "../../gx/signals/navigation/types";

export default abstract class Shape {
  private _id: number;
  private _type: ShapeElementType;
  private _x: number;
  private _y: number;
  private _color: string;
  private _rotate: number;

  constructor(id: number, type: ShapeElementType, x: number, y: number, color: string, rotate: number) {
    this._id = id;
    this._type = type;
    this._x = x;
    this._y = y;
    this._color = color;
    this._rotate = rotate;
  }

  // Getters
  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get color() {
    return this._color;
  }

  get rotate() {
    return this._rotate;
  }

  // Setters
  set type(t: ShapeElementType) {
    this._type = t;
  }

  set rotate(r: number) {
    this._rotate = r;
  }

  // Methods

  /**
   * This method calculate the perimeter of a given Shape
   */
  abstract perimeter(): number;

  /**
   * This method calculate the area of a given Shape
   */
  abstract area(): number;

  // Extra methods
  abstract properties(): any;
}