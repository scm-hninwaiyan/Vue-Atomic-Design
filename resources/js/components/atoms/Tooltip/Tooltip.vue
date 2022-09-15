<template>
  <span
    v-tooltip="{
      content: getMessages,
      trigger: 'manual',
      show: isShow,
      placement,
      // v-popoverのtooltitと衝突しないように個別のクラス名を付与
      classes: ['validation'],
    }"
    class="wrapper"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
    placement: {
      type: String,
      default: "auto",
    },
  },
  computed: {
    isShow() {
      return this.messages.length > 0;
    },
    getMessages() {
      return this.messages.join("\n");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: inline-block;
}
</style>

<style lang="scss">
.tooltip.validation {
  .tooltip-arrow {
    border-color: #5b5b5b;
    opacity: 0.9;
    border-style: solid;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    z-index: 1;
  }

  .tooltip-inner {
    white-space: pre-wrap;
    background: #5b5b5b;
    opacity: 0.9;
    color: #f7f7f7;
    border-radius: 5px;
    font-size: 1.6rem;
    padding: 5px 10px;
  }
}

.tooltip[x-placement^="top"].validation .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"].validation {
  margin-top: 5px;
}
.tooltip[x-placement^="bottom"].validation .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^="right"].validation {
  margin-left: 5px;
}
.tooltip[x-placement^="right"].validation .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip[x-placement^="left"].validation {
  margin-right: 5px;
}
.tooltip[x-placement^="left"].validation .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
</style>
