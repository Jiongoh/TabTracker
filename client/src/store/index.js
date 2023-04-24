import Vue from 'vue';
import VueX from 'vuex';
import createPersistedState from "vuex-persistedstate"

Vue.use(VueX);

const actions = {
    setToken({ commit }, token) {
        commit('setToken', token);
    },
    setUser({ commit }, user) {
        commit('setUser', user);
    },
    setBookMark({ commit }, bookmarkList) {
        commit('setBookMark', bookmarkList);
    },
    deleteBookMark({ commit }, index) {
        commit('deleteBookMark', index);
    },
    setHistoryList({ commit }, tabId) {
        commit('setHistoryList', tabId);
    }
};
const mutations = {
    setToken(state, token) {
        state.token = token;
        token ? state.isUserLoggedIn = true : state.isUserLoggedIn = false;
    },
    setUser(state, user) {
        state.user = user;
    },
    setBookMark(state, bookMarkList) {
        state.bookMarkList = bookMarkList;
    },
    deleteBookMark(state, index) {
        state.bookMarkList.splice(index, 1);
    },
    setHistoryList(state, tabId) {
        const index = state.historyList.findIndex(obj => obj.tabId === tabId);
        const now = new Date();
        const currentTime = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '-' + now.getHours() + '-' + now.getMinutes();
        if (index === -1) {
            state.historyList.push({ "tabId": tabId, LastReadingTime: currentTime });
        } else {
            state.historyList.splice(index, 1);
            state.historyList.push({ "tabId": tabId, LastReadingTime: currentTime });
        }
    }
};
const state = {
    token: null,
    user: null,
    isUserLoggedIn: false,
    bookMarkList: [],
    historyList: [],
};

export default new VueX.Store({
    strict: true,
    actions,
    mutations,
    state,
    plugins: [createPersistedState()]
})