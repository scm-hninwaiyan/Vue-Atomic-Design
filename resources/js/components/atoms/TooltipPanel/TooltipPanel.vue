<template>
  <div class="panel">
    <slot />
  </div>
</template>

<script>
export default {
  name: "TooltipPanel",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.panel {
  position: absolute;
  right: -5px;
  min-width: 306px;
  background: $ebony;
  opacity: 1;
  box-shadow: 0px 3px 6px $clearBlack;
  border-radius: 10px;
  font-size: 1.6rem;

  // パネルの吹き出しの矢印
  &::before {
    content: "";
    display: block;
    position: absolute;
    border-right: 10px solid transparent;
    border-bottom: 10px solid $ebony;
    border-left: 10px solid transparent;
    top: -5px;
    right: 5px;
    opacity: 1;
  }
}
</style>
