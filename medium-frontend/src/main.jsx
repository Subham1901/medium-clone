import React from "react";
import ReactDOM from "react-dom/client";
import App, { browserRouter } from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./style.css";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={browserRouter}>
        <App />
      </RouterProvider>
    </ChakraProvider>
  </React.StrictMode>
);
