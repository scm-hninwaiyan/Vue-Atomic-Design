<template>
  <portal to="modal">
    <Modal :showCloseIcon="false" @close="onClose">
      <div class="order-change-confirm-modal">
        <div class="header">
          <h1>変更内容</h1>
        </div>
        <div class="slip-container">
          <div>
            <h3 class="title">変更前</h3>
            <Slip
              class="slip"
              :slip="modifiedBeforeSlip"
              :mode="slipMode.ORDER_CHANGE"
              :loginShopType="loginShopType"
            />
          </div>
          <div>
            <Icon name="triangle" class="triangle" />
          </div>
          <div>
            <h3 class="title title--after">変更後</h3>
            <Slip class="slip" :slip="afterSlip" :mode="slipMode.ORDER_CHANGE" :loginShopType="loginShopType" />
          </div>
        </div>
        <div class="footer">
          <Button class="button" type="button" @click="onClose" color="primary">閉じる</Button>
        </div>
      </div>
    </Modal>
  </portal>
</template>

<script>
import { STATUS_CODE } from "@/enums";
import Modal from "@/components/molecules/Modal";
import Slip, { MODE } from "@/components/molecules/Slip";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";

export default {
  name: "OrderChangeConfirmModal",

  props: {
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
    // 変更前伝票
    beforeSlip: {
      type: Object,
      required: true,
    },
    // 変更後伝票
    afterSlip: {
      type: Object,
      required: true,
    },
  },

  components: {
    Modal,
    Slip,
    Button,
    Icon,
  },

  computed: {
    /**
     * 変更前の伝票はキャンセル状態になっているので、未調理の状態で表示する
     */
    modifiedBeforeSlip() {
      return { ...this.beforeSlip, status: STATUS_CODE.TODO };
    },
    /**
     * 伝票のモードのenumを返却する
     */
    slipMode() {
      return MODE;
    },
  },

  methods: {
    /**
     * モーダルを閉じる
     */
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.order-change-confirm-modal {
  width: 1372px;
  padding: 128px 231px;
  text-align: center;

  .slip-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 3rem;

      &--after {
        color: $redSecondary;
      }
    }

    .slip {
      margin-top: 20px;
    }

    .triangle {
      width: 32px;
      height: 48px;
    }
  }

  .footer {
    text-align: center;
  }
}

.button {
  font-size: 2.4rem;
  font-weight: bold;
  padding: 0 64px;
  height: 60px;
}
</style>
