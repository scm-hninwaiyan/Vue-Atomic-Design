<template>
  <div class="summary">
    <dl class="view-count" v-if="!isLoading">
      <dt>表示件数：</dt>
      <dd class="status-container">
        <dl class="status">
          <dt class="status-title">注文数</dt>
          <dd class="status-value">
            <Badge>{{ total }}</Badge>
          </dd>
        </dl>
        <dl class="status">
          <dt class="status-title">未調理</dt>
          <dd class="status-value">
            <Badge color="white">
              {{ todo }}
            </Badge>
          </dd>
        </dl>
        <dl class="status">
          <dt class="status-title">調理中</dt>
          <dd class="status-value">
            <!--調理中に中断の件数も含める -->
            <Badge color="blue">
              {{ cooking + stop }}
            </Badge>
          </dd>
        </dl>
        <dl class="status">
          <dt class="status-title">キャンセル</dt>
          <dd class="status-value">
            <Badge color="gray">
              {{ cancel }}
            </Badge>
          </dd>
        </dl>
        <dl class="status">
          <dt class="status-title">調理完了</dt>
          <dd class="status-value">
            <Badge color="gray">
              {{ done }}
            </Badge>
          </dd>
        </dl>
        <!--xlサイズの品代合計 -->
        <dl class="price-container lg-hidden">
          <dt class="price-title">品代総計：</dt>
          <dd class="price-value price">{{ totalPrice }}円</dd>
        </dl>
      </dd>
    </dl>
    <div class="lg-container">
      <!--lgサイズの品代合計 -->
      <dl class="price-container xl-hidden">
        <dt class="price-title">品代総計：</dt>
        <dd class="price-value price">{{ totalPrice }}円</dd>
      </dl>
      <div v-if="sortOrderOptions.length > 0">
        <div class="select-sort-order">
          <label class="order-label">並び替え</label>
          <SelectBoxPanel
            class="order-input"
            :options="sortOrderOptions"
            :checkedItem="currentSortCondition.order"
            @change="onChangeSortOrder"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { STATUS_CODE } from "@/enums";
import { formatPrice } from "@/utils";
import Badge from "@/components/atoms/Badge";
import { SelectBoxPanel } from "@/components/molecules/SelectBoxPanel";

export default {
  name: "CookingSummary",

  components: {
    SelectBoxPanel,
    Badge,
  },

  props: {
    // 並び替え順の選択肢
    sortOrderOptions: {
      type: Array,
      default: () => [],
    },
    // 現在のソート順
    currentSortCondition: {
      type: Object,
      requried: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters("cookingSummaryStore", ["summary"]),
    /**
     * トータルの注文数の件数を返却する
     */
    total() {
      // 注文変更によるキャンセルは、注文数に含めない
      return this.summary.total - this.summary[STATUS_CODE.CHANGED];
    },
    /**
     * 未調理の件数を返却する
     */
    todo() {
      return this.summary[STATUS_CODE.TODO];
    },
    /**
     * 未調理の件数を返却する
     */
    cooking() {
      return this.summary[STATUS_CODE.COOKING];
    },
    /**
     * 中断の件数を返却する
     */
    stop() {
      return this.summary[STATUS_CODE.STOP];
    },
    /**
     * キャンセルの件数を返却する
     */
    cancel() {
      return this.summary[STATUS_CODE.CANCEL];
    },
    /**
     * 調理完了の件数を返却する
     */
    done() {
      return this.summary[STATUS_CODE.DONE];
    },
    /**
     * 合計金額をカンマ付きで返却する
     */
    totalPrice() {
      return formatPrice(this.summary.totalPrice);
    },
  },

  methods: {
    ...mapActions("uiStore", ["setSortCondition"]),
    /**
     * 並び替え順を変更したときVuexに保存する
     */
    onChangeSortOrder(sortOption) {
      this.setSortCondition(sortOption);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@import "@/assets/styles/mq.scss";

.summary {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 1.8rem;
  color: $tundora;

  padding-bottom: 24px;
  border-bottom: 1px solid $silver;

  @include mq-down() {
    display: block;
  }

  .view-count {
    display: flex;
  }
}

.status-container {
  display: flex;

  .status {
    margin-right: 40px;
    display: flex;
    align-items: center;

    &-title {
      font-weight: bold;
      margin-right: 17px;
    }

    &-value {
      font-size: 1.8rem;
    }
  }
}

.price-container {
  display: flex;
  .price {
    &-title {
      margin-right: 17px;
    }

    &-value {
      font-size: 1.8rem;
    }
  }
}

.lg-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: auto;
}

.select-sort-order {
  display: flex;
  align-items: center;
  margin-right: 20px;

  .order-label {
    font-weight: bold;
    margin-right: 16px;
  }
}
</style>
