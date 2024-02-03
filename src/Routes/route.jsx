import Home from "../Pages/Home/Home";
import Layout from "../Layout/Layout";
import ManageUser from "../Pages/ManageUser/ManageUser";
import { createBrowserRouter } from "react-router-dom";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/manage_user",
                element: <ManageUser />
            }
        ]
    }
])