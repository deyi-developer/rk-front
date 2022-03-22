const state = {
  lightLevel: 0,
};

const mutations = {
  SET_LEVEL(state, value) {
    console.log(state, value);
    state.lightLevel = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
