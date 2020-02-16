import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const COVER_URL = [
  require("../assets/cover.jpg"),
  require("../assets/cover2.jpg"),
  require("../assets/cover3.jpg")
];

export default new Vuex.Store({
  state: {
    isPlaying: false,
    coverUrl: "",
    serviceUrl: "http://127.0.0.1:8000"
  },
  mutations: {
    togglePlay(state, toggle) {
      // 判断开关状态是否定义，定义了则取定义值，没定义则取siPlaying的值
      state.isPlaying = toggle !== undefined ? toggle : !state.isPlaying;
    },
    changeCover(state) {
      // eslint-disable-next-line no-constant-condition
      while (1) {
        // floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数。
        // random() 方法可返回介于 0 ~ 1 之间的一个随机数。
        // 以下三行代码为随机获取一张图片
        const index = Math.floor(Math.random() * 3);
        const coverUrl = COVER_URL[index];
        // 在换歌的时候一定进行图片得切换
        if (coverUrl !== state.coverUrl) {
          state.coverUrl = coverUrl;
          break;
        }
      }
    }
  },
  getters: {},
  actions: {},
  modules: {}
});
