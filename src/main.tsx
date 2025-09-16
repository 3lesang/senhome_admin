import { createRoot } from "react-dom/client";
import App from "./App";

const elem = document.getElementById("root");
if (!elem) throw new Error("Root element not found");

createRoot(elem).render(<App />);
