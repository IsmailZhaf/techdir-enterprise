import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes";
import { Toaster } from "@/components/ui/sonner";
import { useHydrateAtoms } from "jotai/utils";

import { tokenAtom, userAtom } from "@/atoms/auth";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: false,
        },
    },
});
function HydrateAtoms({ children }: { children: React.ReactNode }) {
    useHydrateAtoms([
        [tokenAtom, localStorage.getItem("auth_token") ? JSON.parse(localStorage.getItem("auth_token")!) : null],
        [userAtom, localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null],
    ]);
    return <>{children}</>;
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <HydrateAtoms>
                    <AppRoutes />
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            style: {
                                background: "white",
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            },
                            classNames: {
                                error: "!bg-red-50 !border-red-200 !text-red-600",
                                success: "!bg-green-50 !border-green-200 !text-green-600",
                                loading: "!bg-tertiary/20 !border-tertiary/40 !text-tertiary",
                            },
                        }}
                    />
                </HydrateAtoms>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
