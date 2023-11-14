import IFile from "../abstraction/File";
import Shape from "../abstraction/Shape";

/**
 * Represent a file containing a collection of shapes
 */
export default class File implements IFile {
  private _id: number;
  private _name: string;
  private _shapes: Array<Shape>

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
    this._shapes = [];
  }

  // Getters
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get shapes() {
    return this._shapes;
  }

  // Setters

  /**
   * Useful if we want to rename a file
   */
  set name(name: string) {
    this._name = name;
  }
  
  // Methods
  add(shape: Shape): void {
    this._shapes.push(shape);
  }

  remove(shape: Shape): void {
    // Find the position of the given shape
    const position = this._shapes.findIndex(shp => shp.id === shape.id);

    if (position !== -1) {
      // Remove the shape
      this._shapes.splice(position, 1);
    }
  }

  updateShape(shape: Shape): void {
    // Find the position of the given shape
    const position = this._shapes.findIndex(shp => shp.id === shape.id);

    if (position !== -1) {
      // Update the shape
      this._shapes[position] = shape;
    }
  }

  getShape(shapeId: number) {
    return this._shapes.find(shape => shape.id === shapeId) || null;
  }
}