<template>
  <div class="select-box">
    <span class="label" @click="openOptions" v-click-outside="hideOptions">
      {{ label }}
      <Icon class="arrow-icon" :class="arrowIconStyle" name="arrow2" />
    </span>
    <div class="options-container">
      <ul class="options" v-if="isOpen">
        <Item
          class="option"
          v-for="option in options"
          :value="option.value"
          :key="option.value"
          :isActive="isChecked(option)"
          @click="onChange(option)"
        >
          {{ option.label }}
        </Item>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import Icon from "@/components/atoms/Icon";
import Item from "./SelectItem";

export default {
  name: "SelectBoxPanelBase",

  model: {
    prop: "checkedItems",
    event: "change",
  },

  props: {
    label: {
      type: [String, Number],
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    checkedItems: {
      type: [Array, Object, Number, String],
      default: null,
    },
  },

  directives: {
    ClickOutside,
  },

  components: {
    Item,
    Icon,
  },

  data() {
    return {
      isOpen: false,
    };
  },

  mounted() {
    // 自身がクリックされたとき、閉じないようにする
    this.popupItem = this.$el;
  },

  computed: {
    /**
     * セレクトボックスの矢印アイコンのCSSのクラス名を返却する
     */
    arrowIconStyle() {
      return { "arrow-icon--active": this.isOpen };
    },
  },

  methods: {
    /**
     * オプションが選択済みかどうかを判断する
     */
    isChecked(option) {
      // 複数選択可能なセレクトボックスのとき
      if (Array.isArray(this.checkedItems)) {
        return this.checkedItems.some(checkedOption => checkedOption.value === option.value);
      }
      // プリミティブな値の場合
      if (typeof this.checkedItems === "string" || typeof this.checkedItems === "number") {
        return this.checkedItems === option.value;
      }

      // optionオブジェクトの場合
      return this.checkedItems && this.checkedItems.value === option.value;
    },
    /**
     * オプション選択時に、changeイベントをemitする
     */
    onChange(option) {
      // オプション選択時にドロップダウンを閉じる
      this.hideOptions();

      // プリミティブな値の場合
      if (typeof this.checkedItems === "string" || typeof this.checkedItems === "number") {
        this.$emit("change", option.value);
        return;
      }

      this.$emit("change", option);
    },
    /**
     *  オプションパネルを開く
     */
    openOptions() {
      this.isOpen = true;
    },
    /**
     *  オプションパネルを閉じる
     */
    hideOptions() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.select-box {
  position: relative;
  width: 200px;
  text-align: center;

  .label {
    display: block;
    font-weight: bold;
    width: 90%;
    position: relative;
    border-radius: 5px;
    margin: 0 auto;
    padding: 7px 10px 7px 10px;
    background: $white;
    min-height: 40px;
    text-align: left;
  }

  .arrow-icon {
    position: absolute;
    top: 30%;
    transform: rotate(90deg);
    transition: all 0.3s;
    right: 10px;
    width: 10px;

    &--active {
      transform: rotate(270deg);
    }

    &/deep/ path {
      stroke: $black;
    }
  }

  .options-container {
    width: 100%;
    position: absolute;
    top: 40px;
    z-index: 1;
  }

  .options {
    font-size: 1.6rem;
    color: $black;
    background: $white;
    border: 1px solid $doveGray;
    border-radius: 5px;
  }

  .option {
    padding-top: 15px;

    &:last-of-type {
      padding-bottom: 15px;
    }

    &:hover {
      opacity: 0.8;
      background: $doveGray;
      color: $white;
    }
  }
}
</style>
