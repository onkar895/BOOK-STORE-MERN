import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SearchContextProvider from "./Context/SearchContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SearchContextProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </SearchContextProvider>
  </BrowserRouter>
);
