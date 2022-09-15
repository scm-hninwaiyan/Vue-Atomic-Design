<template>
  <div>
    <img ref="img" src="@/assets/img/logo_kamatora_white.png" class="img" alt="kamatora" />
    <canvas ref="canvas" width="300" height="200" class="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "MockedTakePhoto",

  components: {},

  data() {
    return {
      imgRef: null,
      canvasRef: null,
    };
  },

  async mounted() {
    this.imgRef = this.$refs.img;
    this.canvasRef = this.$refs.canvas;
  },

  methods: {
    videoSetting() {
      return Promise.resolve();
    },
    onCapture() {
      this.canvasRef.getContext("2d").drawImage(this.imgRef, 0, 0, this.canvasRef.width, this.canvasRef.height);
      const url = this.canvasRef.toDataURL();
      return Promise.resolve(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.img,
.canvas {
  display: none;
}
</style>
