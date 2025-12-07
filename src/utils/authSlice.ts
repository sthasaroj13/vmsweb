"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    username: string | null;
    isAuthenticated: boolean;
    role: string | null

}

// Only access localStorage in the browser
const isBrowser = typeof window !== "undefined";

const initialState: AuthState = {
    accessToken: isBrowser ? localStorage.getItem("accessToken") : null,
    username: isBrowser ? localStorage.getItem("userName") : null,
    role: isBrowser ? localStorage.getItem("role") : null,
    isAuthenticated: isBrowser ? !!localStorage.getItem("accessToken") : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ token: string; username: string; role: string }>
        ) => {
            state.accessToken = action.payload.token;
            state.isAuthenticated = true;
            state.username = action.payload.username // lowercase username
            state.role = action.payload.role;

            if (isBrowser) {
                localStorage.setItem("accessToken", action.payload.token);
                localStorage.setItem("userName", state.username);
                localStorage.setItem("role", state.role);
            }
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.username = null;
            state.role = null;

            if (isBrowser) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userName");
                localStorage.removeItem("role");
            }
        },
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload.toLowerCase().trim();
            if (isBrowser) {
                localStorage.setItem("userName", state.username);
            }
        },
    },
});

export const { login, logout, updateUsername } = authSlice.actions;
export default authSlice.reducer;
