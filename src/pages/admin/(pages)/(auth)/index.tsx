import NeveComponent from "@/pages/(public)/components/neve/neve";
import { Outlet } from "react-router-dom";

export default function AuthAdminLayout() {
    return (
        <>
        <NeveComponent />
            <Outlet />
        </>
    )
}