<template>
  <!--
    担当者変更パネル 伝票一覧から担当者を変更するようにデザインがベース 
    -->
  <div class="panel">
    <!--担当更新時のローディング -->
    <div v-if="isUpdating" class="panel-loading">
      <Loader :loading="true" />
    </div>
    <ChargeOptions v-else :initialActors="initialActors" :loginShopType="loginShopType" @update="onUpdate" />
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import { ACTOR_NAME_SHORT, ACTOR_OPTIONS } from "@/enums";
import ChargeOptions from "@/components/molecules/ChargeOptions";

export default {
  name: "EditChargePanel",

  components: {
    Loader: BeatLoader,
    ChargeOptions,
  },

  props: {
    // 選択済の担当者
    initialActors: {
      type: Array,
      default: () => [],
    },
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isUpdating: false,
    };
  },

  created() {
    this.actors = [...this.initialActors];
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
  },

  methods: {
    /**
     * ローディングの状態を更新する
     */
    setUpdating(isUpdating) {
      this.isUpdating = isUpdating;
    },
    /**
     * 登録ボタンを押下したとき
     */
    onUpdate(actors) {
      this.$emit("update", {
        actors,
        // 親コンポーネントで非同期処理を行う際に、子コンポーネントのローディング状態を制御する
        setUpdating: this.setUpdating,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
.panel {
  position: absolute;
  right: -5px;
  min-width: 100px;
  background: $ebony;
  opacity: 1;
  box-shadow: 0px 3px 6px $clearBlack;
  border-radius: 10px;
  font-size: 1.6rem;

  &::before {
    content: "";
    display: block;
    position: absolute;
    border-right: 10px solid transparent;
    border-bottom: 10px solid $ebony;
    border-left: 10px solid transparent;
    top: -5px;
    right: 5px;
    opacity: 0.85;
  }

  &-loading {
    height: 307px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
