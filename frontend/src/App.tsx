import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./features/Home";
import { Room } from "./features/room/Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Room />,
  },
  {
    path: "*",
    element: <div>NoMatch</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
