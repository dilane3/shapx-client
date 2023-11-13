import Shape from "./Shape";

export default interface IFile {
  /**
   * This function add a new shape into a file
   * @param shape Shape
   */
  add(shape: Shape): void;

  /**
   * This function remove a shape from a file
   * @param shape Shape
   */
  remove(shape: Shape): void;
}
