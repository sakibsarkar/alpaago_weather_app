import Cursor from "../Components/Cursor/Cursor";
import Navbar from "../Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Cursor />
            <Navbar />
            <Outlet />
        </>
    );
};

export default Layout;