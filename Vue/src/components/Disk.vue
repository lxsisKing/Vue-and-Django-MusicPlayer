<template>
  <!-- 绑定class是否获取disk__playing由isPlaying方法决定 -->
  <div class="disk" :class="{ disk__playing: isPlaying }">
    <!-- for：绑定input用的 -->
    <label
      class="disk_cover"
      ref="cover"
      for="file"
      :style="{
        transform: stopMatrix,
        backgroundImage: coverUrl ? `url(${coverUrl})` : ''
      }"
    />
    <!-- accept：input可以接受的文件类型
    ref：给元素或者子组件注册引用信息
    type="file"：定义输入字段和浏览按钮，供文件上传
    multiple：可接受多个文件上传 
    @change：绑定change事件-->
    <input id="file" ref="file" type="button" @click="handleChange" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapMutations } from "vuex";
import { player } from "../player";
import httpaxios from "../unites/httpaxios";
export default {
  data() {
    return {
      stopMatrix: ""
    };
  },
  computed: {
    //   从vuex中取得isPlaying和coverUrl的原始数据
    ...mapState(["isPlaying", "coverUrl", "serviceUrl"])
  },
  //   监听isPlaying的变化
  watch: {
    // isPlaying发生变化，下面这个函数就会运行
    isPlaying(val) {
      // 开始播放的时候
      if (!val) {
        //   获取label的transform样式属性
        this.stopMatrix = window.getComputedStyle(this.$refs.cover).transform;
      } else {
        // 没有播放的时候
        const matrix = this.stopMatrix;
        this.stopMatrix = "";

        // 以下三行代码为获取暂停时旋转过的角度
        const match = matrix.match(/^matrix\(([^,]+),([^,]+)/);
        const [, sin, cos] = match || [0, 0, 0];
        const deg = ((Math.atan2(cos, sin) / 2 / Math.PI) * 360) % 360;
        // document.styleSheets可以返回由网页中所用到的样式表组成的数组，但是不包括直接嵌在元素里的style。
        const style = [...document.styleSheets];
        style.forEach(style => {
          // cssRules可以获取指定样式表中的规则集合
          const rules = [...style.cssRules];
          rules.forEach(rule => {
            // 获取旋转动画
            if (rule.type === rule.KEYFRAMES_RULE && rule.name === "rotate") {
              // 作用应该是暂停的时候旋转多少角度，然后就从这个角度开始旋转
              // 初始角度
              rule.cssRules[0].style.transform = `rotate(${deg}deg)`;
              // 初始角度加360°
              rule.cssRules[1].style.transform = `rotate(${deg + 360}deg)`;
            }
          });
        });
      }
    }
  },
  methods: {
    ...mapMutations(["togglePlay", "changeCover"]),
    // async异步函数，该函数的执行不会影响后面代码的执行
    // ========================
    // 这个函数为获取音乐文件函数
    // ========================
    async handleChange() {
      /*
      // 获取到input元素
      const target = this.$refs.file;
      // 如果input里的file存在，则files就等于input元素中选中的文件
      const files = target.files ? target.files : [];

      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          // await等待后续代码执行完毕后继续执行
          await player.append(files[i]);
        }
      }
      // 重新将target的值设为空
      target.value = "";
      */
      httpaxios.get(this, this.serviceUrl, response => {
        var musicData = response.data;
        for (let key in musicData) {
          var musicName = musicData[key]["0"]["music_name"];
          var musicAddress = musicData[key]["0"]["music_address"];
          player.append(musicAddress, musicName);
          console.log(musicName);
        }
      });
    }
  },
  mounted() {
    player.onReady.listen(() => {
      // 将changeCover加到handlers队列中
      this.changeCover();
    });
    player.onChange.listen(() => {
      this.changeCover();
    });
    player.onPlay.listen(() => {
      this.togglePlay(true);
    });
    player.onPause.listen(() => {
      this.togglePlay(false);
    });
  }
};
</script>

<style lang="less">
.disk {
  position: relative;
  //设置盒子为一个正方形
  padding-top: 100%;
  //圆角
  border-radius: 100%;
  //隐藏溢出容器的内容且不出现滚动条。
  overflow: hidden;
  //translateX/Y:沿x轴或者y轴平移。-数分别为向上和向左。
  //scale：整体缩放为0.88倍。拥有x与y两个参数，只提供一个时。默认两个为共同值。
  transform: translateY(-50%) scale(0.88);
  //设置旋转元素的基点位置
  transform-origin: center bottom;
  transition: all 0.6s ease;
}
.disk input {
  display: none;
}
.disk_cover {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  //指定为圆形的渐变，并且用百分比指定起止色位置,0%为内边，100为外边
  background-image: radial-gradient(circle, #444 0%, #333 100%);
  background-size: cover;
  background-position: center;
}
//向渲染后的.disk_cover添加内容
.disk_cover::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  //圆角
  border-radius: 100%;
  //设置线性渐变，使用角度设置渐变方向
  background-image: linear-gradient(45deg, white, #dabad1);
  //向div元素添加阴影
  //第1个长度值用来设置对象的阴影水平偏移值。可以为负值
  //第2个长度值用来设置对象的阴影垂直偏移值。可以为负值
  //如果提供了第3个长度值则用来设置对象的阴影模糊值。不允许负值
  //如果提供了第4个长度值则用来设置对象的阴影外延值。可以为负值
  //最后一个参数为阴影颜色
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
.disk__playing {
  transform: translateY(-50%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
    0 20px 20px -10px rgba(108, 29, 171, 0.3);
}
.disk__playing .disk_cover {
  //animation: name duration timing-function delay iteration-count direction fill-mode play-state;
  //绑定动画名称
  //linear：动画将从头到尾速度相同
  //linear：指定动画播放为无限次（可以用次数指定播放多少次）
  //动画播放周期为5s
  animation: rotate infinite 6s linear;
}
//以下为CSS动画
@keyframes rotate {
  //旋转一周
  //从0°旋转到360°
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
