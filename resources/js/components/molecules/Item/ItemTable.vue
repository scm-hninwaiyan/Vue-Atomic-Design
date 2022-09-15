<!-- 
 アイテム一覧画面のアイテム一覧
-->
<template>
  <div class="item-table">
    <div class="item-table-header">
      <div class="name-col">商品名</div>
      <div>容器</div>
      <div>ｼｬﾘ</div>
      <div>ﾜｻﾋﾞ</div>
      <div>数量</div>
    </div>
    <ItemTableRow
      class="item-table-row"
      v-for="item in items"
      :key="item.id"
      :item="item"
      :loginShopType="loginShopType"
      @remove="onRemove"
    />
  </div>
</template>

<script>
import ItemTableRow from "./ItemTableRow";

export default {
  name: "ItemTable",

  props: {
    // アイテムリスト
    items: {
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
    ItemTableRow,
  },

  methods: {
    /**
     * 取り除く対象のアイテムをemitする
     */
    onRemove(item) {
      this.$emit("remove", item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.item-table {
  &-header {
    display: grid;
    grid-template-columns: 500px 54px 54px 54px 54px 54px;
    color: $tundora;
    text-align: center;
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
