<template>
  <div class="seal">
    <section class="options">
      <ContainerTypeTag v-if="seal.containerType" :value="seal.containerType" />
      <RiceTypeTag v-if="seal.riceType" :value="seal.riceType" />
      <WasabiTypeTag v-if="seal.wasabiType" :value="seal.wasabiType" />
    </section>
    <section class="product">
      <p v-for="(product, index) in seal.products" :key="index">{{ genProductName(product) }}</p>
      <Swaps class="swaps" :swaps="seal.swaps" />
    </section>
    <section class="delivery">
      <span class="reserve-type-tag" :class="reserveTypeTagStyle">{{ reserveTypeText }}</span>
      <span class="delivery-date">{{ deliveryDate }}</span>
      <span class="delivery-time">{{ deliveryTime }}</span>
    </section>
    <section class="customer-info">
      <p>{{ seal.affiliation }}</p>
      <p>{{ name }}</p>
    </section>
    <section class="footer">
      <span class="slip-id">
        {{ last4digits }}
      </span>
      <span class="product-count">
        {{ seal.sealOrder }} /
        {{ seal.sealOrderMax }}
      </span>
    </section>
  </div>
</template>

<script>
import { formatStringDate } from "@/utils";
import ReserveType from "@/models/Slip/ReserveType";
import Swaps from "@/components/molecules/Swaps";
import { ContainerTypeTag, RiceTypeTag, WasabiTypeTag } from "@/components/atoms/Tag";

export default {
  name: "Seal",

  props: {
    seal: {
      type: Object,
      required: true,
    },
  },

  components: {
    Swaps,
    ContainerTypeTag,
    RiceTypeTag,
    WasabiTypeTag,
  },

  computed: {
    /**
     * 伝票IDの下4桁を返却する
     */
    last4digits() {
      return this.seal.slipId.substring(this.seal.slipId.length - 4);
    },
    /**
     * 予約種別のスタイルを返却する
     */
    reserveTypeTagStyle() {
      return { "reserve-type-tag--empty": this.reserveTypeText === "" };
    },
    /**
     * 予約種別に応じた文言を返却する
     */
    reserveTypeText() {
      return ReserveType.getShortText(this.seal.deliveryType, this.seal.isTakeout);
    },
    /**
     * お届け日時をM月d日の形式で返却する
     * eg) 1月1日
     */
    deliveryDate() {
      return formatStringDate(this.seal.deliveryDatetimeTo, "yyyyMMddHHmmss", "M月d日");
    },
    /**
     * お届け日時をHH:mmの形式で返却する
     * eg) 17:45
     */
    deliveryTime() {
      const from = this.seal.deliveryDatetimeFrom ? formatStringDate(this.seal.deliveryDatetimeFrom) : "";
      const to = formatStringDate(this.seal.deliveryDatetimeTo);
      return from ? `${from}~${to}` : to;
    },
    /**
     * お届け先氏名を返却する
     */
    name() {
      return `${this.seal.familyName}${this.seal.firstName} 様`;
    },
  },

  methods: {
    /**
     * 商品名を返却する
     */
    genProductName(product) {
      const { name, quantity } = product;
      // 通常商品の場合、1商品 = 1数量 = 1シールなので、数量表示は不要
      // お好み商品はグロスするため、数量を表示する
      return quantity > 1 ? `${name}×${quantity}` : name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

$indent: 5px;

.seal {
  background: $white;
}

.options {
  display: flex;
  justify-content: space-between;
}

.product {
  margin-top: 5px;
  padding-left: $indent;
  font-size: 1.2rem;
  font-weight: bold;

  .swaps {
    padding-left: $indent;
    font-size: 1rem;
  }
}

.delivery {
  margin-top: 10px;
  padding-left: $indent;
  display: flex;
  align-items: center;

  .reserve-type-tag {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: bold;
    background: $black;
    color: $white;
    padding: 2px 4px;
    width: 50px;
    text-align: center;

    &--empty {
      background: transparent;
    }
  }

  .delivery-date {
    font-size: 0.9rem;
    padding-left: 5px;
  }

  .delivery-time {
    font-size: 1.2rem;
    padding-left: 5px;
  }
}

.customer-info {
  margin-top: 5px;
  padding-left: $indent;
  font-size: 0.9rem;
  font-weight: bold;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .slip-id {
    font-size: 2.8rem;
    font-weight: bold;
  }
  .product-count {
    font-size: 1.1rem;
    font-weight: bold;
  }
}
</style>
