import { createSignal } from "@dilane3/gx";
import {
  NavigationState,
  NavigationsElement,
  NavigationsElementType,
  ShapeElement,
  ShapeElementType,
} from "./types";

export const navigationSignal = createSignal<NavigationState>({
  name: "navigation",
  state: {
    currentItem: NavigationsElement.CURSOR,
    currentShape: ShapeElement.RECTANGLE,
  },
  actions: {
    setCurrentItem: (
      state,
      payload: { item: NavigationsElementType; shape?: ShapeElementType }
    ) => {
      state.currentItem = payload.item;

      if (payload.shape) state.currentShape = payload.shape;

      return state;
    },
    setCurrentShape: (state, payload) => {
      state.currentShape = payload;
      state.currentItem = NavigationsElement.SHAPE;

      return state;
    },
  },
});
