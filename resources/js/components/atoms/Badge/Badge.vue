<template>
  <span class="badge" :class="classes">
    <slot />
  </span>
</template>

<script>
export default {
  name: "Badge",

  props: {
    /**
     * バッジのカラー
     * gold
     * white
     * green
     * blue
     * gray
     */
    color: {
      type: String,
      default: "gold",
    },
  },

  computed: {
    classes() {
      return {
        [`badge--${this.color}`]: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  &--gold {
    background-color: $teak;
    color: $white;
  }

  &--white {
    background-color: $white;
    color: $codGray;
    border: 1px solid $codGray;
  }

  &--green {
    background-color: $fernGreen;
    color: $white;
  }

  &--blue {
    background-color: $easternBlue;
    color: $white;
  }

  &--gray {
    background-color: $dustyGray;
    color: $white;
  }
}
</style>
