import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AuthState {
    token: string | null;
    user: any | null;
}

export const auth = {
    namespaced: true,
    state: {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user') || 'null'),
    },
    getters: {
        isAuthenticated: (state: AuthState) => !!state.token,
        getUser: (state: AuthState) => state.user,
    },
    mutations: {
        setToken(state: AuthState, token: string) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        setUser(state: AuthState, user: any) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearAuthData(state: AuthState) {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    actions: {
        async login({ commit }: { commit: Function }, credentials: { email: string, password: string }) {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
                const token = response.data.access_token;
                const user = jwtDecode(token);
                commit('setToken', token);
                commit('setUser', user);
            } catch (error: any) {
                throw new Error(error.response.data.message);
            }
        },
        async register({ commit }: { commit: Function }, userData: any) {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
            } catch (error: any) {
                throw new Error(error.response.data.message);
            }
        },
        logout({ commit }: { commit: Function }) {
            commit('clearAuthData');
        },
        initializeAuth({ commit }: { commit: Function }) {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken: any = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    commit('clearAuthData');
                } else {
                    commit('setToken', token);
                    commit('setUser', decodedToken);
                }
            }
        },
    },
};