import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}

const loginUser = async (userId: string, password: string) => {
    try{
    const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, { userId, password });
    return response.data; // Adjust based on the API response structure
    } catch (error: any) {
        throw error;
    }
};

export default { loginUser };
