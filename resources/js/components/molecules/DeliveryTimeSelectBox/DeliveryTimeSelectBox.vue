<template>
  <div>
    <slot name="condition-label"></slot>
    <SelectBoxPanel class="select" :options="deliveryTimeOptions" :checkedItem="checkedItem" @change="onChange" />
    <span class="button" @click="onChangeTimeUnit">切替</span>
  </div>
</template>

<script>
import { SelectBoxPanel } from "@/components/molecules/SelectBoxPanel";
import { genDeliveryTimeOptions, getDefaultOption, UNIT_TIMES } from "./deliveryTime";

export default {
  name: "DeliveryTimeSelectBox",

  components: {
    SelectBoxPanel,
  },

  props: {
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    checkedItem: {
      type: Object,
      default: null,
    },
    initialUnit: {
      type: Number,
      default: UNIT_TIMES[0],
    },
  },

  data() {
    return {
      // 表示時間切替用
      unitTimeIndex: UNIT_TIMES.findIndex(unit => unit === this.initialUnit),
    };
  },

  computed: {
    /**
     * 切替ボタンの押下した回数に応じて、お届け時間の単位を15/30/60分の単位で切り替える
     */
    unitTimeType() {
      return UNIT_TIMES[this.unitTimeIndex % UNIT_TIMES.length];
    },
    /**
     * お届け時間のOptionの値を返却する
     */
    deliveryTimeOptions() {
      return genDeliveryTimeOptions({
        openingTime: this.openingTime,
        closingTime: this.closingTime,
        unit: this.unitTimeType,
      });
    },
  },

  methods: {
    /**
     * 切替ボタンを押下したとき、押下した回数をカウントアップする
     */
    onChangeTimeUnit() {
      this.unitTimeIndex++;
      const unit = UNIT_TIMES[this.unitTimeIndex % UNIT_TIMES.length];
      const newOption = getDefaultOption({ unit, baseOption: this.checkedItem });
      this.$emit("change", newOption, unit);
    },
    /**
     * お届け時間のセレクトボックスを変更したとき、Optionをemitする
     */
    onChange(option) {
      const unit = UNIT_TIMES[this.unitTimeIndex % UNIT_TIMES.length];
      this.$emit("change", option, unit);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.select {
  margin-right: 8px;

  & /deep/ .options-container {
    width: 200px;
    max-height: 400px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 10px;
      background-color: $dustyGray;
    }
  }
}

.button {
  cursor: pointer;
  color: $white;
  text-decoration: underline;
  font-size: 1.2rem;
}
</style>
