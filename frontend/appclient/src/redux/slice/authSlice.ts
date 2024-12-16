import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../service/authService";

// Define the parameter type for the thunk
interface LoginPayload {
    userId: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: LoginResponse | null; // Use the `LoginResponse` type or define a custom user type
    error: string | null;
    loading: boolean;
}
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
    "auth/loginUser",
    async ({ userId, password }, { rejectWithValue }) => {
        try {
            const data = await authService.loginUser(userId, password);
            return data;
        } catch (error) {
            return rejectWithValue( error.response?.data || "Network Error");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = "An error occurred during login.";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
