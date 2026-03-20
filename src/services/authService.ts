import api from "@/services/api";

export const authService = {
    login: async (data: LoginFormValues): Promise<AuthUser> => {
        const response = await api.post<AuthUser>("/auth/login", data);
        return response.data;
    },
};
