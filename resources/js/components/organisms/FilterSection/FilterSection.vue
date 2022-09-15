<template>
  <div class="filter-section">
    <div class="condition-container">
      <div v-if="showActor" class="condition">
        <label class="condition-label">担当別</label>
        <SelectBoxPanel
          class="condition-input-actor"
          :options="actorOptions"
          :checkedItem="localFilterCondition.actor"
          @change="onChangeActor"
        />
      </div>

      <div v-if="showStatus" class="condition">
        <label class="condition-label">ステータス別</label>
        <SelectBoxPanel
          class="condition-input"
          :options="statusOptions"
          :checkedItem="localFilterCondition.status"
          @change="onChangeStatus"
        />
      </div>

      <DeliveryTimeSelectBox
        class="condition"
        :openingTime="filterCondition.openingTime"
        :closingTime="filterCondition.closingTime"
        :initialUnit="localFilterCondition.deliveryTimeUnit"
        :checkedItem="localFilterCondition.deliveryTime"
        @change="onChangeDeliveryTime"
      >
        <template v-slot:condition-label>
          <label class="condition-label">お届け時間</label>
        </template>
      </DeliveryTimeSelectBox>
    </div>

    <div class="button-container">
      <Button size="sm" color="primary" @click="applyFilter">
        <span class="button-text">
          <Icon class="button-icon" name="arrow2" />
          絞り込み
        </span>
      </Button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ACTOR_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "@/enums";
import FilterCondition from "@/models/Filter/FilterCondition";
import { SelectBoxPanel } from "@/components/molecules/SelectBoxPanel";
import DeliveryTimeSelectBox from "@/components/molecules/DeliveryTimeSelectBox";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";

export default {
  name: "FilterSection",

  components: {
    SelectBoxPanel,
    DeliveryTimeSelectBox,
    Button,
    Icon,
  },

  props: {
    showActor: {
      type: Boolean,
      default: true,
    },
    showStatus: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      localFilterCondition: { ...this.$store.getters["uiStore/filterCondition"] },
    };
  },

  computed: {
    ...mapGetters("uiStore", ["filterCondition"]),
    ...mapGetters("authStore", ["loginShopType"]),
    /**
     * アクターの絞り込み用のOptionの値を返却する
     */
    actorOptions() {
      return ACTOR_FILTER_OPTIONS[this.loginShopType];
    },
    /**
     * ステータスの絞り込み用のOptionの値を返却する
     */
    statusOptions() {
      return STATUS_FILTER_OPTIONS;
    },
  },

  methods: {
    ...mapActions("uiStore", ["setFilterCondition"]),
    /**
     * 担当者を変更したとき、担当別の絞り込み条件をローカルステートに保存する
     */
    onChangeActor(actorOptions) {
      this.localFilterCondition = new FilterCondition({ ...this.localFilterCondition, actor: actorOptions });
    },
    /**
     * ステータスを変更したとき、担当別の絞り込み条件をローカルステートに保存する
     */
    onChangeStatus(statusOptions) {
      this.localFilterCondition = new FilterCondition({ ...this.localFilterCondition, status: statusOptions });
    },
    /**
     * お届け時間を変更したとき、お届け時間の絞り込み条件をローカルステートに保存する
     */
    onChangeDeliveryTime(deliveryTimeOptions, unit) {
      this.localFilterCondition = new FilterCondition({
        ...this.localFilterCondition,
        deliveryTime: deliveryTimeOptions,
        deliveryTimeUnit: unit,
      });
    },
    /**
     * 絞り込み条件を適用させるため、Vuexにセット
     */
    applyFilter() {
      this.setFilterCondition(this.localFilterCondition);
      // Note
      // 商品/アイテム一覧では、ボタン押下のタイミング絞り込みをAPI側で行うため、
      // 絞り込み条件を別途emitする
      this.$emit("applyFilter", this.localFilterCondition);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@import "@/assets/styles/mq.scss";

.filter-section {
  background: $black;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.8rem;

  @include mq-down() {
    display: block;
  }
}

.condition-container {
  display: flex;

  @include mq-down() {
    justify-content: center;
  }
}

.condition {
  display: flex;
  align-items: center;
  margin-right: 68px;

  @include mq-down() {
    margin-right: 30px;
  }

  &-label {
    font-weight: bold;
    color: $white;
    margin-right: 16px;
  }

  &-input-actor {
    width: 250px;
  }
}

.button-container {
  margin-right: 32px;

  @include mq-down() {
    text-align: center;
    margin: 30px 0 0 0;
  }
}

.button-text {
  font-weight: bold;
  padding: 0 19px;
}

.button-icon {
  width: 8px;
  height: 14px;
}
</style>
