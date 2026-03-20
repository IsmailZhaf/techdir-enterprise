import { jwtDecode } from "jwt-decode";



export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        const currentTime = Date.now() / 1000; // convert ke detik
        return decoded.exp < currentTime;
    } catch {
        return true; 
    }
};

export const getTokenExpiry = (token: string): number | null => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.exp * 1000; // convert ke milliseconds
    } catch {
        return null;
    }
};
