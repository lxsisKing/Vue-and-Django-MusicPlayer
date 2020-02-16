<template>
  <div class="control" :class="{ control__playing: isPlaying }">
    <div class="control_btn control_btn__side" @click="handlePrev">
      <!-- "fa fa-backward":font-awesome的图标样式 -->
      <i class="fa fa-backward" />
    </div>
    <div class="control_btn" @click="handlePlay">
      <span class="play-btn" />
    </div>
    <div class="control_btn control_btn__side" @click="handleNext">
      <i class="fa fa-forward" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { player } from "../player";
export default {
  computed: {
    ...mapState(["isPlaying"])
  },
  methods: {
    // 控制开始播放和暂停控件
    handlePlay() {
      if (!player.isEmpty) {
        if (!this.isPlaying) {
          player.play();
        } else {
          player.pause();
        }
      }
    },
    // 控制上一首控件
    handlePrev() {
      //if (this.isPlaying) {
      player.prev();
      //}
    },
    // 控制下一首控件
    handleNext() {
      //if (this.isPlaying) {
      player.next();
      //}
    }
  }
};
</script>

<style lang="less" scoped>
.control {
  display: flex;
  height: 100%;
}
.control_btn {
  display: flex;
  margin: 2px;
  // 元素位于容器中间（交叉轴）对齐
  align-items: center;
  // 元素位于主轴（横轴）方向上居中对齐
  justify-content: center;
  flex: 1;
  border-radius: 4px;
  color: #ccc;
  font-size: 16px;
  // 过渡元素
  // property duration timing-function delay;
  // 过渡的属性/时间/转速曲线/延迟时间
  // 默认ease为慢速开始，然后变快
  transition: background-color 0.6s ease;
}
.control_btn:hover {
  background-color: #ddd;
  color: white;
}
.control_btn__side {
  font-size: 14px;
}
.play-btn {
  position: relative;
  width: 20px;
  height: 20px;
}
.play-btn::before {
  content: "";
  position: absolute;
  left: 11px;
  top: 50%;
  margin-left: -4px;
  margin-top: -10px;
  width: 0;
  height: 0;
  // 简写属性
  // border-width  border-style(required)  border-color
  // 指定边框的颜色应该是透明的
  border: 12px solid transparent;
  border-left-color: #ccc;
  border-top-width: 10px;
  border-bottom-width: 10px;
  transition: all 0.2s ease;
}
.play-btn::after {
  content: "";
  position: absolute;
  right: 5px;
  top: 50%;
  margin-right: -4px;
  margin-top: -10px;
  width: 0;
  height: 20px;
  border: 0 solid transparent;
  border-width: 0 0 0 6px;
  border-left-color: #ccc;
  // 透明度，0为完全透明
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}
.control__playing .play-btn::before {
  border-width: 0 0 0 6px;
  height: 20px;
  left: 5px;
}
.control__playing .play-btn::after {
  opacity: 1;
  transform: scale(1);
}
.control_btn:hover .play-btn::before {
  border-left-color: white;
}
.control_btn:hover .play-btn::after {
  border-color: white;
}
</style>
