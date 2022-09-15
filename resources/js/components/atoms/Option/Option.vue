<template>
  <span class="tip" :value="value" @click="onClick" :class="classes">
    <slot />
  </span>
</template>

<script>
export default {
  name: "Option",

  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        "tip--is-disabled": this.disabled && !this.active,
        "tip--is-active": this.active,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit("click", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.tip {
  display: inline-block;
  width: 72px;
  padding: 2px 0;
  cursor: pointer;
  font-weight: bold;

  &--is-disabled {
    opacity: 0.8;
    pointer-events: none;
  }

  &--is-active {
    border: 1px solid $white;
    border-radius: 20px;
    background: $white;
    color: $red;
  }
}
</style>
