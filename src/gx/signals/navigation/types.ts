export const NavigationsElement = {
  CURSOR: "cursor",
  SHAPE: "shape",
};

export type NavigationsElementType =
  (typeof NavigationsElement)[keyof typeof NavigationsElement];

export const ShapeElement = {
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  POLYGON: "polygon",
  DIAMOND: "diamond",
};

export type ShapeElementType = (typeof ShapeElement)[keyof typeof ShapeElement];

export type NavigationState = {
  currentItem: NavigationsElementType | null;
  currentShape: ShapeElementType | null;
};

export type NavigationActions = {
  setCurrentItem: (payload: {
    item: NavigationsElementType;
    shape?: ShapeElementType;
  }) => void;
  setCurrentShape: (payload: ShapeElementType) => void;
};
