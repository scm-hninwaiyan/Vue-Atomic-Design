<template>
  <span class="tag" :class="classes">{{ name }}</span>
</template>

<script>
import { WASABI_TYPE, WASABI_TYPE_SEAL_NAME } from "@/enums";

export default {
  name: "WasabiTypeTag",

  props: {
    value: {
      type: Number,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        "tag--include": this.value === WASABI_TYPE.INCLUDE,
        "tag--exclude": this.value === WASABI_TYPE.EXCLUDE,
        "tag--exclude_attache": this.value === WASABI_TYPE.EXCLUDE_ATTACHE,
        "tag--include_attache": this.value === WASABI_TYPE.INCLUDE_ATTACHE,
      };
    },
    name() {
      return WASABI_TYPE_SEAL_NAME[this.value];
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

  &--include {
    border: 1px solid $black;
  }

  &--exclude {
    background: $black;
    color: $white;
  }

  &--exclude_attache {
    border: 1px solid $black;
  }

  &--include_attache {
    border: 1px solid $black;
  }
}
</style>
