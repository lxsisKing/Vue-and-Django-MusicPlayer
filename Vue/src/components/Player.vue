<template>
  <div class="player">
    <div class="player_disk">
      <disk />
    </div>
    <div class="player_control">
      <control />
    </div>
    <div class="palyer_progress">
      <progress-bar />
    </div>
  </div>
</template>

<script>
//引入组件Disk
import Disk from "./Disk.vue";
import Control from "./Control.vue";
import ProgressBar from "./ProgressBar.vue";
export default {
  components: {
    Disk,
    Control,
    ProgressBar
  }
};
</script>

<style lang="less">
.player {
  //相对定位
  position: relative;
  //将对象作为弹性伸缩盒显示。
  //忘了的话看这个:https://www.cnblogs.com/sunwk/p/9049384.html
  display: flex;
  max-width: 300px;
  max-height: 75px;
  width: 300px;
  height: 75px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
    0 20px 20px rgba(95, 23, 101, 0.2);
}
.player_disk {
  //让所有弹性盒模型对象的子元素都有相应的长度，且忽略它们内部的内容。
  //后面的值则代表相应的权重。
  flex-grow: 1.2;
  //元素距盒子的内边距
  padding: 12px;
}
.player_control {
  flex-grow: 2;
  //提供两个参数，第一个用于上下，第二个用于左右
  //若提供三个，第一个用于上，第二个用于左右，第三个用于下
  padding: 12px 0;
  padding-right: 12px;
}
.palyer_progress {
  position: absolute;
  left: 9px;
  right: 9px;
  top: 0;
  bottom: 25px;
  //z-index：指定了元素的堆叠顺序，越大越在上层
  z-index: -1;
}
</style>
