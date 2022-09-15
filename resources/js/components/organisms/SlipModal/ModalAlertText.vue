<template>
  <span class="alert-text" :class="alertStyle">
    <Icon class="alert-icon" name="alert" :class="alertStyle" />
    {{ alertText }}
  </span>
</template>

<script>
import Alert, { ALERT_LEVEL_1, ALERT_LEVEL_2, ALERT_EXCEED, ALERT_NONE } from "@/models/Alert/Alert";
import Icon from "@/components/atoms/Icon";

export default {
  name: "ModalAlert",

  props: {
    // 伝票ステータス
    status: {
      type: Number,
      required: true,
    },
    // 配達日時To
    deliveryDatetimeTo: {
      type: String,
      required: true,
    },
    // アラート時間判定用のシステム日付
    systemDate: {
      type: Date,
      required: true,
    },
    // アラート設定
    alertSetting: {
      type: Object,
      required: true,
    },
  },

  components: {
    Icon,
  },

  computed: {
    /**
     * アラートレベルを取得する
     */
    alertLevel() {
      // 過去伝票等アラート表示が不要な場合の考慮
      if (this.alertSetting === null || this.systemDate === null) return;

      return Alert.getAlertLevel({
        slipStatus: this.status,
        currentDate: this.systemDate,
        deliveryTimeTo: this.deliveryDatetimeTo,
        ...this.alertSetting,
      });
    },
    /**
     * アラートレベルに応じたCSSのクラス名を生成する
     */
    alertStyle() {
      return {
        exceed: this.alertLevel === ALERT_EXCEED,
        level2: this.alertLevel === ALERT_LEVEL_2,
        level1: this.alertLevel === ALERT_LEVEL_1,
      };
    },
    /**
     * アラートレベルに応じたCSSのクラス名を生成する
     */
    alertText() {
      const { level, levelOneFirstThreshold, levelTwoFirstThreshold, levelTwoSecondThreshold } = this.alertSetting;
      if (this.alertLevel === ALERT_NONE) return "";

      if (this.alertLevel === ALERT_LEVEL_1 && level === ALERT_LEVEL_1)
        return `配達時間${levelOneFirstThreshold}分前です。`;

      if (this.alertLevel === ALERT_LEVEL_1 && level === ALERT_LEVEL_2)
        return `配達時間${levelTwoFirstThreshold}分前です。`;

      if (this.alertLevel === ALERT_LEVEL_2) return `配達時間${levelTwoSecondThreshold}分前です。`;

      return "配達時間が過ぎています。";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.alert-text {
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 2rem;

  &.exceed {
    background: $black;
    color: $red;
  }

  &.level2 {
    background: $red;
    color: $black;
  }

  &.level1 {
    background: $goldenFizz;
    color: $black;
  }
}

.alert-icon {
  width: 18px;
  margin-right: 10px;

  &.exceed /deep/ path {
    fill: $red;
  }

  &.level2 /deep/ path {
    fill: $black;
  }

  &.level1 /deep/ path {
    fill: $black;
  }
}
</style>
