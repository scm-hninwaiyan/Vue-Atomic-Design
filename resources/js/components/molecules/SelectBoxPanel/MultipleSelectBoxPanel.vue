<template>
  <SelectBoxPanelBase :options="options" :checkedItems="checkedItems" :label="checkedItemName" @change="onChange" />
</template>

<script>
import SelectBoxPanelBase from "./SelectBoxPanelBase";

export default {
  name: "MultipleSelectBoxPanel",

  model: {
    prop: "checkedItems",
    event: "change",
  },

  props: {
    checkedItems: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    SelectBoxPanelBase,
  },

  computed: {
    /**
     * セレクトボックスに表示するラベルを返却する
     */
    checkedItemName() {
      if (this.checkedItems.length === 0) return "すべて";
      return this.checkedItems.map(item => item.label).join("/");
    },
  },

  methods: {
    /**
     * オプションが選択済みかどうかを判断する
     */
    isChecked(option) {
      return this.checkedItems.some(checkedOption => checkedOption.value === option.value);
    },
    /**
     * オプション選択時に、changeイベントをemitする
     */
    onChange(option) {
      // オプションが選択済みなら除去、なければ追加
      const newState = this.isChecked(option)
        ? this.checkedItems.filter(checkedOption => checkedOption.value !== option.value)
        : [...this.checkedItems, option];

      this.$emit("change", newState);
    },
  },
};
</script>

<style lang="scss" scoped></style>
