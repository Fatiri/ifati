/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import jwt from "jsonwebtoken";

Vue.use(Vuex);

const state = {
  auth: {
    type: "",
    id: "",
  },
  login: true,
}

const mutations = {
  setAuth(state: any) {
    const token: string = JSON.stringify(localStorage.getItem("token") as string);
    const tokenReplace = token.replaceAll('"', "");
    const tokenData = jwt.decode(tokenReplace);
    tokenData === null ? state.login = false : state.auth = tokenData;
    state.auth.type === "" || state.auth.id === "" ? state.login = false : state.login = true;
  },
  setToken(payload: any) {
    localStorage.setItem("token", payload);
  }
}

const getters = {
  getAuth: (state: any) => {
    return state.token;
  },
  getLoginStatus: (state: any) => {
    return state.login;
  },
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
});
