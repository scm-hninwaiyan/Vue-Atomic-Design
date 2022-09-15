<template>
  <Overlay @click="onClose" class="overlay">
    <div class="modal">
      <p class="modal-text">ログアウトします</p>
      <div class="modal-button-wrap">
        <Button class="modal-button modal-button-cancel" @click="onClose">キャンセル</Button>
        <Button class="modal-button modal-button-logout" @click="logout">ログアウト</Button>
      </div>
    </div>
  </Overlay>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Overlay from "@/components/atoms/Overlay";
import Button from "@/components/atoms/Button";
import AuthRepository from "@/repositories/rex-api/AuthRepository";

export default {
  name: "LogoutModal",

  components: {
    Overlay,
    Button,
  },

  data() {
    return {
      y: null,
    };
  },

  created() {
    // モーダル表示中に背景をスクロールさせないようにする
    // https://coliss.com/articles/build-websites/operation/javascript/prevent-page-scrolling-when-a-modal-is-open.html
    // 移動量を取得
    this.y = window.pageYOffset;
    // fixedにして背景をスクロールさせないようにする
    document.body.classList.add("no-scroll");
    // スクロール量に応じて背景の位置を調整
    document.body.style.top = `-${this.y}px`;
  },

  beforeDestroy() {
    // 固定した背景を戻す
    document.body.classList.remove("no-scroll");
    document.body.style.top = "";
    window.scrollTo(0, this.y);
  },

  computed: {
    ...mapGetters("authStore", ["loginShopType"]),
  },

  methods: {
    ...mapActions("uiStore", ["setLoading", "setErrorMessage", "resetUIState"]),
    ...mapActions("authStore", ["resetAuth"]),
    /**
     * モーダルを閉じる
     */
    onClose() {
      this.$emit("close");
    },

    /**
     * ログアウトする
     */
    async logout() {
      this.setLoading(true);
      try {
        await AuthRepository.kdLogout({ loginShopType: this.loginShopType });
      } catch (error) {
        this.setErrorMessage(error);
        this.setLoading(false);
        return;
      }
      this.setLoading(false);
      // Vuexの認証情報もクリアする
      this.resetAuth();
      // 絞り込み条件等もクリアする
      this.resetUIState();
      window.location.assign("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.overlay {
  z-index: 100;
}

.modal {
  font-weight: bold;

  &-text {
    text-align: center;
    font-size: 4rem;
    margin-bottom: 97px;
  }

  &-button-wrap {
    display: flex;
    justify-content: space-between;
    width: 687px;
  }

  &-button {
    width: 300px;
    height: 80px;
    font-size: 2.4rem;

    &-cancel {
      background-color: $Iron;
      color: $black;
    }

    &-logout {
      background-color: $blueRibbon;
    }
  }
}
</style>
