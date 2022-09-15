<template>
  <!-- 
    Note
    ・このコンポーネントは、伝票印刷用のコンポーネント
    ・Iframe配下のコンテンツとして利用されることを想定している
  -->
  <div class="seal-layout sheet">
    <div v-if="seals">
      <Seal v-for="(seal, index) in seals" :key="index" class="page" :seal="seal" />
    </div>
    <div v-else>
      対象の伝票がありません
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { PATTERN_1, PATTERN_2, PATTERN_3, PATTERN_4 } from "@/models/Seal/dummySealFactory";
import Seal from "./Seal";

export default {
  name: "SealLayout",

  components: {
    Seal,
  },

  created() {
    window.addEventListener("message", this.receiveMessage);

    // シール印刷レイアウト調整用
    if (process.env.VUE_APP_DEV_PRINT_SEAL === "true") {
      this.seals = [PATTERN_1, PATTERN_2, PATTERN_3, PATTERN_4];
    }
  },

  destroyed() {
    window.removeEventListener("message", this.receiveMessage);
  },

  async updated() {
    if (process.env.VUE_APP_DEV_PRINT_SEAL === "true") return;

    if (this.seals !== null) {
      // 生成が完了したことをIframeの親に通知する
      window.parent.postMessage({
        type: "LOADED",
      });
    }
  },

  data() {
    return {
      seals: null,
    };
  },

  computed: {},

  methods: {
    /**
     * Iframeの親から伝票データを取得する
     */
    receiveMessage(event) {
      if (event.data.type === "SEND_TARGET") {
        this.seals = event.data.target;
      }
    },
  },
};
</script>

<style lang="scss">
// 印刷設定Tips
// https://qiita.com/cognitom/items/d39d5f19054c8c8fd592
$width: 80mm;

// 用紙サイズの設定
@page {
  // Note
  // 実機のTM-L90で実行するとレイアウトが崩れたので、実機用にはサイズの指定はしてない。
  // portraitのみ指定。
  // portrait: ページのコンテンツは縦向きモード (ボックスの長辺が垂直) で表示されます。これが既定の向きです。
  size: portrait;
  margin: 0;
}

@media print {
  body {
    // 印刷時にbackgroundを印刷させる
    // https://github.com/gnab/remark/issues/83#issuecomment-35813517
    -webkit-print-color-adjust: exact;
    // https://qiita.com/cognitom/items/d39d5f19054c8c8fd592#chrome%E3%81%AE%E7%B8%AE%E5%B0%BA%E3%83%90%E3%82%B0%E3%82%92%E5%9B%9E%E9%81%BF%E3%81%99%E3%82%8B
    width: $width;
    // 印刷時にbackgroundColorを有効にするため、印刷ダイアログで背景のグラフィックにチェックをいれる
    // その際、bodyに背景が適用されると、画面の高さ分印刷されてしまうので、transparentを設定。
    background: transparent !important;
  }
}

.seal-layout {
  width: 100%;
  .page {
    // 改ページでオートカットさせたいので設定
    page-break-after: always;
  }
}

// 開発用にブラウザでみたときに、印刷用紙っぽくするための設定
@media screen {
  .sheet {
    width: $width;
    background: white;
    box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
    margin: 5mm;
  }
}
</style>
