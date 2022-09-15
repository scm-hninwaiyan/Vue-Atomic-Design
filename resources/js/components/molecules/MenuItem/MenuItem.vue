<template>
  <div class="menu-item">
    <div class="menu-item-img">
      <img :src="menus.src" alt="item_img" width="300" height="221" />
      <img class="icon-zoom" src="@/assets/img/icon_zoom.png" alt="icon_zoom" />
    </div>
    <div class="menu-item-info">
      <p class="menu-item-ttl">{{ menus.name }}</p>
      <button class="btn">詳細</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuItem",

  props: {
    menus: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.menu-item {
  width: 300px;
  height: 341px;
  margin: 0px 53px 40px 0px;
}
.menu-item-img {
  position: relative;
}
.icon-zoom {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 177px;
  left: 259px;
}
.menu-item-info {
  box-shadow: 0px 3px 6px $clearBlack;
  height: 120px;
  background: $white;
  display: flex;
  flex-direction: column;
}
.menu-item-ttl {
  color: $teak;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 18px 0px 26px 30px;
}
.btn {
  width: 200px;
  height: 40px;
  border-radius: 30px;
  box-shadow: 0px 3px 6px $clearBlack;
  text-align: center;
  color: $white;
  background: $teak;
  font-size: 1.4rem;
  border-color: transparent;
  border-width: 0px;
  align-self: center;
}
</style>
