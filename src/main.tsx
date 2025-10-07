import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { useGoogleAnalytics } from './useGoogleAnalytics'; 

useGoogleAnalytics("G-VE5FFS1TKS");

createRoot(document.getElementById("root")!).render(<App />);
