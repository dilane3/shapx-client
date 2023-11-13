import { createStore } from "@dilane3/gx";
import { navigationSignal } from "../signals/navigation";
import { drawingSignal } from "../signals/drawing";

export default createStore([navigationSignal, drawingSignal]);