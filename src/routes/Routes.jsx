import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Meals from "../pages/Meals/Meals";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../pages/MealDetails/MealDetails";
import Checkout from "../Checkout/Checkout";
import DashboardLayout from "../layouts/DashboardLayout";
import AddMeal from "../pages/Dashboard/Chef/AddMeal";
import PlatformStats from "../pages/Dashboard/Admin/PlatformStats";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>404 Not Found!</div>,
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
    path: "/checkout",
    element: <PrivateRoute><Checkout /></PrivateRoute>
},
{
    path: "add-meal",
    element: <AddMeal />
},
{
    path: "platform-stats",
    element: <PlatformStats />
},
      {
    path: "/meal/:id",
    element: <PrivateRoute><MealDetails /></PrivateRoute>
}
    ],
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "profile",
                element: <div>Welcome to profile dashboard screen context view.</div> // tor structural component boshbe
            },
            // general user routes dummy template injection targets
            { path: "my-orders", element: <div>User core processing billing list database mapping panel.</div> },
            { path: "my-reviews", element: <div>Review components list management panel.</div> },
            // chef and admin dashboard blocks can follow standard tree layout mapping here
        ]
    }
  },
]);