<template>
  <div class="filter-toggle-bar" @click="onClick">
    <span class="text">
      絞り込み
      <Icon class="arrow-icon" :class="arrowIconStyle" name="arrow2" />
    </span>
  </div>
</template>

<script>
import Icon from "@/components/atoms/Icon";

export default {
  name: "FilterToggleBar",

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Icon,
  },

  computed: {
    /**
     * セレクトボックスの矢印アイコンのCSSのクラス名を返却する
     */
    arrowIconStyle() {
      return { "arrow-icon--active": this.isOpen };
    },
  },

  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@import "@/assets/styles/mq.scss";

.filter-toggle-bar {
  padding: 20px 0;
  text-align: center;
}

.text {
  color: $white;
  font-weight: bold;
  font-size: 1.8rem;
}

.arrow-icon {
  position: relative;
  transform: rotate(90deg);
  transition: all 0.3s;
  top: 2px;
  right: 2px;
  width: 10px;

  &--active {
    transform: rotate(270deg);
  }

  &/deep/ path {
    stroke: $white;
  }
}
</style>
