<!-- 
伝票詳細モーダル内の割引情報
-->
<template>
  <div class="row">
    <div class="row-inner">
      <!--割引名 -->
      <div class="name-col">
        {{ discount.discountName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscountRow",

  props: {
    // 割引情報
    discount: {
      type: Object,
      required: true,
    },
  },

  components: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.row {
  border-bottom: 1px solid $concrete;
  font-weight: bold;
}

.row-inner {
  display: grid;
  align-items: center;
  text-align: center;
  // 1カラムしかないけど項目追加に備える
  grid-template-columns: 1fr;
  height: 64px;
}

.name-col {
  text-align: left;
  word-break: break-all;
  margin-left: 4px;
}
</style>
