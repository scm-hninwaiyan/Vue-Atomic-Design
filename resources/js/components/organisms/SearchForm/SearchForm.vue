<template>
  <form @submit.prevent="onSubmit">
    <div class="search-form">
      <div class="col">
        <label class="label">伝票番号</label>
        <InputText class="input-slip" v-model="slipId" />
      </div>
      <div class="col">
        <label class="label">{{ isPast ? "お届け時間" : "撮影日時" }}</label>
        <InputDate class="input-date" v-model="date" :minDate="oldestDay" />
        <DeliveryTimeSelectBox
          class="input-time"
          :openingTime="openingTime"
          :closingTime="closingTime"
          :checkedItem="checkedTime"
          @change="onChangeDeliveryTime"
        />
      </div>
    </div>
    <div class="search-btn-wrap">
      <Button type="submit" class="button--primary submit-button">検索</Button>
    </div>
  </form>
</template>

<script>
import { subDays, dateToString, stringToDate, addDays } from "@/utils";
import { getDefaultOption, optionValueToDate } from "@/components/molecules/DeliveryTimeSelectBox/deliveryTime";
import DeliveryTimeSelectBox from "@/components/molecules/DeliveryTimeSelectBox";
import Button from "@/components/atoms/Button";
import InputText from "@/components/atoms/InputText";
import InputDate from "@/components/atoms/InputDate";

const genToDateString = (dateString, toString) => {
  // 0時0分の場合、日付を翌日にする
  if (toString === "0000") {
    const date = stringToDate(dateString, "yyyyMMdd");
    const tommorowDate = addDays(date, 1);
    const tommorowString = dateToString(tommorowDate, "yyyyMMdd");
    return `${tommorowString}${toString}`;
  }

  return `${dateString}${toString}`;
};
/**
 * 過去伝票/調理写真一覧は過去30日まで参照可能
 */
const AVAILABLE_OLDEST_DAY = 30;

export default {
  name: "SearchForm",

  props: {
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    // 過去伝票で利用する場合true
    isPast: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    DeliveryTimeSelectBox,
    Button,
    InputText,
    InputDate,
  },

  data() {
    return {
      slipId: "",
      date: dateToString(new Date(), "yyyyMMdd"),
      checkedTime: getDefaultOption({ openingTime: this.openingTime, closingTime: this.closingTime }),
    };
  },

  computed: {
    /**
     * 検索フォームのカレンダーで選択可能な最古の日付を返却する
     */
    oldestDay() {
      return subDays(new Date(), AVAILABLE_OLDEST_DAY);
    },
  },

  methods: {
    /**
     * 検索ボタンを押下したとき
     */
    onSubmit() {
      const { from, to } = optionValueToDate(this.checkedTime);

      const fromString = dateToString(from, "HHmm");
      const toString = dateToString(to, "HHmm");
      const fromDateString = `${this.date}${fromString}`;

      this.$emit("submit", {
        slipId: this.slipId,
        from: fromDateString,
        to: genToDateString(this.date, toString),
      });
    },
    /**
     * 時刻にセレクトボックスの値を変更したとき
     */
    onChangeDeliveryTime(deliveryTimeOptions) {
      this.checkedTime = deliveryTimeOptions;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.search-form {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1620px;
  height: 120px;
  margin: 80px 0px 77px 0px;
  font-size: 1.8rem;
  font-weight: bold;
  background-color: $white;
  box-shadow: 0px 3px 6px $clearBlack;
  border-radius: 17px;

  .col {
    margin-right: 60px;
    display: flex;
    align-items: center;

    &:first-of-type {
      &::after {
        display: block;
        content: "";
        border-left: 1px solid $black;
        height: 30px;
        margin-left: 60px;
      }
    }
  }
}

.label {
  margin-right: 27px;
}

.input-slip {
  width: 238px;
}

.input-date {
  width: 320px;
  margin-right: 35px;
}

.input-time {
  display: flex;
  align-items: center;
  width: 240px;

  & /deep/ .select {
    width: 80%;
    border: 1px solid $black;
    height: 60px;
    display: flex;
    align-items: center;
  }

  & /deep/ .button {
    color: $black;
  }
}

.search-btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button {
  padding: 0 60px;
}
</style>
