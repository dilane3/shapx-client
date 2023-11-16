import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import GXProvider from "@dilane3/gx";
import store from "./gx/store";
import ExportProvider from "./providers/ExportProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GXProvider store={store}>
    <ExportProvider>
      <App />
    </ExportProvider>
  </GXProvider>
);
