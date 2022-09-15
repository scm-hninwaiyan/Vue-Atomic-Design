<template>
  <!--
    担当者変更パネル 商品一覧から担当者を変更するデザインがベース 
    伝票一覧から担当者変更を行うコンポーネントは、EditProductPanelが包括してる
   -->
  <div class="panel">
    <!--ステータス更新時のローディング -->
    <div v-if="isUpdating" class="panel-loading">
      <Loader :loading="true" />
    </div>
    <StatusOptions class="status-options" v-else :initialStatus="initialStatus" @update="onUpdate" />
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import StatusOptions from "@/components/molecules/StatusOptions";

export default {
  name: "EditStatusPanel",

  components: {
    Loader: BeatLoader,
    StatusOptions,
  },

  props: {
    initialStatus: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isUpdating: false,
    };
  },

  computed: {},

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
    onUpdate(status) {
      this.$emit("update", {
        status,
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
  opacity: 0.9;
  box-shadow: 0px 3px 6px $clearBlack;
  border-radius: 10px;
  font-size: 1.6rem;

  // 吹き出し
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
    width: 560px;
    height: 76px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.status-options {
  display: flex;
  align-items: center;
  padding: 12px 10px !important;
  font-size: 1.8rem;

  & /deep/ .option {
    margin: 10px 15px;
  }

  & /deep/ .tip {
    width: 90px;
  }

  & /deep/ .button {
    font-size: 1.6rem;
  }
}
</style>
