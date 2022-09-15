<template>
  <div class="overlay" @click="onClick">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Overlay",

  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/color.scss";

.overlay {
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($ebony, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
