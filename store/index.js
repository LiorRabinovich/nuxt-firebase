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
            nuxtServerInit(vuexContext, context) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        vuexContext.commit('setPosts', [
                            {
                                id: "1",
                                title: "First Post",
                                previewText: "This id out first post",
                                thumbnail:
                                    "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                content: "Content of the post"
                            },
                            {
                                id: "2",
                                title: "First Post",
                                previewText: "This id out first post",
                                thumbnail:
                                    "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                content: "Content of the post"
                            }
                        ]);
                        resolve();
                    }, 1500);
                });
            },
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