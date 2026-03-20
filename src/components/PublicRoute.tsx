import { Navigate, Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/atoms/auth";

export default function PublicRoute() {
    const token = useAtomValue(tokenAtom);

    return token !== null ? <Navigate to="/employees" replace /> : <Outlet />;
}
