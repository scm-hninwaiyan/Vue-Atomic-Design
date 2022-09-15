<template>
  <span class="item" :value="value" @click="onClick" :class="classes">
    <slot />
  </span>
</template>

<script>
export default {
  name: "SelectItem",

  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return { "item--is-active": this.isActive };
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

.item {
  display: block;
  text-align: left;
  padding-left: 10px;
  cursor: pointer;
  font-weight: bold;

  &--is-active {
    background: $white;
    color: $red;
  }
}
</style>
