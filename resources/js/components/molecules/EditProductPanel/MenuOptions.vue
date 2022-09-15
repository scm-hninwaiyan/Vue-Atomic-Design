<template>
  <ul class="options">
    <li class="option" @click="updateMenu(panelMenus.CHARGE)">
      担当を変更する
      <Icon name="arrow2" class="arrow" />
    </li>
    <li class="option" @click="updateMenu(panelMenus.STATUS)">
      調理ステータスを変更する
      <Icon name="arrow2" class="arrow" />
    </li>
    <li class="option" @click="updateMenu(panelMenus.MANUAL)">
      マニュアルを見る
      <Icon name="arrow2" class="arrow" />
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/atoms/Icon";
import { PANEL_MENUS } from "./EditProductPanel";

export default {
  name: "MenuOptions",

  components: {
    Icon,
  },

  props: {},

  computed: {
    panelMenus() {
      return PANEL_MENUS;
    },
  },

  methods: {
    updateMenu(menuName) {
      this.$emit("updateMenu", menuName);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.options {
  color: $white;
  text-align: left;
  padding: 0 21px;

  .option {
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      opacity: 0.8;
    }

    &:first-of-type {
      margin-top: 0px;
    }

    margin-top: 20px;
  }
}

.arrow {
  margin-left: auto;
  width: 10px;
  & /deep/ path {
    stroke-width: 1px;
  }
}
</style>
