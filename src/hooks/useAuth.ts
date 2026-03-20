import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { tokenAtom, userAtom } from "@/atoms/auth";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import axios from "axios";

export const useLogin = () => {
    const setToken = useSetAtom(tokenAtom);
    const setUser = useSetAtom(userAtom);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.login,
        onMutate: () => {
            toast.loading("Login..."); // ←
        },
        onSuccess: (data) => {
            toast.dismiss();
            toast.success("Login successful!");
            setTimeout(() => {
                setToken(data.accessToken);
                setUser(data);
                toast.dismiss();
                navigate("/employees");
            }, 1000);
        },
        onError: (error) => {
            toast.dismiss();
            toast.error(axios.isAxiosError(error) ? (error.response?.data?.message ?? "Terjadi kesalahan") : "Terjadi kesalahan");
            console.log("onError: ", error);
        },
    });
};

export const useLogout = () => {
    const setToken = useSetAtom(tokenAtom);
    const setUser = useSetAtom(userAtom);
    const navigate = useNavigate();

    return () => {
        setToken(null);
        setUser(null);
        navigate("/login", { replace: true });
    };
};
