import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
export default function AppRoutes() {
    return (
        <Routes>
            {/* Public route */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes — dibungkus ProtectedRoute */}
            {/* <Route element={<ProtectedRoute />}>
                <Route path="/employees" element={<EmployeeListPage />} />
                <Route path="/employees/:id" element={<EmployeeDetailPage />} />
            </Route> */}

            {/* Fallback — redirect semua route tidak dikenal */}
            {/* <Route path="*" element={<Navigate to="/employees" replace />} /> */}
        </Routes>
    );
}
