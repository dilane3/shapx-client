import { AsyncActionStatuses, useActions, useAsyncActions } from "@dilane3/gx";
import { DrawingActions, DrawingAsyncActions } from "../gx/signals/drawing/types";
import { useEffect } from "react";

export default function useLoadFiles() {
  // Global actions
  const { loadFiles: loadFilesAsync } = useAsyncActions<DrawingAsyncActions>("drawing");
  const { loadFiles } = useActions<DrawingActions>("drawing");

  // Effects
  useEffect(() => {
    handleLoadFiles();
  }, []);

  // Handlers
  const handleLoadFiles = async () => {
    const response = await loadFilesAsync();

    if (response.status === AsyncActionStatuses.FULFILLED) {
      loadFiles(response.data);
    }
  }
}