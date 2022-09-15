<!--
  ログイン後のテンプレート
-->
<template>
  <div class="main-container" v-if="isLogin">
    <div class="main">
      <SideMenu />
      <div class="content">
        <div class="content-main">
          <slot name="content"></slot>
        </div>
      </div>
      <!--新着伝票用モーダル -->
      <SlipModal
        v-if="isShowNewSlipModal"
        renderTo="new-slip-modal"
        isNewSlip
        :slip="unconfirmedNewSlip"
        :storeName="storeName"
        :loginShopType="loginShopType"
        :systemDate="systemDate"
        :alertSetting="alertSetting"
        @close="confirmSlip(unconfirmedNewSlip)"
      />
      <!--汎用エラーダイアログ -->
      <ErrorDialog v-if="errorMessage" :message="errorMessage" @close="closeErrorDialog" />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlipRepository from "@/repositories/rex-api/SlipRepository";
import AlertRepository from "@/repositories/rex-api/AlertRepository";
import SideMenu from "@/components/organisms/SideMenu";
import SlipModal from "@/components/organisms/SlipModal";
import Footer from "@/components/organisms/Footer/Footer.vue";
import ErrorDialog from "@/components/organisms/ErrorDialog";

/**
 *  KDのポーリング処理を行うコンポーネント。
 *  以下の処理定期的に実行する。
 *  1. 伝票一覧取得API/アラート取得APIを実行する
 *  2. 現在時刻の取得
 */

// ポーリング間隔
const INTERVAL = 5000;

export default {
  name: "Main",

  components: {
    SideMenu,
    SlipModal,
    Footer,
    ErrorDialog,
  },

  data() {
    return {
      intervalId: null,
    };
  },

  async created() {
    this.intervalId = setInterval(this.polling, INTERVAL);
  },

  destroyed() {
    clearInterval(this.intervalId);
  },

  computed: {
    ...mapGetters("uiStore", ["ignoreNewSlipModal", "errorMessage", "systemDate", "disablePolling"]),
    ...mapGetters("alertSettingStore", ["alertSetting"]),
    ...mapGetters("authStore", ["isLogin", "isPrimaryChief", "storeName", "loginShopType"]),
    ...mapGetters("slipStore", ["unconfirmedNewSlip"]),
    /**
     * 新着伝票があった場合に伝票詳細モーダルを表示するかどうか
     * @return {Boolean} 表示させる場合true
     */
    isShowNewSlipModal() {
      // 以下の場合、表示する
      // ・ログインユーザーのアクターが司令塔
      // ・未確認の新規伝票がある
      // ・新規伝票を表示しない設定になっていない(※1)
      //
      //  ※1 伝票一覧画面で伝票詳細画面を手動で開いている場合に設定
      return this.isPrimaryChief && this.unconfirmedNewSlip && !this.ignoreNewSlipModal;
    },
  },

  methods: {
    ...mapActions("uiStore", ["setLoading", "setErrorMessage", "updateSystemDate"]),
    ...mapActions("authStore", ["setOrigin", "setAuth"]),
    ...mapActions("slipStore", ["setSlips", "confirmSlip"]),
    ...mapActions("alertSettingStore", ["setAlertSetting"]),
    /**
     * ポーリング処理
     */
    polling() {
      if (process.env.VUE_APP_POLLING_MODE !== "true") {
        return;
      }

      // ポーリング設定がオフの場合
      if (this.disablePolling) {
        return;
      }

      this.fetchData();
      this.updateSystemDate();
    },
    /**
     * エラーダイアログを閉じる
     */
    closeErrorDialog() {
      this.setErrorMessage("");
    },
    /**
     *  各種データを取得する
     */
    async fetchData() {
      // 伝票一覧/アラート設定を取得する
      try {
        const [slips, alertSetting] = await Promise.all([SlipRepository.get(), AlertRepository.get()]);
        this.setSlips(slips);
        this.setAlertSetting(alertSetting);
      } catch (error) {
        this.setErrorMessage(error);
        this.setLoading(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@import "@/assets/styles/mq.scss";

.main {
  display: flex;
  // サイドメニュの高さとコンテンツの高さは揃えない
  align-items: flex-start;

  .content {
    flex: 1;
    // サイドメニューの横幅分
    max-width: calc(100% - 240px);

    &-main {
      min-height: calc(100vh - 56px);
    }
  }
}

.footer {
  margin-left: auto;
  // サイドメニューの横幅分
  width: calc(100% - 240px);
}

@include mq-down() {
  .main {
    .content {
      max-width: calc(100% - 200px);
    }
  }
  .footer {
    max-width: calc(100% - 200px);
  }
}
</style>
