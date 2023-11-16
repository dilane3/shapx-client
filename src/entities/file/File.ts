import { generateId } from "../../common/utils";
import { ShapeElement } from "../../gx/signals/navigation/types";
import IFile from "../abstraction/File";
import Shape from "../abstraction/Shape";
import ShapeFactory from "../factories/ShapeFactory";
import Diamond from "../shapes/Diamond";
import Ellipse from "../shapes/Ellipse";
import Hexagon from "../shapes/Hexagon";
import Rectangle from "../shapes/Rectangle";

/**
 * Represent a file containing a collection of shapes
 */
export default class File implements IFile {
  private _id: number;
  private _name: string;
  private _shapes: Array<Shape>;

  constructor(id: number, name: string, shapes: Array<Shape> = []) {
    this._id = id;
    this._name = name;
    this._shapes = shapes;
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
    const position = this._shapes.findIndex((shp) => shp.id === shape.id);

    if (position !== -1) {
      // Remove the shape
      this._shapes.splice(position, 1);
    }
  }

  updateShape(shape: Shape): void {
    // Find the position of the given shape
    const position = this._shapes.findIndex((shp) => shp.id === shape.id);

    if (position !== -1) {
      // Update the shape
      this._shapes[position] = shape;
    }
  }

  getShape(shapeId: number) {
    return this._shapes.find((shape) => shape.id === shapeId) || null;
  }

  removeUndesirableShapes() {
    this._shapes = this._shapes.filter((shape) => {
      switch (shape.type) {
        case ShapeElement.ELLIPSE: {
          return (
            (shape as Ellipse).radius > 0 && (shape as Ellipse).radiusY > 0
          );
        }

        case ShapeElement.RECTANGLE: {
          return (
            (shape as Rectangle).width > 0 && (shape as Rectangle).height > 0
          );
        }

        case ShapeElement.DIAMOND: {
          return (shape as Diamond).side > 0;
        }

        case ShapeElement.POLYGON: {
          return (shape as Hexagon).radius > 0;
        }

        default: {
          return true;
        }
      }
    });
  }

  // export to SHAPX file
  exportToShapx() {
    const shapes: Array<{ [key: string]: any }> = [];

    this.shapes.forEach((shape) => {
      shapes.push(shape.properties());
    });

    const fileToExport = {
      id: this.id,
      name: this.name,
      shapes,
    };

    // Convert to string
    const data = JSON.stringify(fileToExport);

    // Convert to base64 data
    const base64 = btoa(data);

    // Get encrypted data
    const encryptedData = `
      This is a SHAPX data file which contains information about your drawing shapes.
      ==============================================================================

      Date of creation: ${new Date(Date.now()).toDateString()}
      Name of file: ${this.name.replace(" ", "-")}.shapx

      ==============================================================================
      Data: <<<${base64}>>>
    `;

    return encryptedData;
  }

  static loadShapxData(data: string) {
    // Get the base64 data
    const base64 = data
      .split("Data: <<<")[1]
      .replace(">>>", "")
      .replace("\n", "")
      .trim();

    // Convert base64 to string
    const stringData = atob(base64);

    // Parse data
    const parsedData = JSON.parse(stringData);

    // Construct shapes
    const shapes: Array<Shape> = [];
    const shapeFactory = new ShapeFactory();

    parsedData.shapes.forEach((shp: any) => {
      const shape = shapeFactory.create(shp.type, shp);

      shapes.push(shape);
    });

    // Create a new file
    const file = new File(generateId(), parsedData.name, shapes);

    return file;
  }
}
