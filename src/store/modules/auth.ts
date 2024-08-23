import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AuthState {
    token: string | null;
    user: any | null;
}

export const auth = {
    namespaced: true,
    state: {
        token: null,
        user: null,
    },
    getters: {
        isAuthenticated: (state: AuthState) => !!state.token,
        getUser: (state: AuthState) => state.user,
    },
    mutations: {
        setToken(state: AuthState, token: string) {
            state.token = token;
        },
        setUser(state: AuthState, user: any) {
            state.user = user;
        },
        clearAuthData(state: AuthState) {
            state.token = null;
            state.user = null;
        },
    },
    actions: {
        async login({ commit }: { commit: Function }, credentials: { email: string, password: string }) {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
                commit('setToken', response.data.access_token);
            } catch (error: any) {
                throw new Error(error.response.data.message);
            }
        },
        async register({ commit }: { commit: Function }, userData: any) {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
                commit('setToken', response.data.access_token);
            } catch (error: any) {
                throw new Error(error.response.data.message);
            }
        },
        logout({ commit }: { commit: Function }) {
            commit('clearAuthData');
        },
    },
};