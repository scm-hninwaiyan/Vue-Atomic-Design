<template>
  <section class="meta-section">
    <div class="table">
      <dl class="table-row">
        <dt class="table-title">名前</dt>
        <dd class="table-value">{{ name }}</dd>
      </dl>
      <dl class="table-row">
        <dt class="table-title">住所</dt>
        <dd class="table-value">{{ slip.addressDetail }}</dd>
      </dl>
      <dl class="table-row">
        <dt class="table-title">建物名</dt>
        <dd class="table-value">{{ slip.buildingName }}</dd>
      </dl>
      <dl class="table-row">
        <dt class="table-title">部屋番号</dt>
        <dd class="table-value">{{ slip.roomNumber }}</dd>
      </dl>
      <dl class="table-row">
        <dt class="table-title">部署名</dt>
        <dd class="table-value">{{ slip.affiliation }}</dd>
      </dl>
      <dl class="table-row">
        <dt class="table-title">担当者名</dt>
        <dd class="table-value">{{ slip.tantouName }}</dd>
      </dl>
      <dl class="table-row">
        <dt class="table-title">電話</dt>
        <dd class="table-value tel">{{ slip.telNo }}</dd>
      </dl>
      <dl class="table-row">
        <dt class="table-title">注文回数</dt>
        <dd class="table-value order-count">{{ slip.orderCount }}</dd>
      </dl>
    </div>
    <div class="meta-area">
      <dl class="meta-area-row">
        <dt class="meta-area-title">付属情報</dt>
        <dd class="meta-area-value">
          {{ slip.accompanyItems }}
        </dd>
      </dl>
      <dl class="meta-area-row">
        <dt class="meta-area-title">お客様情報</dt>
        <dd class="meta-area-value">{{ slip.claimRemark }}</dd>
      </dl>
      <dl class="meta-area-row">
        <dt class="meta-area-title">メイク情報</dt>
        <dd class="meta-area-value">{{ slip.makeRemark }}</dd>
      </dl>
      <dl class="meta-area-row">
        <dt class="meta-area-title">伝票メモ</dt>
        <dd class="meta-area-value">{{ slip.orderMemo }}</dd>
      </dl>
      <dl class="meta-area-row">
        <dt class="meta-area-title">テイクアウト番号</dt>
        <dd class="meta-area-value">{{ takeoutNoText }}</dd>
      </dl>
      <dl class="meta-area-row">
        <dt class="meta-area-title">修正前伝票</dt>
        <dd class="meta-area-value">{{ slip.srcSlipText }}</dd>
      </dl>
      <div class="date-row">
        <p>{{ acceptDateString }}受付 受注：{{ slip.staffName }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { formatStringDate } from "@/utils";

export default {
  name: "MetaSection",

  props: {
    slip: {
      type: Object,
      required: true,
    },
  },

  computed: {
    /**
     * 名前を返却する
     */
    name() {
      return `${this.slip.familyName} ${this.slip.firstName}`;
    },
    /**
     * テイクアウト番号の文言を返却する
     */
    takeoutNoText() {
      return this.slip.takeoutNo ? `[ﾃｲｸｱｳﾄ ${this.slip.takeoutNo}]` : "";
    },
    /**
     * 修正前伝票の文言を返却する
     */
    srcSlipText() {
      return this.slip.srcSlipId ? `[【修正】伝票番号${this.slip.srcSlipId}]` : "";
    },
    /**
     * 受注日時を返却する
     * 2020/08/13(木)09:28:42
     */
    acceptDateString() {
      return formatStringDate(this.slip.acceptDatetime, "yyyyMMddHHmmss", "yyyy/MM/dd/(EEEEE)HH:mm:ss");
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.meta-section {
  padding: 48px;
  font-size: 1.4rem;
  background: $concrete;
}

.table {
  &-row {
    display: grid;
    grid-template-columns: 76px 1fr;
    align-items: center;
    font-weight: bold;

    margin-bottom: 1px;
  }

  &-title {
    padding: 20px 0 20px 10px;
    background: $mercury;
  }

  &-value {
    padding-left: 11px;
  }

  .tel,
  .order-count {
    font-weight: normal;
  }
}

.meta-area {
  margin-top: 32px;
  font-weight: bold;

  &-row {
    &:not(:first-of-type) {
      margin-top: 20px;
    }
  }

  .date-row {
    margin-top: 20px;
  }
}
</style>
