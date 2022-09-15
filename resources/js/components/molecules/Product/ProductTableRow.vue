<template>
  <!-- 
  商品一覧の商品行
  -->
  <div class="row" :class="rowStyle">
    <div class="inner-row">
      <!--商品名 -->
      <div class="name-col">
        <Icon v-if="isSushiJoto" name="sushi-joto" class="sushi-joto-icon" />
        <v-popover offset="16" placement="right" trigger="manual" :open="isShowManualPanel" @hide="onHideManualPanel">
          <div class="name" :class="nameStyle" @click="toggleManualPanel">{{ product.name }}</div>
          <template slot="popover">
            <TooltipPanel v-if="isShowManualPanel && appendices" class="manual-panel">
              <ManualOptions class="manual-options" :appendices="appendices" @click="onOpenCrib" />
            </TooltipPanel>
          </template>
        </v-popover>
      </div>
      <!--容器 -->
      <div>
        <ContainerTypeIcon v-if="product.containerType" :value="product.containerType" />
      </div>
      <!--シャリ -->
      <div>
        <RiceTypeIcon v-if="product.riceType" :value="product.riceType" />
      </div>
      <!--ワサビ -->
      <div>
        <WasabiTypeIcon v-if="product.wasabiType" :value="product.wasabiType" />
      </div>
      <!--数量 -->
      <div class="quantity-col">{{ product.quantity }}</div>
      <!--担当 -->
      <div class="actor-col">
        <div v-if="isCancel" class="cancel-text">
          <p>キャンセル(変更)されたので伝票詳細を確認してください。</p>
        </div>
        <div v-else>
          <!--Note see src/components/molecules/Slip/ProductRow.vue -->
          <v-popover
            offset="0"
            placement="top-end"
            trigger="manual"
            :open="isShowEditChargePanel"
            @hide="onHideEditChargePanel"
          >
            <ActorsRow :checkedActors="product.actors" :loginShopType="loginShopType" @click="toggleEditChargePanel" />
            <template slot="popover">
              <EditChargePanel
                v-if="isShowEditChargePanel"
                class="edit-charge-panel"
                :initialActors="product.actors"
                :loginShopType="loginShopType"
                @update="onUpdateCharge"
              />
            </template>
          </v-popover>
        </div>
      </div>
      <!--ステータス -->
      <div>
        <div v-if="!isCancel">
          <v-popover offset="4" trigger="manual" :open="isShowEditStatusPanel" @hide="onHideEditStatusPanel">
            <Status :value="product.status" @click="toggleEditStatusPanel" />
            <template slot="popover">
              <EditStatusPanel v-if="isShowEditStatusPanel" :initialStatus="product.status" @update="onUpdateStatus" />
            </template>
          </v-popover>
        </div>
      </div>
    </div>
    <Swaps v-if="product.swaps" class="product-swaps" :swaps="product.swaps" />
  </div>
</template>

<script>
import { STATUS_CODE, SHOP_TYPE } from "@/enums";
import EditStatusPanel from "@/components/molecules/EditStatusPanel";
import EditChargePanel from "@/components/molecules/EditChargePanel";
import ActorsRow from "@/components/molecules/ActorsRow";
import TooltipPanel from "@/components/atoms/TooltipPanel";
import ManualOptions from "@/components/molecules/EditProductPanel/ManualOptions";
import Swaps from "@/components/molecules/Swaps";
import Icon, { RiceTypeIcon, ContainerTypeIcon, WasabiTypeIcon } from "@/components/atoms/Icon";
import Status from "@/components/atoms/Status";

