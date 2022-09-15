<template>
  <div class="swaps">
    <div class="swap" v-for="(swap, index) in swaps" :key="index">
      <span class="col">{{ swap.source.name }}</span>
      <Icon class="arrow-icon" name="arrow" />
      <span class="col">{{ swap.destination.name }}</span>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/atoms/Icon";

export default {
  name: "Swaps",

  props: {
    swaps: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.swap {
  margin-top: 4px;
  display: flex;
  align-items: center;
  padding-left: 4px;

  .col {
    min-width: 90px;
  }
}

.arrow-icon {
  width: 18px;
  margin-right: 8px;
  &/deep/ g {
    stroke: $black;
  }
}
</style>
