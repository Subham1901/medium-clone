import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Post from "./components/Post";
import NewPost from "./components/NewPost";

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
    children: [
      { path: "/auth", element: <LoginPage /> },
      { path: "/", element: <Post /> },
      { path: "/create-post", element: <NewPost /> },
    ],
  },
]);

export default App;
