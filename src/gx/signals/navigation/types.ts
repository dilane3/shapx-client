export const NavigationsElement = {
  CURSOR: "cursor",
  SHAPE: "shape",
} as const;

export type NavigationsElementType =
  (typeof NavigationsElement)[keyof typeof NavigationsElement];

export const ShapeElement = {
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  ELLIPSE: "ellipse",
  POLYGON: "polygon",
  DIAMOND: "diamond",
} as const;

export type ShapeElementType = (typeof ShapeElement)[keyof typeof ShapeElement];

export type NavigationState = {
  currentItem: NavigationsElementType | null;
  currentShape: ShapeElementType | null;
  fileExplorerOpened: boolean;
};

export type NavigationActions = {
  setCurrentItem: (payload: {
    item: NavigationsElementType;
    shape?: ShapeElementType;
  }) => void;
  setCurrentShape: (payload: ShapeElementType) => void;
  openFileExplorer: () => void;
};
