import ReactDOM from "react-dom/client";
import App, { browserRouter } from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./style.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Provider store={store}>
      <RouterProvider router={browserRouter}>
        <App />
      </RouterProvider>
    </Provider>
  </ChakraProvider>
);
