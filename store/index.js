import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loaddedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loaddedPosts = posts;
            }
        },
        actions: {
            setPosts(context, posts) {
                context.commit('setPosts', posts);
            }
        },
        getters: {
            loaddedPosts(state) {
                return state.loaddedPosts;
            }
        }
    })
}

export default createStore;