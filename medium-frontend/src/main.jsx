import React from "react";
import ReactDOM from "react-dom/client";
import App, { browserRouter } from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./style.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={browserRouter}>
          <App />
        </RouterProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
