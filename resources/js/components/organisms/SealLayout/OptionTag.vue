<template>
  <!-- 
    Note
    ・このコンポーネントは、伝票印刷用のコンポーネント
    ・Iframe配下のコンテンツとして利用されることを想定している
  -->
  <div class="slip-form sheet">
    <div v-if="target">
      <section class="option"></section>
      <section class="product">
        <p>{{ productName }}</p>
        <Swaps :swaps="product.swaps" />
      </section>
      <section class="delivery-time">
        <span>{{ deliveryDate }}</span>
        <span>{{ deliveryTime }}</span>
      </section>
      <section class="customer-info">
        <p>{{ name }}</p>
      </section>
      <section class="footer">
        <span class="slip-id">
          {{ slip.slipId }}
        </span>
        <span class="product-count">
          5/10
        </span>
      </section>
    </div>
    <div v-else>
      対象の伝票がありません
    </div>
  </div>
</template>

<script>
import { formatStringDate } from "@/utils";
import Swaps from "@/components/molecules/Swaps";

export default {
  name: "SealLayout",

  components: {
    Swaps,
  },

  created() {
    window.addEventListener("message", this.receiveMessage);
  },

  destroyed() {
    window.removeEventListener("message", this.receiveMessage);
  },

  async updated() {
    // 伝票データのレンダリングが終わったら、QRコード生成を行う
    if (this.target !== null) {
      // 生成が完了したことをIframeの親に通知する
      window.parent.postMessage({
        type: "LOADED",
      });
    }
  },

  data() {
    return {
      target: null,
    };
  },

  computed: {
    /**
     *  伝票プロパティへのエイリアス
     */
    slip() {
      return this.target.slip;
    },
  },
};
</script>

<style lang="scss" scoped></style>
