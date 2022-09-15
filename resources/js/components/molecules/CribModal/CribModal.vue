<template>
  <portal to="modal">
    <Overlay @click="onClose">
      <div class="crib-modal">
        <Icon class="close-icon" name="close2" @click="onClose" />
        <div class="crib-img">
          <img src="https://picsum.photos/700/700" class="img" alt="crib" width="700" height="700" />
        </div>
        <div class="product-img">
          <img src="https://picsum.photos/700/400" class="img" alt="product" width="700" height="400" />
        </div>
      </div>
    </Overlay>
  </portal>
</template>

<script>
import Overlay from "@/components/atoms/Overlay";
import Icon from "@/components/atoms/Icon";

export default {
  name: "CribModal",

  props: {
    // TODO
    //imgs: {
    //  type: Array,
    //  default: () => [],
    //},
    //movieUrl: {
    //  type: String,
    //  default: "",
    //},
  },

  components: {
    Overlay,
    Icon,
  },

  computed: {},

  methods: {
    /**
     * モーダルを閉じる
     */
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
.crib-modal {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  .close-icon {
    position: absolute;
    top: 50px;
    right: 50px;

    width: 50px;
    height: 50px;
  }
  .crib-img {
    margin-right: 150px;
  }
}

.img {
  background-image: url("~@/assets/svg/ic_loading.svg?base64");
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
