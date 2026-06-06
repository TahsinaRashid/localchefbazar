import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Meals from "../pages/Meals/Meals";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../pages/MealDetails/MealDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>404 Not Found! (Tor custom error page)</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
    path: "/meals",
    element: <Meals />
},
      {
        path: "/register",
        element: <Register />,
      },
      {
    path: "/meal/:id",
    element: <PrivateRoute><MealDetails /></PrivateRoute>
}
    ],
  },
]);