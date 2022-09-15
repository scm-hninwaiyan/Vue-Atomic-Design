<template>
  <div>
    <div class="alert-row">
      <p class="new-slip-alert" v-if="isNewSlip">新規注文が登録されました。</p>
      <ModalAlertText
        v-if="systemDate && alertSetting"
        :status="slip.status"
        :deliveryDatetimeTo="slip.deliveryDatetimeTo"
        :systemDate="systemDate"
        :alertSetting="alertSetting"
      />
    </div>
    <div class="reserve-date-row">
      <span class="reserve-date-label" v-if="reserveTypeText">{{ reserveTypeText }}</span>
      <span class="reserve-date-value">{{ time }}</span>
    </div>
    <div class="store-row">
      <span class="store-label">{{ shopName }}</span>
      <span class="store-value">{{ storeName }}</span>
    </div>
    <div class="info-row">
      <span class="info-value">No.{{ slip.slipId }}</span>
      <span class="info-value">{{ price }}</span>
      <span class="info-value">
        <Icon name="map-pin" class="map-pin-icon" />
        {{ slip.areaCode }}
      </span>
    </div>
  </div>
</template>

<script>
import { formatPrice } from "@/utils";
import { SHOP_TYPE_NAME } from "@/enums";
import Icon from "@/components/atoms/Icon";
import ReserveType from "@/models/Slip/ReserveType";
import DeliveryTime from "@/models/Slip/DeliveryTime";
import ModalAlertText from "./ModalAlertText";

export default {
  name: "ProductSectionHeader",

  props: {
    // 伝票
    slip: {
      type: Object,
      required: true,
    },
    // 店舗名
    storeName: {
      type: String,
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
    // 新着伝票のモーダルの場合true
    isNewSlip: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Icon,
    ModalAlertText,
  },

  computed: {
    /**
     * 予約種別に応じた文言を返却する
     */
    reserveTypeText() {
      return ReserveType.getText(this.slip.deliveryType, this.slip.isTakeout);
    },
    /**
     * お届け時間を返却する
     */
    time() {
      return DeliveryTime.getText(this.slip.deliveryDatetimeFrom, this.slip.deliveryDatetimeTo);
    },
    /**
     * ¥+カンマ区切り月の金額を返却する
     */
    price() {
      return `¥${formatPrice(this.slip.totalPrice)}`;
    },
    /**
     * 店舗タイプ名を返却する
     */
    shopName() {
      return SHOP_TYPE_NAME[this.slip.shopType];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.alert {
  &-row {
    display: flex;
    align-items: center;
  }
}

.new-slip-alert {
  font-size: 2rem;
  font-weight: bold;
  color: $red;
  margin-right: 20px;
}

.reserve-date {
  &-row {
    margin-top: 26px;
  }

  &-label {
    background: $doveGray;
    color: $white;
    font-weight: bold;
    padding: 10px 16px;
  }

  &-value {
    margin-left: 16px;
    font-weight: bold;
  }
}

.store {
  &-row {
    margin-top: 26px;
  }

  &-label {
    background: $concrete;
    color: $black;
    font-weight: bold;
    padding: 10px 16px;
    border-radius: 30px;
  }

  &-value {
    margin-left: 16px;
    font-size: 2rem;
    font-weight: bold;
  }
}

.info {
  &-row {
    margin-top: 16px;
    font-weight: bold;
    font-size: 1.8rem;
  }

  &-value {
    margin-right: 40px;
  }
}

.delivery-icon {
  width: 22px;
}

.map-pin-icon {
  width: 12px;

  & /deep/ path {
    fill: $black;
  }
}
</style>
