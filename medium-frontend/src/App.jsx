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
      <NewPost />
    </>
  );
}

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/auth", element: <LoginPage /> },
      { path: "/post", element: <Post /> },
    ],
  },
]);

export default App;
