<template>
  <section class="info-section">
    <!--担当者 -->
    <ul class="row">
      <li
        class="actor"
        v-for="actor in actorNames"
        :key="actor.key"
        :class="{ 'actor--active': isActorActive(actor.key) }"
      >
        {{ actor.label }}
      </li>
      <li class="edit-charge-col">
        <!--Note see src/components/molecules/Slip/ProductRow.vue -->
        <v-popover offset="4" trigger="manual" :disabled="readOnly" :open="isShowEditChargePanel" @hide="onHide">
          <Icon class="charge" name="charge" @click="toggleEditChargePanel" />
          <template slot="popover">
            <EditChargePanel
              v-if="isShowEditChargePanel"
              :initialActors="slip.actors"
              :loginShopType="loginShopType"
              @update="onUpdateCharge"
            />
          </template>
        </v-popover>
      </li>
    </ul>
    <!--伝票番号/品代合計/配達先エリア/配達担当者 -->
    <div class="row">
      <p class="slip-id">No.{{ slip.slipId }}</p>
      <p class="price">{{ price }}</p>
      <p class="map">{{ slip.areaCode }}</p>
    </div>
    <!--付帯情報-->
    <div class="row row-meta">
      <span v-if="slip.makeRemark" class="meta">メイク情報</span>
      <span v-if="slip.orderMemo" class="meta">伝票メモ</span>
      <span v-if="slip.equipments.length > 0" class="meta">付帯情報</span>
      <span v-if="slip.claimRemark" class="meta">お客様情報</span>
    </div>
  </section>
</template>

<script>
import { formatPrice } from "@/utils";
import { ACTOR_NAME_SHORT } from "@/enums/actor";
import Icon from "@/components/atoms/Icon";
import EditChargePanel from "@/components/molecules/EditChargePanel";

export default {
  name: "InfoSection",

  props: {
    // 伝票
    slip: {
      type: Object,
      required: true,
    },
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
    // 参照のみする場合true
    readOnly: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    EditChargePanel,
    Icon,
  },

  data() {
    return {
      isShowEditChargePanel: false,
    };
  },

  computed: {
    /**
     * アクター名の一覧を返却する
     */
    actorNames() {
      return Object.keys(ACTOR_NAME_SHORT[this.loginShopType]).map(key => ({
        key,
        label: ACTOR_NAME_SHORT[this.loginShopType][key],
      }));
    },
    /**
     * ¥+カンマ区切り月の金額を返却する
     */
    price() {
      return `¥${formatPrice(this.slip.totalPrice)}`;
    },
  },

  methods: {
    /**
     * tooltipの外を押下したとき
     */
    onHide() {
      this.isShowEditChargePanel = false;
    },
    /**
     * 商品編集パネルのUIの表示制御を行う
     */
    toggleEditChargePanel() {
      this.isShowEditChargePanel = !this.isShowEditChargePanel;
    },
    /**
     * 引数のアクターが、伝票のアクター内に存在するかを判断する
     */
    isActorActive(listActor) {
      return this.slip.actors.includes(parseInt(listActor));
    },
    /**
     * 担当者変更パネルで登録ボタンを押下したとき
     */
    onUpdateCharge(payload) {
      // 更新後にパネルを閉じる
      const handleUpdate = isUpdating => {
        if (!isUpdating) {
          this.onHide();
        }
        payload.setUpdating(isUpdating);
      };

      this.$emit("updateCharge", { ...payload, setUpdating: handleUpdate });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
.info-section {
  padding: 11px 8px;
  background: $concrete;
  font-size: 1.2rem;

  .row {
    display: flex;

    &:not(&:first-of-type) {
      margin-top: 6px;
    }
  }

  .edit-charge-col {
    margin-left: auto;
  }
}

.actor {
  margin-right: 14px;
  font-weight: bold;
  opacity: 0.2;

  &--active {
    opacity: 1;
  }

  &:last-of-type {
    margin-right: 20px;
  }
}

.charge {
  cursor: pointer;
}

.slip-id {
  margin-right: 19px;
}

.price {
  margin-right: 10px;
}

.map {
  margin-right: 10px;
}

.delivery-man {
  font-weight: bold;
}

.delivery-icon {
  width: 11px;
}

.row-meta {
  // meta情報がない場合でも高さを揃えるため
  min-height: 22px;
}

.meta {
  font-weight: bold;
  padding: 2px 4px;
  background: $white;

  margin-right: 8px;

  &:last-of-type {
    margin-right: 0;
  }
}
</style>