export default {
  name: "ProductTableRow",

  props: {
    // 商品
    product: {
      type: Object,
      required: true,
    },
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
  },

  components: {
    TooltipPanel,
    ManualOptions,
    EditStatusPanel,
    EditChargePanel,
    ActorsRow,
    Swaps,
    Icon,
    RiceTypeIcon,
    ContainerTypeIcon,
    WasabiTypeIcon,
    Status,
  },

  data() {
    return {
      isShowManualPanel: false,
      isShowEditChargePanel: false,
      isShowEditStatusPanel: false,
    };
  },

  computed: {
    /**
     * 商品行のクラスを返却する
     */
    rowStyle() {
      return { "row--complete": this.isComplete };
    },
    /**
     * 商品名のクラスを返却する
     */
    nameStyle() {
      // あんちょこがない場合
      return { "name--disable": !this.appendices };
    },
    /**
     * すし上等の場合、true
     */
    isSushiJoto() {
      return this.product.shopType === SHOP_TYPE.SUSHI_JOTO;
    },
    /**
     * ステータスがキャンセル/注文変更の場合trueを返却
     */
    isCancel() {
      return this.product.status === STATUS_CODE.CANCEL || this.product.status === STATUS_CODE.CHANGED;
    },
    /**
     * ステータスが調理完了の場合trueを返却
     */
    isComplete() {
      return this.product.status === STATUS_CODE.DONE;
    },
    /**
     * 商品に紐づくあんちょこ/研修動画を返却する
     */
    appendices() {
      // Note
      // 同じ商品IDの商品でも、紐づくあんちょこが異なる可能性がある。
      // サマリされているので、最初の1件目を返却する
      const appendices = this.product.summarizedAppendices;
      return appendices ? appendices[0] : null;
    },
  },

  methods: {
    /**
     * tooltipの外を押下したとき
     */
    onHideManualPanel() {
      this.isShowManualPanel = false;
    },
    /**
     * tooltipの外を押下したとき
     */
    onHideEditStatusPanel() {
      this.isShowEditStatusPanel = false;
    },
    /**
     * tooltipの外を押下したとき
     */
    onHideEditChargePanel() {
      this.isShowEditChargePanel = false;
    },
    /**
     * マニュアルパネルのUIの表示制御を行う
     */
    toggleManualPanel() {
      this.isShowManualPanel = !this.isShowManualPanel;
    },
    /**
     * ステータス編集パネルのUIの表示制御を行う
     */
    toggleEditStatusPanel() {
      this.isShowEditStatusPanel = !this.isShowEditStatusPanel;
    },
    /**
     * 担当者編集パネルのUIの表示制御を行う
     */
    toggleEditChargePanel() {
      this.isShowEditChargePanel = !this.isShowEditChargePanel;
    },
    /**
     * 調理担当を変更したときのイベントをemitする
     */
    onUpdateCharge(payload) {
      const newProduct = { ...this.product, actors: payload.actors };

      // 更新後にパネルを閉じる
      const handleUpdate = isUpdating => {
        if (!isUpdating) {
          this.onHideEditChargePanel();
        }
        payload.setUpdating(isUpdating);
      };

      this.$emit("updateProduct", {
        // 親コンポーネントで非同期処理を行う際に、子コンポーネントのローディング状態を制御する
        setUpdating: handleUpdate,
        newProduct,
      });
    },
    /**
     * ステータスを変更したときのイベントをemitする
     */
    onUpdateStatus(payload) {
      const newProduct = { ...this.product, status: payload.status };

      // 更新後にパネルを閉じる
      const handleUpdate = isUpdating => {
        if (!isUpdating) {
          this.onHideEditStatusPanel();
        }
        payload.setUpdating(isUpdating);
      };

      this.$emit("updateProduct", {
        setUpdating: handleUpdate,
        newProduct,
        toDone: this.product.status !== STATUS_CODE.DONE && payload.status === STATUS_CODE.DONE,
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
@import "@/assets/styles/mq.scss";

.row {
  background: $white;
  border-radius: 8px;
  box-shadow: 0px 0px 4px #99999952;

  &--complete {
    background: $mercury;
  }
}

.inner-row {
  display: grid;
  align-items: center;
  text-align: center;
  grid-template-columns: 1fr 54px 54px 54px 54px 680px 160px;
  height: 84px;

  @include mq-down() {
    grid-template-columns: 1fr 54px 54px 54px 54px 440px 110px;
  }
}

.name-col {
  text-align: left;
  display: flex;
  align-items: center;
  margin-left: 16px;
  word-break: break-all;
}

.sushi-joto-icon {
  width: 40px;
}

.name {
  margin-left: 16px;
  text-decoration-line: underline;
  cursor: pointer;

  &--disable {
    text-decoration-line: none;
    cursor: none;
  }
}

.quantity-col {
  font-weight: bold;
}

.actor-col {
  display: flex;
  text-align: left;
  margin-left: 30px;
  font-weight: bold;
}

.cancel-text {
  color: $red;
}

.manual-panel {
  right: auto;
  top: -50px;
  padding: 10px;

  &::before {
    top: calc(50% - 5px);
    left: -20px;
    right: auto;
    border-right: 10px solid $ebony;
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent;
  }
}

// 商品一覧用にデザイン変更
.edit-charge-panel {
  &/deep/.options {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    padding: 20px 10px;
  }

  & /deep/ .option {
    margin: 0 5px;

    &:first-of-type {
      margin: 0 5px;
    }
  }
  & /deep/.button {
    margin: 0;
  }

  & /deep/.panel-loading {
    width: 590px;
    height: 72px;
  }
}

.product-swaps {
  padding-left: 16px;
  padding-bottom: 16px;
}
</style>
