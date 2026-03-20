import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginPage } from "./LoginPage";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockMutate = vi.fn();
vi.mock("@/hooks/useAuth", () => ({
    useLogin: () => ({
        mutate: mockMutate,
    }),
}));

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
});

const renderLoginPage = () =>
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        </QueryClientProvider>,
    );

describe("LoginPage", () => {
    beforeEach(() => {
        mockMutate.mockClear();
    });

    it("Menampilkan halaman untuk login", () => {
        renderLoginPage();
        expect(screen.getByText("TechDir Enterprise")).toBeInTheDocument();
        expect(screen.getByText("Employee Directory")).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });

    it("Menampilkan error ketika username dan password kosong saat form disubmit", async () => {
        renderLoginPage();
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
        await waitFor(() => {
            expect(screen.getByText("Username is required")).toBeInTheDocument();
            expect(screen.getByText("Password length must be at least 6 characters")).toBeInTheDocument();
        });
    });

    it("Menampilkan error ketika username kosong", async () => {
        renderLoginPage();
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "123456" },
        });
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
        await waitFor(() => {
            expect(screen.getByText("Username is required")).toBeInTheDocument();
        });
    });

    it("Menampilkan error ketika password kosong atau kurang dari 6 karakter", async () => {
        renderLoginPage();
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "ismail" },
        });
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
        await waitFor(() => {
            expect(screen.getByText("Password length must be at least 6 characters")).toBeInTheDocument();
        });
    });

    it("Memanggil mutate ketika form disubmit", async () => {
        renderLoginPage();
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "ismail" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "123456" },
        });
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalled();
        });
    });

    it("Toggle show/hide password berfungsi", () => {
        renderLoginPage();
        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toHaveAttribute("type", "password");

        const toggleButton = screen.getByRole("button", { name: "toggle visibility" });
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "text");

        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "password");
    });
});
