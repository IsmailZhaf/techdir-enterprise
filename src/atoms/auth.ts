import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const tokenAtom = atomWithStorage<string | null>("auth_token", null);
export const userAtom = atomWithStorage<AuthUser | null>("user", null);
export const isAuthenticatedAtom = atom((get) => {
    const token = get(tokenAtom);
    if (token === undefined) return undefined;
    return token !== null;
});
