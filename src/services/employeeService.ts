import api from "./api";

export const employeeServices = {
    getAll: async (page: number, limit: number): Promise<{ users: Employee[]; total: number }> => {
        const skip = page * limit;
        const res = await api.get(`/users?limit=${limit}&skip=${skip}`);
        return res.data;
    },

    getById: async (id: string): Promise<EmployeeDetail> => {
        const res = await api.get(`/users/${id}`);
        return res.data;
    },

    search: async (query: string) => {
        const res = await api.get(`/users/search?q=${query}`);
        return res.data;
    },
};
