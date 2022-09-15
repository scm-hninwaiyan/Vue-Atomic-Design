<template>
  <div class="topping">{{ topping.grpName }}:{{ topping.name }}</div>
</template>

<script>
export default {
  name: "Topping",

  props: {
    topping: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.topping {
  margin-top: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  padding-left: 4px;
}
</style>
