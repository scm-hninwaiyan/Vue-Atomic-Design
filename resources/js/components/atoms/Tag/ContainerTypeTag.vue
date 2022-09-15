<template>
  <span class="tag" :class="classes">{{ name }}</span>
</template>

<script>
import { CONTAINER_TYPE, CONTAINER_TYPE_SEAL_NAME } from "@/enums";

export default {
  name: "ContainerTypeTag",

  props: {
    value: {
      type: Number,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        "tag--disposable": this.value === CONTAINER_TYPE.DISPOSABLE,
        "tag--oke": this.value === CONTAINER_TYPE.OKE,
      };
    },
    name() {
      return CONTAINER_TYPE_SEAL_NAME[this.value];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 86px;
  font-size: 0.8rem;
  font-weight: bold;

  &--disposable {
    background: $black;
    color: $white;
  }

  &--oke {
    border: 1px solid $black;
  }
}
</style>
