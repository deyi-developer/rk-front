import { login } from "@/api/login";
const msg = {
  namespaced: true,
  state: {
    msgArr: []
  },
  mutations: {
    SET_MSG(state, value) {
      state.msgArr = value;
    }
  },
  actions: {
    // 获取msg
    Login({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params)
          .then((res) => {
            commit("SET_MSG", res);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  }
};

export default msg;
