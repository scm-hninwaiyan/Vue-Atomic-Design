<template>
  <section class="title-section">
    <div class="reserve-type-container" v-if="reserveTypeText">
      <span class="reserve-type">{{ reserveTypeText }}</span>
    </div>
    <span class="delivery-time">{{ time }}</span>
    <span v-if="alertSetting && systemDate" class="alert">{{ alertText }}</span>
  </section>
</template>

<script>
import ReserveType from "@/models/Slip/ReserveType";
import DeliveryTime from "@/models/Slip/DeliveryTime";
import Alert, { ALERT_LEVEL_1, ALERT_LEVEL_2, ALERT_EXCEED } from "@/models/Alert/Alert";

export default {
  name: "TitleSection",

  props: {
    // 伝票ステータス
    status: {
      type: Number,
      required: true,
    },
    // 配達日時From
    deliveryDatetimeFrom: {
      type: String,
      default: "",
    },
    // 配達日時To
    deliveryDatetimeTo: {
      type: String,
      required: true,
    },
    // お届け区分
    deliveryType: {
      type: Number,
      required: true,
    },
    // お持ち帰りフラグ
    isTakeout: {
      type: Boolean,
      required: true,
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

  components: {},

  computed: {
    /**
     * 予約種別に応じた文言を返却する
     */
    reserveTypeText() {
      return ReserveType.getShortText(this.deliveryType, this.isTakeout);
    },
    /**
     * お届け時間を返却する
     */
    time() {
      return DeliveryTime.getText(this.deliveryDatetimeFrom, this.deliveryDatetimeTo);
    },
    /**
     * アラートの文言を返却する
     */
    alertText() {
      const level = Alert.getAlertLevel({
        slipStatus: this.status,
        currentDate: this.systemDate,
        deliveryTimeTo: this.deliveryDatetimeTo,
        ...this.alertSetting,
      });

      if (level === ALERT_LEVEL_1) return "警告:アラート1";
      if (level === ALERT_LEVEL_2) return "警告:アラート2";
      if (level === ALERT_EXCEED) return "警告:時間経過";

      return "";
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
.title-section {
  display: flex;
  align-items: center;
  min-height: 30px;

  .reserve-type-container {
    margin-right: 15px;
    display: flex;
    align-items: center;
  }

  .reserve-type {
    color: $white;
    background: $doveGray;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 3px 13px;
  }

  .delivery-time {
    font-size: 1.2rem;
  }

  .alert {
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: auto;
  }
}
</style>
