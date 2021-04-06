import ReactDOM from "react-dom";

import { GraffitiProvider } from "./context";
import App from "./App";

import "./styles/reset.css";

ReactDOM.render(
  <GraffitiProvider>
    <App />
  </GraffitiProvider>,
  document.getElementById("root")
);
