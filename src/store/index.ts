// @ts-ignore
import { createStore } from 'vuex'
import { auth } from './modules/auth';
import { users } from './modules/users';
import { projects } from './modules/projects';

export default createStore({
    modules: {
        auth,
        users,
        projects
    },
});