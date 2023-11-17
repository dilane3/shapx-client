import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import GXProvider from "@dilane3/gx";
import store from "./gx/store";
import ExportProvider from "./providers/ExportProvider.tsx";
import FileExplorer from "./components/molecules/FileExplorer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GXProvider store={store}>
    <ExportProvider>
      <>
        <App />
      
        <FileExplorer />
      </>
    </ExportProvider>
  </GXProvider>
);
