import { Navigate, Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/atoms/auth";

export default function ProtectedRoute() {
    const token = useAtomValue(tokenAtom);

    return token !== null ? <Outlet /> : <Navigate to="/login" replace />;
}
