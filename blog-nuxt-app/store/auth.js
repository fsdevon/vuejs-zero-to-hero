import Cookie from "js-cookie";

export const state = () => ({
  token: null
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  authenticateUser(vuexContext, authData) {
    let authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      process.env.firebaseAPIKey;
    if (!authData.isLogin) {
      authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.firebaseAPIKey;
    }
    return this.$axios
      .$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        vuexContext.commit("setToken", res.idToken);
        localStorage.setItem("token", res.idToken);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
        );
        Cookie.set("jwt", res.idToken);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
        );
        return this.$axios.$post("http://localhost:3000/api/track-data", {
          data: "Authenticated!"
        });
      })
      .catch(e => console.log(e));
  },
  initAuth(vuexContext, req) {
    let token, expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
      const expirationDateCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("expirationDate="));
      if (!expirationDateCookie) {
        return;
      }
      expirationDate = expirationDateCookie.split("=")[1];
    } else {
      token = localStorage.getItem("token");
      expirationDate = localStorage.getItem("tokenExpiration");
    }
    if (new Date().getTime() > expirationDate || !token) {
      vuexContext.dispatch("logout");
      return;
    }
    vuexContext.commit("setToken", token);
  },
  logout(vuexContext) {
    vuexContext.commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.token != null;
  }
};
