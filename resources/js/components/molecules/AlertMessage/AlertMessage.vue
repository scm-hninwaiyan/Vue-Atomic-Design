<template>
  <p class="alert-message">
    配達時間が規定時間を超えている伝票があります。
  </p>
</template>

<script>
export default {
  name: "AlertMessage",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.alert-message {
  color: $red;
  font-weight: bold;
}
</style>
