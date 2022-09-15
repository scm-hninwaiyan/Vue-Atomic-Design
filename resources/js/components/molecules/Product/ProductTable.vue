<!-- 
 商品一覧画面の商品一覧
-->
<template>
  <div class="product-table">
    <div class="product-table-header">
      <div class="name-col">商品名</div>
      <div>容器</div>
      <div>ｼｬﾘ</div>
      <div>ﾜｻﾋﾞ</div>
      <div>数量</div>
      <div class="actor-col">担当</div>
      <div>ステータス</div>
    </div>
    <ProductTableRow
      class="product-table-row"
      v-for="product in products"
      :key="product.id"
      :product="product"
      :loginShopType="loginShopType"
      @updateProduct="updateProduct"
      @openCrib="onOpenCrib(product)"
    />
  </div>
</template>

<script>
import ProductTableRow from "./ProductTableRow";

export default {
  name: "ProductTable",

  props: {
    // 商品リスト
    products: {
      type: Array,
      required: true,
    },
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
  },

  components: {
    ProductTableRow,
  },

  methods: {
    /**
     * 商品を更新する
     */
    updateProduct(payload) {
      // 調理完了にする場合はイベントをわける
      if (payload.toDone) {
        this.$emit("toDoneProduct", payload);
        return;
      }
      this.$emit("updateProduct", payload);
    },
    /**
     * マニュアルパネルであんちょこを押下したとき
     */
    onOpenCrib(product) {
      this.$emit("openCrib", product);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@import "@/assets/styles/mq.scss";

.product-table {
  &-header {
    display: grid;
    grid-template-columns: 1fr 54px 54px 54px 54px 680px 160px;
    color: $tundora;
    text-align: center;

    @include mq-down() {
      grid-template-columns: 1fr 54px 54px 54px 54px 440px 110px;
    }
  }

  &-row {
    margin-bottom: 10px;
  }
}

.name-col {
  text-align: left;
}

.actor-col {
  text-align: left;
  margin-left: 30px;
}
</style>
