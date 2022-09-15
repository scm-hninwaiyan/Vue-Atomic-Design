<template>
  <div>
    <video ref="video" width="300" height="200" class="video" />
    <canvas ref="canvas" width="300" height="200" class="canvas"></canvas>
  </div>
</template>

<script>
import { getMedia } from "@/repositories/media";

export default {
  name: "TakePhoto",

  components: {},

  data() {
    return {
      videoRef: null,
      canvasRef: null,
    };
  },

  async mounted() {
    this.videoRef = this.$refs.video;
    this.canvasRef = this.$refs.canvas;
  },

  methods: {
    /**
     * Videoのソースにsteamをセットする
     * ソースのロード完了後、resolveするPromiseを返す
     */
    async videoSetting() {
      const stream = await getMedia();
      this.videoRef.srcObject = stream;
      return new Promise(resolve => {
        this.videoRef.onloadedmetadata = () => {
          this.videoRef.play();
          resolve("onload");
        };
      });
    },
    /**
     * Videoの映像をcanvasにレンダリングして、写真を取得する
     */
    async onCapture() {
      this.canvasRef.getContext("2d").drawImage(this.videoRef, 0, 0, this.canvasRef.width, this.canvasRef.height);
      const url = this.canvasRef.toDataURL();
      // videoを停止する
      // https://developer.mozilla.org/ja/docs/Web/API/MediaStreamTrack/stop
      const tracks = this.videoRef.srcObject.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
      this.videoRef.srcObject = null;
      return url;
    },
  },
};
</script>

<style lang="scss" scoped>
.video,
.canvas {
  display: none;
}
</style>
