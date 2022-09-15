<template>
  <portal to="error-dialog">
    <Overlay @click="onClickOutSide">
      <div class="dialog">
        <div class="dialog-message">
          <slot name="message">
            {{ message }}
          </slot>
        </div>
        <div class="dialog-footer">
          <slot name="footer">
            <Button class="close-button" type="button" @click.stop="onClose">閉じる</Button>
          </slot>
        </div>
      </div>
    </Overlay>
  </portal>
</template>

<script>
import Overlay from "../../../components/atoms/Overlay/Overlay.vue";
import Button from "../../../components/atoms/Button/Button.vue";

export default {
  name: "ErrorDialog",

  props: {
    message: {
      type: String,
      default: "",
    },
  },

  components: {
    Overlay,
    Button,
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
     * オーバレイを押下したとき
     */
    onClickOutSide() {
      this.$emit("click-outside");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/color.scss";

.dialog {
  background: $white;
  border-radius: 12px;
  padding: 30px;
  min-width: 500px;
  text-align: center;

  &-message {
    white-space: pre-wrap;
  }

  &-footer {
    margin-top: 10px;
  }
}

.close-button {
  padding: 10px 20px;
}
</style>
