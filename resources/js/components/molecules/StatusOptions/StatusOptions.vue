<template>
  <ul class="options">
    <Option
      v-for="option in options"
      class="option"
      :key="option.value"
      :value="option.value"
      :active="isActive(option.value)"
      :disabled="isDisabled(option.value)"
      @click="onSelect"
    >
      {{ option.label }}
    </Option>
    <Button class="button" color="primary" type="button" @click="onUpdate" :disabled="!dirty">
      <Icon name="arrow2" class="button-icon" />
      登録
    </Button>
  </ul>
</template>

<script>
import { STATUS_OPTIONS, STATUS_CODE } from "@/enums";
import Icon from "@/components/atoms/Icon";
import Option from "@/components/atoms/Option";
import Button from "@/components/atoms/Button";

export default {
  name: "StatusOptions",

  components: {
    Icon,
    Option,
    Button,
  },

  props: {
    initialStatus: {
      type: Number,
      required: true,
    },
  },

  created() {
    this.status = this.initialStatus;
  },

  data() {
    return {
      status: null,
    };
  },

  computed: {
    /**
     * 初期状態のステータスから変更がある場合、true
     */
    dirty() {
      return this.status !== this.initialStatus;
    },
    /**
     *  ステータスの選択肢を返却する
     */
    options() {
      return STATUS_OPTIONS.filter(option => option.value !== STATUS_CODE.CANCEL).map(option => {
        if (this.initialStatus === STATUS_CODE.TODO && option.value === STATUS_CODE.COOKING) {
          return { ...option, label: "調理開始" };
        }

        if (this.initialStatus === STATUS_CODE.STOP && option.value === STATUS_CODE.COOKING) {
          return { ...option, label: "調理再開" };
        }
        return option;
      });
    },
  },

  methods: {
    /**
     * optionのステータスが選択済みかどうかを判定する
     */
    isActive(listItem) {
      return this.status === listItem;
    },
    /**
     * optionのステータスが選択不可かどうかを判断する
     */
    isDisabled(listItem) {
      // 未調理の場合、未調理/開始以外は非活性
      if (this.initialStatus === STATUS_CODE.TODO) {
        return ![STATUS_CODE.TODO, STATUS_CODE.COOKING].includes(listItem);
      }
      // 中断の場合、開始以外は非活性
      if (this.initialStatus === STATUS_CODE.STOP) {
        return ![STATUS_CODE.STOP, STATUS_CODE.COOKING].includes(listItem);
      }
      // 完了の場合、開始以外は非活性
      if (this.initialStatus === STATUS_CODE.DONE) {
        return ![STATUS_CODE.DONE, STATUS_CODE.COOKING].includes(listItem);
      }
      // 調理中の場合は、すべて活性
      return false;
      // キャンセルの場合は、操作パネルを開かないので、考慮していない
    },
    /**
     * ステータスを選択したとき
     */
    onSelect(value) {
      this.status = value;
    },
    /**
     * 登録ボタンを押下したとき
     */
    onUpdate() {
      this.$emit("update", this.status);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.options {
  padding: 0 36px;
  color: $white;
  text-align: center;

  .option {
    margin: 8px;
  }

  .button {
    margin: 8px auto 10px auto;
    width: 60px;
    height: 30px;

    &-icon {
      margin-right: 8px;
      width: 6px;
    }
  }
}
</style>
