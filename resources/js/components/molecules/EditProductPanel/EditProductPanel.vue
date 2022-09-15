<template>
  <TooltipPanel>
    <div v-if="showPrevArrow" class="panel-header">
      <Icon name="arrow2" class="arrow" @click="prev" />
    </div>
    <!--担当/ステータス更新時のローディング -->
    <div v-if="isUpdating" class="panel-loading">
      <Loader :loading="true" />
    </div>
    <div class="panel-options" v-else>
      <MenuOptions v-if="currentOption === 'MenuOptions'" @updateMenu="updateMenu" />
      <ChargeOptions
        v-else-if="currentOption === 'ChargeOptions'"
        class="charge-options"
        :initialActors="initialActors"
        :loginShopType="loginShopType"
        @update="onUpdateCharge"
      />
      <StatusOptions
        v-else-if="currentOption === 'StatusOptions'"
        :initialStatus="initialStatus"
        @update="onUpdateStatus"
      />
      <ManualOptions v-else :appendices="appendices" @click="onOpenCrib" />
    </div>
  </TooltipPanel>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import { ACTOR_NAME_SHORT, ACTOR_OPTIONS } from "@/enums";
import Icon from "@/components/atoms/Icon";
import TooltipPanel from "@/components/atoms/TooltipPanel";
import StatusOptions from "@/components/molecules/StatusOptions";
import ChargeOptions from "@/components/molecules/ChargeOptions";
import MenuOptions from "./MenuOptions";
import ManualOptions from "./ManualOptions";

export const PANEL_MENUS = {
  MENU: "MenuOptions",
  CHARGE: "ChargeOptions",
  STATUS: "StatusOptions",
  MANUAL: "ManualOptions",
};

export default {
  name: "EditProductPanel",

  components: {
    TooltipPanel,
    Loader: BeatLoader,
    Icon,
    MenuOptions,
    ChargeOptions,
    StatusOptions,
    ManualOptions,
  },

  props: {
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
    // 選択済の担当者
    initialActors: {
      type: Array,
      default: () => [],
    },
    // 選択済のステータス
    initialStatus: {
      type: Number,
      required: true,
    },
    // あんちょこ/商品動画URL
    appendices: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      currentOption: "MenuOptions",
      isUpdating: false,
    };
  },

  computed: {
    /**
     *  アクターの選択肢を返却する
     */
    options() {
      return ACTOR_OPTIONS[this.loginShopType].map(option => ({
        ...option,
        label: ACTOR_NAME_SHORT[this.loginShopType][option.value],
      }));
    },
    /**
     * パネルヘッダーの矢印ボタンの表示制御
     */
    showPrevArrow() {
      return this.currentOption !== PANEL_MENUS.MENU;
    },
  },

  methods: {
    /**
     * ローディングの状態を更新する
     */
    setUpdating(isUpdating) {
      this.isUpdating = isUpdating;
    },
    /**
     * 引数のアクターが、伝票のアクター内に存在するかを判断する
     */
    isActorActive(listActor) {
      return this.actors.includes(listActor);
    },
    /**
     * 表示するメニューをセットする
     */
    updateMenu(menuName) {
      this.currentOption = menuName;
    },
    /**
     * パネルヘッダーの矢印ボタンを押下したとき
     */
    prev() {
      this.currentOption = PANEL_MENUS.MENU;
    },
    /**
     * 担当者変更の登録ボタンを押下したとき
     */
    onUpdateCharge(actors) {
      this.$emit("updateCharge", {
        actors,
        // 親コンポーネントで非同期処理を行う際に、子コンポーネントのローディング状態を制御する
        setUpdating: this.setUpdating,
      });
    },
    /**
     * ステータスの登録ボタンを押下したとき
     */
    onUpdateStatus(status) {
      this.$emit("updateStatus", {
        status,
        // 親コンポーネントで非同期処理を行う際に、子コンポーネントのローディング状態を制御する
        setUpdating: this.setUpdating,
      });
    },
    /**
     * マニュアルパネルであんちょこを押下したとき
     */
    onOpenCrib() {
      this.$emit("openCrib");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.panel {
  &-header {
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;

    .arrow {
      width: 10px;
      transform: scale(-1, 1);
      & /deep/ path {
        stroke-width: 1px;
      }
    }
  }

  &-loading {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-options {
    padding: 10px 0;
  }
}

.charge-options {
  width: 306px;
  display: flex;
  padding: 0 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  & /deep/ .option {
    margin: 8px;
    &:first-of-type {
      margin: 8px;
    }
  }

  & /deep/ .button {
    margin: 8px auto 10px auto;
  }
}
</style>
