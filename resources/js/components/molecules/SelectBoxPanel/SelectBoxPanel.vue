<template>
  <SelectBoxPanelBase :options="options" :checkedItems="checkedItem" :label="checkedItemName" @change="onChange" />
</template>

<script>
import SelectBoxPanelBase from "./SelectBoxPanelBase";

export default {
  name: "SelectBoxPanel",

  model: {
    prop: "checkedItem",
    event: "change",
  },

  props: {
    checkedItem: {
      type: [Object, Number, String],
      default: null,
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
      // optionオブジェクトではなく、プリミティブな値の場合はそのまま表示
      if (typeof this.checkedItem === "string" || typeof this.checkedItem === "number") {
        return this.checkedItem;
      }

      return (this.checkedItem && this.checkedItem.label) || "";
    },
  },

  methods: {
    /**
     * オプション選択時に、changeイベントをemitする
     */
    onChange(option) {
      this.$emit("change", option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
