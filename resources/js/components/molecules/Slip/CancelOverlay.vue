<template>
  <div class="overlay">
    <div class="content">
      <div class="content-inner">
        <p class="confirm-text">
          {{ isOrderChange ? "注文内容が変更されています。" : "注文がキャンセルされています。" }}
        </p>
        <button class="confirm-button" type="button" @click="onClick">確認する</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CancelOverlay",

  props: {
    // 注文変更のキャンセル
    isOrderChange: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    /**
     * 確認するボタンを押下したとき
     */
    onClick() {
      const eventName = this.isOrderChange ? "orderChangeConfirm" : "detail";
      this.$emit(eventName);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.overlay {
  background: $black;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.9;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: 1.8rem;

  &-inner {
    text-align: center;
  }
}

@mixin reset() {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}

.confirm-text {
  margin-bottom: 31px;
}

.confirm-button {
  @include reset();

  padding: 10px 50px;
  color: $white;
  border: 1px solid $white;
  border-radius: 30px;
}
</style>
