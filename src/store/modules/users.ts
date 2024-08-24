import type { User } from "@/types/User";
import axiosInstance from "../axiosInstance";

interface UsersState {
  users: User[];
  user: User | null;
}

export const users = {
  namespaced: true,
  state: {
    users: [],
    user: null,
  },
  getters: {
    allUsers: (state: UsersState) => state.users,
    getUser: (state: UsersState) => state.user,
  },
  mutations: {
    setUsers(state: UsersState, users: User[]) {
      state.users = users;
    },
    setUser(state: UsersState, user: User) {
      state.user = user;
    },
    addUser(state: UsersState, user: User) {
      state.users.push(user);
    },
    updateUser(state: UsersState, updatedUser: User) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    removeUser(state: UsersState, userId: number) {
      state.users = state.users.filter((user) => user.id !== userId);
    },
  },
  actions: {
    async fetchUsers({ commit }: { commit: Function }) {
      try {
        const response = await axiosInstance.get("/users");
        commit("setUsers", response.data);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    async fetchUser({ commit }: { commit: Function }, userId: number) {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        commit("setUser", response.data);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    async createUser({ commit }: { commit: Function }, userData: User) {
      try {
        const response = await axiosInstance.post("/users", userData);
        commit("addUser", response.data);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    async updateUser(
      { commit }: { commit: Function },
      { userId, userData }: { userId: number; userData: User }
    ) {
      try {
        const response = await axiosInstance.patch(
          `/users/${userId}`,
          userData
        );
        commit("updateUser", response.data);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    async deleteUser({ commit }: { commit: Function }, userId: number) {
      try {
        await axiosInstance.delete(`/users/${userId}`);
        commit("removeUser", userId);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
  },
};
