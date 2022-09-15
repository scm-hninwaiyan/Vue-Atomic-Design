<!-- 
伝票詳細モーダル内の商品行
-->
<template>
  <div class="row">
    <div class="row-inner">
      <!--商品名 -->
      <div class="name-col">
        {{ product.name }}
      </div>
      <!--容器 -->
      <div>
        <ContainerTypeIcon v-if="product.containerType" :value="product.containerType" />
      </div>
      <!--シャリ -->
      <div>
        <RiceTypeIcon v-if="product.riceType" :value="product.riceType" />
      </div>
      <!--ワサビ -->
      <div>
        <WasabiTypeIcon v-if="product.wasabiType" :value="product.wasabiType" />
      </div>
      <!--数量 -->
      <div class="quantity-col">{{ product.quantity }}</div>
      <!--担当 -->
      <div class="actor-col">
        <ActorsRow class="actors-row" :checkedActors="product.actors" :loginShopType="loginShopType" />
      </div>
      <!--ステータス -->
      <div>
        <Status :value="product.status" />
      </div>
    </div>
    <!--ネタ替え -->
    <Swaps :swaps="product.swaps" />
    <!--トッピング -->
    <Topping v-for="(topping, index) in product.toppings" :key="`topping-${index}`" :topping="topping" />
    <!--オプション -->
    <Option v-for="(option, index) in product.options" :key="`option-${index}`" :option="option" />
  </div>
</template>

<script>
import { RiceTypeIcon, WasabiTypeIcon, ContainerTypeIcon } from "@/components/atoms/Icon";
import ActorsRow from "@/components/molecules/ActorsRow";
import Swaps from "@/components/molecules/Swaps";
import Status from "@/components/atoms/Status";
import Topping from "./Topping";
import Option from "./Option";

export default {
  name: "ProductRow",

  props: {
    // 伝票内商品
    product: {
      type: Object,
      required: true,
    },
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
  },

  components: {
    RiceTypeIcon,
    WasabiTypeIcon,
    ContainerTypeIcon,
    ActorsRow,
    Swaps,
    Status,
    Topping,
    Option,
  },
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
  grid-template-columns: 190px 48px 48px 44px 44px 535px 115px;
  height: 64px;
}

.name-col {
  text-align: left;
  word-break: break-all;
  margin-left: 4px;
}

.quantity-col {
  font-weight: bold;
}

.actor-col {
  font-weight: bold;
  text-align: left;

  .actors-row {
    & /deep/ .actor {
      margin-right: 8px;
    }
  }
}
</style>
