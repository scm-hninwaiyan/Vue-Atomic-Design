<template>
  <button class="button" @click="onClick" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>

<script>

export default {
  name: "Button",

  props: {
    /**
     * ボタンのサイズ
     * md
     * sm
     */
    size: {
      type: String,
      default: "md",
    },
    /**
     * ボタンのカラー
     * default
     * primary
     */
    color: {
      type: String,
      default: "default",
    },
    /**
     * ボタンにアイコンをつける場合のアイコンの名前
     */
    startIconName: {
      type: String,
      default: "",
    },
    /**
     * ボタンの活性状態
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        [`button--${this.size}`]: true,
        [`button--${this.color}`]: true,
      };
    },
  },

  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/color.scss";

@mixin reset() {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}

.button {
  @include reset();

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: $white;

  box-shadow: 0px 1px 2px $clearBlack;
  border-radius: 8px;

  // サイズ
  &--md {
    height: 56px;
  }

  &--sm {
    height: 40px;
  }

  // カラー
  &--default {
    background-color: $dustyGray;
  }

  &--primary {
    background-color: $teak;
  }

  // タッチパネルなので基本的にいらないけど、追加
  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.8;
  }
}

.start-icon {
  position: absolute;
  left: 17px;
}
</style>
