export const actions = {
  nuxtServerInit(vuexContext, context) {
    return context.app.$axios
      .$get("/posts.json")
      .then(data => {
        const postsArray = [];
        for (const key in data) {
          postsArray.push({ ...data[key], id: key });
        }
        vuexContext.commit("post/setPosts", postsArray);
      })
      .catch(e => console.log(e));
  }
};
