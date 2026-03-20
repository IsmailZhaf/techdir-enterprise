import { useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "@/atoms/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isTokenExpired, getTokenExpiry } from "@/lib/jwt";

export const useTokenExpiry = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const [, setUser] = useAtom(userAtom);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        navigate("/login", { replace: true });
        toast.error("Sesi anda telah berakhir, silakan login kembali.");
    }, [navigate, setToken, setUser]);

    useEffect(() => {
        if (!token) return;

        if (isTokenExpired(token)) {
            logout();
            return;
        }

        // Set timer untuk auto logout saat token expired
        const expiry = getTokenExpiry(token);
        if (!expiry) return;

        const timeout = expiry - Date.now();
        const timer = setTimeout(() => {
            logout();
        }, timeout);

        return () => clearTimeout(timer);
    }, [token, logout]);
};
