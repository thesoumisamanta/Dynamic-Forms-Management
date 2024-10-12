import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import FormA from "./pages/FormA";
import FormB from "./pages/FormB";
import Listing from "./pages/Listing";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/form-a",
      element: <FormA />,
    },
    {
      path: "/form-b",
      element: <FormB />,
    },
    {
      path: "/listing",
      element: <Listing />,
    },
  ]);

  return <RouterProvider router={router} />;
}