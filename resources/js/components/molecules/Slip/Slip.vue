<template>
  <div class="slip" :class="slipStyle">
    <TitleSection
      :status="slip.status"
      :deliveryDatetimeFrom="slip.deliveryDatetimeFrom"
      :deliveryDatetimeTo="slip.deliveryDatetimeTo"
      :deliveryType="slip.deliveryType"
      :isTakeout="slip.isTakeout"
      :systemDate="systemDate"
      :alertSetting="alertSetting"
    />
    <InfoSection
      class="info"
      :slip="slip"
      :loginShopType="loginShopType"
      :readOnly="readOnly"
      @updateCharge="onUpdateCharge"
    />
    <ProductTable
      class="product-table"
      :slipStatus="slip.status"
      :products="filteredProducts"
      :loginShopType="loginShopType"
      :readOnly="readOnly"
      @update="onUpdateProduct"
      @openCrib="onOpenCrib"
    />
    <div v-if="mode !== slipMode.ORDER_CHANGE" class="footer">
      <Button v-if="mode !== slipMode.PAST" class="print-button" type="button" @click="onClickPrint">{{
        printButtonText
      }}</Button>
      <span class="link" @click="onClickDetail">
        <Icon name="arrow2" class="arrow" />
        詳細
      </span>
    </div>
    <CancelOverlay
      class="cancel-overlay"
      v-if="isCancelOrOrderChange"
      :isOrderChange="isOrderChange"
      @orderChangeConfirm="onClickOrderChangeConfirm"
      @detail="onClickDetail"
    />
  </div>
</template>

<script>
import { STATUS_CODE, STATUS_NAME, ACTOR_NAME, SHOP_TYPE } from "@/enums";
import { formatPrice } from "@/utils";
import { isPassedProductByActor, isPassedProductByStatus } from "@/models/Filter/FilterCondition";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import TitleSection from "./TitleSection";
import InfoSection from "./InfoSection";
import ProductTable from "./ProductTable";
import CancelOverlay from "./CancelOverlay";

export const MODE = {
  ORDER_CHANGE: "order-change",
  PAST: "past",
};

export default {
  name: "Slip",

  props: {
    // 伝票アイテム
    slip: {
      type: Object,
      required: true,
    },
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
    // ステータスの絞り込み条件
    filterCondStatus: {
      type: Object,
      default: null,
    },
    // 担当者の絞り込み条件
    filterCondActor: {
      type: Object,
      default: null,
    },
    // 伝票のモード
    // ・空文字: 伝票一覧の伝票
    // ・orderChange: 伝票変更確認モーダル
    // ・past:過去伝票
    mode: {
      type: String,
      default: "",
    },
    // アラート時間判定用のシステム日付
    systemDate: {
      type: Date,
      default: null,
    },
    // アラート設定
    alertSetting: {
      type: Object,
      default: null,
    },
  },

  components: {
    TitleSection,
    InfoSection,
    ProductTable,
    CancelOverlay,
    Icon,
    Button,
  },

  computed: {
    /**
     * 伝票のスタイルを返却する
     */
    slipStyle() {
      return {
        "slip--sushi-joto": this.slip.shopType === SHOP_TYPE.SUSHI_JOTO,
        "slip--kamatora": this.slip.shopType === SHOP_TYPE.KAMATORA,
        "slip--fin": this.slip.status === STATUS_CODE.DONE,
      };
    },
    /**
     * 伝票のステータスがキャンセルかどうかを返却する
     */
    isCancelOrOrderChange() {
      return this.mode === MODE.ORDER_CHANGE
        ? false
        : this.slip.status === STATUS_CODE.CANCEL || this.slip.status === STATUS_CODE.CHANGED;
    },
    /**
     * 伝票のステータスが注文変更かどうかを返却する
     */
    isOrderChange() {
      return this.slip.status === STATUS_CODE.CHANGED && !!this.slip.dstSlipId;
    },
    /**
     * 調理担当者の日本語名称を返却する
     */
    actorsName() {
      return this.slip.actors.map(code => ACTOR_NAME[code]).join("/");
    },
    /**
     * 伝票ステータスの日本語名称を返却する
     */
    statusName() {
      return STATUS_NAME[this.slip.status];
    },
    /**
     * 合計金額を返却する
     */
    totalPrice() {
      return formatPrice(this.slip.totalPrice);
    },
    /**
     * 伝票に表示する商品をグローバルヘッダの担当者/ステータスで絞り込む
     */
    filteredProducts() {
      // 伝票一覧以外の場合は絞り込みは行わない
      if (this.mode !== "") return this.slip.products;

      // 伝票一覧配下の商品について、絞り込み条件に合致する商品のみ表示する
      return this.slip.products.filter(product => {
        const passedActor = isPassedProductByActor(this.filterCondActor.value, product);
        const passedStatus = isPassedProductByStatus(this.filterCondStatus.value, product);
        return passedActor && passedStatus;
      });
    },
    /**
     * 印刷ボタンの文言を返却する
     */
    printButtonText() {
      return this.slip.isPrinted ? "印刷済" : "印刷";
    },
    /**
     * 伝票のモードのenumを返却する
     */
    slipMode() {
      return MODE;
    },
    /**
     * 参照のみ行うモードの場合trueを返却する
     */
    readOnly() {
      return this.mode === MODE.PAST || this.mode === MODE.ORDER_CHANGE;
    },
  },

  methods: {
    /**
     * 詳細/キャンセルの確認ボタンを押下したとき
     */
    onClickDetail() {
      this.$emit("setting");
    },
    /**
     * 印刷ボタンを押下したとき
     */
    onClickPrint() {
      this.$emit("print");
    },
    /**
     * 注文変更の確認するボタンを押下したとき
     */
    onClickOrderChangeConfirm() {
      this.$emit("orderChangeConfirm");
    },
    /**
     * 担当者変更パネルで登録ボタンを押下したとき
     */
    onUpdateCharge(payload) {
      const newSlip = {
        ...this.slip,
        actors: payload.actors,
      };
      this.$emit("updateSlip", { newSlip, setUpdating: payload.setUpdating });
    },
    /**
     * 商品の更新をしたとき
     */
    onUpdateProduct(payload) {
      // 調理完了にする場合
      if (payload.toDone) {
        this.$emit("toDoneProduct", payload);
        return;
      }

      // 上記以外のステータス/アクター更新
      this.$emit("updateProduct", payload);
    },
    /**
     * マニュアルパネルであんちょこを押下したとき
     */
    onOpenCrib(product) {
      this.$emit("openCrib", product);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.slip {
  position: relative;
  width: 304px;
  background: $white;
  box-shadow: 0px 0px 4px #99999952;
  padding: 12px 8px 16px;
  border-radius: 8px;

  &--sushi-joto {
    background: $cinderella;
  }

  &--kamatora {
    background: $doublePearlLusta;
  }

  &--fin {
    background: $mercury;
  }

  .info {
    margin-top: 8px;
  }

  .product-table {
    margin-top: 11px;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  .print-button {
    padding: 5px 10px;
    font-size: 1.4rem;
    height: auto;
  }

  .link {
    margin-left: auto;
    color: $black;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;

    .arrow {
      width: 8px;
      height: 14px;
      & /deep/ path {
        stroke: $black;
      }
    }
  }
}

.cancel-overlay {
  position: absolute;
}
</style>
