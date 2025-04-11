import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

//bookstore-h11a.onrender.com/api/auth
export const BASE_URL = "http://localhost:4000/api/auth";
type props = {
     name?: string,
     email: string,
     password: string
}
interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: { name: string; email: string } | null;
    token: string | null;
    error: string | null;
}

interface AuthActions {
    signup: (credentials: props) => Promise<{ success: boolean; message: string } | void>;
    checkAuth: () => Promise<void>;
    login: (credentials: Omit<props, "name">) => Promise<{ success: boolean; message: string } | void>;
    logout: () => Promise<void>;
    setUser: (user: { name: string; email: string } | null) => void;
    setToken: (token: string | null) => void;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
    isLoggedIn: false,
    isLoading: false,
    user: null,
    token: null,
    error: null,

    signup: async ({ name, email, password }: props) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                set({ isLoggedIn: true, user: data.user, token: data.token });

                await AsyncStorage.setItem("token", data.token);
                await AsyncStorage.setItem("user", JSON.stringify(data.user));

                set({ user: data.user, token: data.token });
                return { success: true, message: "User created successfully" };
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            set({ error: error.message });
        }
        set({ error: null });
    },
    checkAuth: async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userJson = await AsyncStorage.getItem("user");
            const user = userJson ? JSON.parse(userJson) : null;

            set({ token, user, isLoggedIn: !!token });
        } catch (error: any) {
            set({ error: error.message });
        }
        set({ error: null });
    },
    login: async ({ email, password }: {email: string,password:string}) => {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                await AsyncStorage.setItem("token", data.token);
                await AsyncStorage.setItem("user", JSON.stringify(data.user));
                set({ isLoggedIn: true, user: data.user, token: data.token });
                return { success: true, message: `login successful ${data.user}` };
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
        set({ error: null });
    },
    logout: async () => {
        set({ isLoggedIn: false, user: null, token: null });
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
    },
    setUser: (user: { name: string; email: string } | null) => {
        set({ user });
    },

    setToken: (token: string | null) => {
        set({ token });
    },
}));

export default useAuthStore;
