import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
import { Outlet, createBrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/auth", element: <LoginPage /> }],
  },
]);

export default App;
