import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { EmployeesListPage } from "./pages/EmployeesListPage";
import { EmployeeDetailPage } from "./pages/EmployeeDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "@/components/Layout";
export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<Layout />}>
                <Route element={<ProtectedRoute />}>
                <Route path="/employees" element={<EmployeesListPage />} />
                <Route path="/employees/:id" element={<EmployeeDetailPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
