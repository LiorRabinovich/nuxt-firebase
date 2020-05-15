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

                return this.$axios.$post(`/posts.json?auth=${vuexContext.state.token}`, createdPost)
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

                return this.$axios.$put(`/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`, editedPost)
                    .then(response => {
                        vuexContext.commit('editPost', editedPost);
                    }).catch(error => {
                        console.log({ error });
                    });
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts);
            },
            authUser(vuexContext, authData) {
                let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;
                if (!authData.isLogin) {
                    authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;
                }

                return this.$axios
                    .$post(authUrl, {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    })
                    .then(result => {
                        vuexContext.commit('setToken', result.idToken);
                        localStorage.setItem('token', result.idToken);
                        localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
                        Cookie.set('jwt', result.idToken);
                        Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }

                    const jwtCookie = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('jwt='));

                    if (!jwtCookie) {
                        return;
                    }

                    token = jwtCookie.split('=')[1];
                    expirationDate = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('expirationDate='))
                        .split('=')[1];
                } else {
                    token = localStorage.getItem('token')
                    expirationDate = localStorage.getItem('tokenExpiration')
                }

                if (new Date().getTime() > +expirationDate || !token) {
                    vuexContext.dispatch('logout');
                    return;
                }

                vuexContext.commit('setToken', token);
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');
                localStorage.removeItem('token')
                localStorage.removeItem('tokenExpiration')
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