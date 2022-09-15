<template>
  <input
    class="input-inner"
    :class="{ 'input-inner--error': invalid }"
    :type="type"
    @input="onInput"
    :value="value"
    v-bind="$attrs"
  />
</template>

<script>

export default {
  name: "InputText",

  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: "bottom",
    },
  },

  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/color.scss";

.input-inner {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  border: 1px solid $black;

  &--error {
    background: $pastelPink;
  }
}
</style>
