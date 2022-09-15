<template>
  <portal :to="renderTo">
    <Modal @close="onClose">
      <div class="slip-modal">
        <MetaSection class="meta-section" :slip="slip" />
        <section class="product-section">
          <ProductSectionHeader
            :slip="slip"
            :systemDate="systemDate"
            :alertSetting="alertSetting"
            :storeName="storeName"
            :isNewSlip="isNewSlip"
          />
          <ProductTable
            class="product-table"
            :products="slip.products"
            :discounts="slip.discounts"
            :loginShopType="loginShopType"
          />
          <PhotoSection v-if="slip.photos.length > 0" class="photo-section" :photos="slip.photos" />
        </section>
      </div>
    </Modal>
  </portal>
</template>

<script>
import Modal from "@/components/molecules/Modal";
import MetaSection from "./MetaSection";
import ProductSectionHeader from "./ProductSectionHeader";
import ProductTable from "./ProductTable";
import PhotoSection from "./PhotoSection";

export default {
  name: "SlipModal",

  props: {
    // モーダルのマウント先
    renderTo: {
      type: String,
      default: "modal",
    },
    // 伝票
    slip: {
      type: Object,
      required: true,
    },
    // 店舗名
    storeName: {
      type: String,
      required: true,
    },
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
    // アラート時間判定用のシステム日付
    systemDate: {
      type: Date,
      default: null,
    },
    // アラート設定
    alertSetting: {
      type: Object,
      default: null,
    },
    // 新着伝票のモーダルの場合true
    isNewSlip: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Modal,
    MetaSection,
    ProductSectionHeader,
    ProductTable,
    PhotoSection,
  },

  computed: {},

  methods: {
    /**
     * モーダルを閉じる
     */
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@import "@/assets/styles/mq.scss";

.slip-modal {
  max-width: 1648px;
  display: grid;
  grid-template-columns: 544px 1fr;
}

.product-section {
  padding-top: 40px;
  padding-left: 48px;
  padding-right: 13px;
  font-size: 1.6rem;

  .product-table {
    margin-top: 43px;
  }
}

.photo-section {
  margin-top: 47px;
}

@include mq-down() {
  .slip-modal {
    grid-template-columns: 1fr;
  }

  .product-section {
    order: 1;
  }

  .meta-section {
    order: 2;
  }
}
</style>
