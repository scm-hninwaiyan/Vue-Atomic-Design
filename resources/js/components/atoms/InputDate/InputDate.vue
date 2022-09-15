<template>
  <div class="container" v-click-outside="hideDatePicker">
    <span class="date-text" @click="showDatePicker">
      {{ dateText }}
      <Icon name="calendar" class="date-icon" />
    </span>
    <div class="date-picker-wrapper">
      <DatePicker v-if="isShowDatePicker" :min-date="minDate" :value="valueToDate" @input="onInput" />
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import { dateToString, stringToDate } from "@/utils";
import Icon from "@/components/atoms/Icon";

export default {
  name: "InputDate",

  props: {
    value: {
      type: String,
      required: true,
    },
    minDate: {
      type: Date,
      default: null,
    },
  },

  directives: {
    ClickOutside,
  },

  components: {
    DatePicker,
    Icon,
  },

  data() {
    return {
      isShowDatePicker: false,
    };
  },

  mounted() {
    // 自身がクリックされたとき、閉じないようにする
    this.popupItem = this.$el;
  },

  computed: {
    valueToDate() {
      return this.value === "" ? new Date() : stringToDate(this.value, "yyyyMMdd");
    },
    dateText() {
      return dateToString(this.valueToDate, "yyyy年MM月dd日(EEEEE)");
    },
  },

  methods: {
    showDatePicker() {
      this.isShowDatePicker = true;
    },
    hideDatePicker() {
      this.isShowDatePicker = false;
    },
    onInput(date) {
      this.$emit("input", dateToString(date, "yyyyMMdd"));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
.container {
  position: relative;

  .date-picker-wrapper {
    position: absolute;
    z-index: 1;
  }
}

.date {
  &-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 20px;
    border: 1px solid $black;
  }

  &-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
