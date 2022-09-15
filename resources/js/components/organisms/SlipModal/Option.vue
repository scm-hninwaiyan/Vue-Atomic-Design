<template>
  <div class="option">{{ option.grpName }}:{{ option.name }}</div>
</template>

<script>
export default {
  name: "Option",

  props: {
    option: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.option {
  margin-top: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  padding-left: 4px;
}
</style>
