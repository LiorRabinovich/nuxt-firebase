import axios from 'axios';
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
                return axios.get('https://nuxt-firebase-226d5.firebaseio.com/posts.json')
                    .then((res) => {
                        const postsArray = [];
                        for (const key in res.data) {
                            postsArray.push({ id: key, ...res.data[key] });
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

                return axios.post("https://nuxt-firebase-226d5.firebaseio.com/posts.json", createdPost)
                    .then(response => {
                        vuexContext.commit('addPost', { ...createdPost, id: response.data.name });
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

                return axios.put(`https://nuxt-firebase-226d5.firebaseio.com/posts/${editedPost.id}.json`, editedPost)
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