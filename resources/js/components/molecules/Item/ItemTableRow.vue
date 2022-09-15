<template>
  <!-- 
  アイテム一覧のアイテム行
  -->
  <div class="row">
    <div class="inner-row">
      <!--商品名 -->
      <div class="name-col">
        <div class="id">{{ item.masterId }}</div>
        <div class="name">{{ item.name }}</div>
      </div>
      <!--容器 -->
      <div>
        <ContainerTypeIcon v-if="item.containerType" :value="item.containerType" />
      </div>
      <!--シャリ -->
      <div>
        <RiceTypeIcon v-if="item.riceType" :value="item.riceType" />
      </div>
      <!--ワサビ -->
      <div>
        <WasabiTypeIcon v-if="item.wasabiType" :value="item.wasabiType" />
      </div>
      <!--数量 -->
      <div class="quantity-col">{{ item.quantity }}</div>
      <!-- ×アイコン -->
      <div class="remove-col">
        <Icon class="remove-icon" name="close2" @click="onRemove" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon, { RiceTypeIcon, ContainerTypeIcon, WasabiTypeIcon } from "@/components/atoms/Icon";

export default {
  name: "ItemTableRow",

  props: {
    // 商品
    item: {
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
    Icon,
    RiceTypeIcon,
    ContainerTypeIcon,
    WasabiTypeIcon,
  },

  computed: {},

  methods: {
    /**
     * ×アイコンを押下したとき
     */
    onRemove() {
      this.$emit("remove", this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.row {
  background: $white;
  border-radius: 8px;
  box-shadow: 0px 0px 4px #99999952;

  &--complete {
    background: $mercury;
  }
}

.inner-row {
  display: grid;
  align-items: center;
  text-align: center;
  grid-template-columns: 500px 54px 54px 54px 54px 1fr;
  height: 84px;
}

.name-col {
  text-align: left;
  display: flex;
  margin-left: 16px;
}

.id {
  font-weight: bold;
}

.name {
  margin-left: 16px;
}

.quantity-col {
  font-weight: bold;
}

.actor-col {
  display: flex;
  text-align: left;
  margin-left: 30px;
  font-weight: bold;
}

.remove-col {
  text-align: right;
  margin-right: 30px;
}

.product-swaps {
  padding-left: 16px;
  padding-bottom: 16px;
}

.remove-icon {
  width: 20px;
  cursor: pointer;

  &/deep/ g {
    stroke: $black;
    stroke-width: 2px;
  }
}
</style>
