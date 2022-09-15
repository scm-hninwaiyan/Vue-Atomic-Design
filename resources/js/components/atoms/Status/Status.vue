<template>
  <span class="status" :class="classes" @click="onClick">
    {{ statusName }}
  </span>
</template>

<script>
import { STATUS_NAME, STATUS_CODE } from "@/enums";

export default {
  name: "Status",

  props: {
    value: {
      type: Number,
      required: true,
    },
  },

  computed: {
    /**
     * 調理ステータスの日本語名称を返却する
     */
    statusName() {
      return STATUS_NAME[this.value];
    },
    /**
     * 調理ステータスのスタイルを返却する
     */
    classes() {
      return {
        "status--cooking": this.value === STATUS_CODE.COOKING,
        "status--done": this.value === STATUS_CODE.DONE,
      };
    },
  },

  methods: {
    /**
     * ステータスを押下したとき
     */
    onClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.status {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid $codGray;

  // 調理中
  &--cooking {
    color: $white;
    border-width: 0;
    background: $fernGreen;
  }

  // 調理完了
  &--done {
    color: $white;
    border-width: 0;
    background: $dustyGray;
  }
}
</style>
