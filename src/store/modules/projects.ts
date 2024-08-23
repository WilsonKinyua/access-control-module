import axios from 'axios';
import type { Project } from '@/types/Project';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProjectsState {
    projects: Project[];
    project: Project | null;
}

// Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// request interceptor to include the access token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const projects = {
    namespaced: true,
    state: {
        projects: [],
        project: null,
    },
    getters: {
        allProjects: (state: ProjectsState) => state.projects,
        getProject: (state: ProjectsState) => state.project,
    },
    mutations: {
        setProjects(state: ProjectsState, projects: Project[]) {
            state.projects = projects;
        },
        setProject(state: ProjectsState, project: Project) {
            state.project = project;
        },
        addProject(state: ProjectsState, project: Project) {
            state.projects.push(project);
        },
        updateProject(state: ProjectsState, updatedProject: Project) {
            const index = state.projects.findIndex(project => project.id === updatedProject.id);
            if (index !== -1) {
                state.projects.splice(index, 1, updatedProject);
            }
        },
        removeProject(state: ProjectsState, projectId: number) {
            state.projects = state.projects.filter(project => project.id !== projectId);
        },
    },
    actions: {
        async fetchProjects({ commit }: { commit: Function }) {
            try {
                const response = await axiosInstance.get('/projects');
                commit('setProjects', response.data);
            } catch (error: any) {
                throw new Error(error.response.data.message);
            }
        },
        async fetchProject({ commit }: { commit: Function }, projectId: number) {
            try {
                const response = await axiosInstance.get(`/projects/${projectId}`);
                commit('setProject', response.data);
            } catch (error: any) {
                throw new Error(error.response.data.message);
            }
        },
        async createProject({ commit }: { commit: Function }, projectData: Project) {
            try {
                const response = await axiosInstance.post('/projects', projectData);
                commit('addProject', response.data);
            } catch (error: any) {
                throw new Error(error.response.data.message);
            }
        },
        async updateProject({ commit }: { commit: Function }, { projectId, projectData }: { projectId: number, projectData: Project }) {
            try {
                const response = await axiosInstance.patch(`/projects/${projectId}`, projectData);
                commit('updateProject', response.data);
            } catch (error: any) {
                throw new Error(error.response.data.message);
            }
        },
        async deleteProject({ commit }: { commit: Function }, projectId: number) {
            try {
                await axiosInstance.delete(`/projects/${projectId}`);
                commit('removeProject', projectId);
            } catch (error: any) {
                throw new Error(error.response.data.message);
            }
        },
    },
};