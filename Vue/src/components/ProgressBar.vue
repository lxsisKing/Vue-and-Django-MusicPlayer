<template>
  <div class="progress" :class="{ progress__playing: isPlaying }">
    <h2 class="progress_title">{{ name | formatName }}</h2>
    <p class="progress_text">
      {{ position | formatTime }} / {{ duration | formatTime }}
    </p>
    <div class="progress_line">
      <span :style="{ width: progress }"></span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { player } from "../player";
export default {
  data() {
    return {
      name: "",
      position: 0,
      duration: 0.001,
      progress: ""
    };
  },
  computed: {
    ...mapState(["isPlaying"])
  },
  filters: {
    formatTime(val) {
      const min = Math.floor(val / 60);
      const sec = Math.floor(val % 60);
      return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    },
    formatName(val) {
      return val.replace(/\.mp3$/, "");
    }
  },
  mounted() {
    const draw = () => {
      requestAnimationFrame(draw);
      const progress = player.position / player.duration;
      this.progress = `${(progress * 100).toFixed(2)}%`;
      // 获取当前播放点
      this.position = player.position;
      // 获取整首歌时间
      this.duration = player.duration;
      // 获取当前歌曲名
      this.name = player.musicName;
    };

    draw();
  }
};
</script>

<style lang="less" scoped>
.progress {
  padding-left: 123px;
  padding-right: 12px;
  height: 100%;
  border-radius: 6px 6px 0 0;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.6s ease;
}
.progress__playing {
  transform: translateY(-100%);
}
.progress_title {
  padding-top: 6px;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  // ellipsis	显示省略符号来代表被修剪的文本。
  text-overflow: ellipsis;
}
.progerss_text {
  padding-top: 2px;
  padding-left: 2px;
  font-size: 12px;
  font-weight: bold;
  color: #ccc;
  transform: scale(0.6);
  // 旋转元素的基点位置
  transform-origin: left top;
}
.progerss_line {
  height: 3px;
  border-radius: 3px;
  overflow: hidden;
  background-color: #ddd;
}
.progerss_line span {
  display: block;
  height: 100%;
  background-color: #ec51a5;
}
</style>
