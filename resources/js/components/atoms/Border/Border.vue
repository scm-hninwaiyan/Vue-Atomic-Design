<template>
  <hr class="border" />
</template>

<script>
export default {
  name: "border",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.border {
  box-shadow: 0px 3px 6px $clearBlack;
  border: 1px solid $teak;
  background-color: $teak;
}
</style>
