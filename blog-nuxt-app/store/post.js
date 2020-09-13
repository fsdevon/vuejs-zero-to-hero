export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  },
  addPost(state, post) {
    state.loadedPosts.push(post);
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id === editedPost.id
    );
    state.loadedPosts[postIndex] = editedPost;
  },
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return context.app.$axios
      .$get("/posts.json")
      .then(data => {
        const postsArray = [];
        for (const key in data) {
          postsArray.push({ ...data[key], id: key });
        }
        vuexContext.commit("setPosts", postsArray);
      })
      .catch(e => console.log(e));
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit("setPosts", posts);
  },
  addPost(vuexContext, post) {
    const createdPost = {
      ...post,
      updatedDate: new Date()
    };
    return this.$axios
      .$post(
        "/posts.json?auth=" + vuexContext.rootState.auth.token,
        createdPost
      )
      .then(res => {
        vuexContext.commit("addPost", {
          ...createdPost,
          id: res.name
        });
      })
      .catch(e => console.log(e));
  },
  editPost(vuexContext, editedPost) {
    return this.$axios
      .$put(
        "/posts/" +
          editedPost.id +
          ".json?auth=" +
          vuexContext.rootState.auth.token,
        editedPost
      )
      .then(() => {
        vuexContext.commit("editPost", editedPost);
      })
      .catch(e => console.log(e));
  }
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  }
};
