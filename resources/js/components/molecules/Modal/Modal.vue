<template>
  <Overlay @click="onClickOutSide">
    <div class="modal" @click.stop>
      <div class="header">
        <Icon v-if="showCloseIcon" class="header-close-icon" name="close" @click="onClose" />
      </div>
      <slot></slot>
    </div>
  </Overlay>
</template>

<script>
import Overlay from "@/components/atoms/Overlay";
import Icon from "@/components/atoms/Icon";

export default {
  name: "Modal",

  props: {
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    Overlay,
    Icon,
  },

  data() {
    return {
      y: null,
    };
  },

  created() {
    // モーダル表示中に背景をスクロールさせないようにする
    // https://coliss.com/articles/build-websites/operation/javascript/prevent-page-scrolling-when-a-modal-is-open.html
    // 移動量を取得
    this.y = window.pageYOffset;
    // fixedにして背景をスクロールさせないようにする
    document.body.classList.add("no-scroll");
    // スクロール量に応じて背景の位置を調整
    document.body.style.top = `-${this.y}px`;
  },

  beforeDestroy() {
    // 固定した背景を戻す
    document.body.classList.remove("no-scroll");
    document.body.style.top = "";
    window.scrollTo(0, this.y);
  },

  methods: {
    /**
     * 閉じるボタンを押下したとき
     */
    onClose() {
      this.$emit("close");
    },
    /**
     * モーダル外を押下したとき
     */
    onClickOutSide() {
      this.$emit("clickOutside");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@import "@/assets/styles/mq.scss";

.modal {
  background: $white;
  border-radius: 12px;
  max-height: 90%;
  overflow-y: scroll;

  .header {
    text-align: right;
    position: relative;

    &-close-icon {
      position: absolute;
      cursor: pointer;
      top: 8px;
      right: 8px;
    }
  }
}
</style>
