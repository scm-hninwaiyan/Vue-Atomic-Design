<!-- 
伝票詳細モーダル内の商品一覧
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
    <div class="product-table-rows">
      <ProductRow
        class="product-table-row"
        v-for="product in products"
        :key="product.id"
        :product="product"
        :loginShopType="loginShopType"
      />
      <DiscountRow class="product-table-row" v-for="discount in discounts" :key="discount.id" :discount="discount" />
    </div>
  </div>
</template>

<script>
import ProductRow from "./ProductRow";
import DiscountRow from "./DiscountRow";

export default {
  name: "ProductTable",

  props: {
    // 伝票内商品一覧
    products: {
      type: Array,
      required: true,
    },
    // 割引情報
    discounts: {
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
    ProductRow,
    DiscountRow,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.product-table {
  &-header {
    display: grid;
    grid-template-columns: 190px 48px 48px 44px 44px 535px 115px;
    color: $tundora;
    text-align: center;
    border-bottom: 1px solid $concrete;
  }

  &-rows {
    max-height: 300px;
    overflow-y: scroll;
  }

  &-row {
    &:first-of-type {
      margin-top: 10px;
    }
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
