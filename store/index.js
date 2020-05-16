import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loaddedPosts: [],
            token: null
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
            },
            setToken(state, token) {
                state.token = token;
            },
            clearToken(state) {
                state.token = null;
            }
        },
        actions: {
            async nuxtServerInit(vuexContext, context) {
                return context.app.$fireStore.collection('posts').get()
                    .then(snapshot => {
                        const postsArray = [];
                        snapshot.forEach(doc => {
                            postsArray.push({ id: doc.id, ...doc.data() });
                        });
                        vuexContext.commit('setPosts', postsArray)
                    })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });
            },
            addPost(vuexContext, postData) {
                const createdPost = {
                    ...postData,
                    updatedDate: new Date()
                };

                return this.$fireStore.collection('posts').add(createdPost).then(data => {
                    vuexContext.commit('addPost', { ...createdPost, id: data.name });
                })
            },
            editPost(vuexContext, postData) {
                const editedPost = {
                    ...postData,
                    updatedDate: new Date()
                }

                return this.$fireStore.collection('posts').doc(editedPost.id).set(editedPost).then(data => {
                    vuexContext.commit('editPost', editedPost);
                })
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts);
            },
            authUser(vuexContext, authData) {
                if (authData.isLogin) {
                    return this.$fireAuth.signInWithEmailAndPassword(
                        authData.email,
                        authData.password
                    );
                }

                return this.$fireAuth.createUserWithEmailAndPassword(
                    authData.email,
                    authData.password
                )
            },
            logout(vuexContext) {
                return this.$fireAuth.signOut();
            }
        },
        getters: {
            loaddedPosts(state) {
                return state.loaddedPosts;
            },
            isAuth(state) {
                return state.token != null;
            }
        }
    })
}

export default createStore;