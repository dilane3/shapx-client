import { useAsyncActions } from "@dilane3/gx";
import { DrawingAsyncActions } from "../gx/signals/drawing/types";
import { useEffect } from "react";

export default function useLoadFiles() {
  // Global actions
  const { loadFiles } = useAsyncActions<DrawingAsyncActions>("drawing");

  // Effects
  useEffect(() => {
    handleLoadFiles();
  }, []);

  // Handlers
  const handleLoadFiles = async () => {
    const response = await loadFiles();

    console.log(response);
  }
}