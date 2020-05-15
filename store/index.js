import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loaddedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loaddedPosts = posts;
            },
            addPost(state, post) {
                state.loaddedPosts.push(post);
            },
            editPost(state, editedPost) {
                const postIndex = state.loaddedPosts.findIndex(post => {
                    return post.id === editedPost.id
                });

                state.loaddedPosts[postIndex] = editedPost;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.$get('/posts.json')
                    .then((data) => {
                        const postsArray = [];
                        for (const key in data) {
                            postsArray.push({ id: key, ...data[key] });
                        }
                        vuexContext.commit('setPosts', postsArray)
                    })
                    .catch((error) => {
                        console.log({ error });
                    });
            },
            addPost(vuexContext, postData) {
                const createdPost = {
                    ...postData,
                    updatedDate: new Date()
                };

                return this.$axios.$post("/posts.json", createdPost)
                    .then(data => {
                        vuexContext.commit('addPost', { ...createdPost, id: data.name });
                    })
                    .catch(error => {
                        console.log({ error });
                    });
            },
            editPost(vuexContext, postData) {
                const editedPost = {
                    ...postData,
                    updatedDate: new Date()
                }

                return this.$axios.$put(`/posts/${editedPost.id}.json`, editedPost)
                    .then(response => {
                        vuexContext.commit('editPost', editedPost);
                    }).catch(error => {
                        console.log({ error });
                    });
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts);
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