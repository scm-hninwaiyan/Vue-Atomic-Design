<template>
  <span v-if="name" class="tag" :class="classes">{{ name }}</span>
</template>

<script>
import { RICE_TYPE, RICE_TYPE_SEAL_NAME } from "@/enums";

export default {
  name: "RiceTypeTag",

  props: {
    value: {
      type: Number,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        "tag--less": this.value === RICE_TYPE.LESS,
      };
    },
    name() {
      return RICE_TYPE_SEAL_NAME[this.value];
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

  &--less {
    background: $black;
    color: $white;
  }
}
</style>
