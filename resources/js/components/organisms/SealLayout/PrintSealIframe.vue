<template>
  <!-- 
  Note 
  ・SlipFormコンポーネントをiframeでレンダリングする(ただし、ユーザーには見えないように非表示設定)
  mounted時にpostMessageを送信しても同期できていなかった。
  なので@loadのタイミングでpostMessagを実施 
  -->
  <iframe :style="{ display: 'none' }" ref="iframe" src="/seal" @load="sendTarget"></iframe>
</template>

<script>
export default {
  name: "PrintSealIframe",

  props: {
    seals: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      iframeWindow: null,
    };
  },

  created() {
    // https://developer.mozilla.org/ja/docs/Web/API/Window/postMessage
    // iframe間でデータのやりとりを行う
    window.addEventListener("message", this.receiveMessage);
  },

  mounted() {
    this.iframeWindow = this.$refs.iframe.contentWindow;
  },

  destroyed() {
    window.removeEventListener("message", this.receiveMessage);
  },

  methods: {
    /**
     *  Iframeの子に、伝票データを送信する
     */
    sendTarget() {
      this.iframeWindow.postMessage({
        type: "SEND_TARGET",
        target: this.seals,
      });
    },

    /**
     * Iframe内の子のレンダリングが完了したことを検知する
     */
    receiveMessage(event) {
      if (event.data.type === "LOADED") {
        this.print();
        // Note
        // 同期的にプリンターに印刷キューを送信した後に、emitされる想定。
        this.$emit("endPrint");
      }
    },

    /**
     * iframe内のコンテンツを印刷する
     */
    print() {
      this.iframeWindow.print();
    },
  },
};
</script>
