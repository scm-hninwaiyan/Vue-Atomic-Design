<!-- 
伝票一覧画面の伝票内の商品一覧
-->
<template>
  <div class="product-table" :class="slipStyle">
    <div class="product-table-header">
      <div class="name">商品名</div>
      <div>容器</div>
      <div>ｼｬﾘ</div>
      <div>ﾜｻﾋﾞ</div>
      <div>数量</div>
    </div>

    <div class="product-table-rows">
      <Hooper>
        <Slide v-for="(page, index) in pagenate" :key="index">
          <ProductRow
            class=""
            v-for="(product, index) in page"
            :key="index"
            :product="product"
            :readOnly="readOnly"
            :loginShopType="loginShopType"
            @update="onUpdateProduct"
            @openCrib="onOpenCrib(product)"
          />
        </Slide>
        <HooperPagination slot="hooper-addons" />
      </Hooper>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
import "hooper/dist/hooper.css";
import { STATUS_CODE } from "@/enums";
import ProductRow from "./ProductRow";

export default {
  name: "ProductTable",

  props: {
    // 伝票ステータス
    slipStatus: {
      type: Number,
      required: true,
    },
    // 商品リスト
    products: {
      type: Array,
      required: true,
    },
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
    // 参照のみする場合
    readOnly: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Hooper,
    Slide,
    HooperPagination,
    ProductRow,
  },

  computed: {
    /**
     * 伝票のスタイルを返却する
     */
    slipStyle() {
      return { "slip--fin": this.slipStatus === STATUS_CODE.DONE };
    },
    /**
     * スライド表示用に伝票内の商品を規定数で分割する
     */
    pagenate() {
      // 最大スライド数
      const MAX_PAGE = 7;
      // 1スライドに表示する商品の数
      const MAX_PRODUCT = 6;
      // ページ数
      const totalPage = Math.ceil(this.products.length / MAX_PRODUCT);
      // 各ページに商品を格納するための配列
      const pages = [...new Array(totalPage)].map(() => []);

      const products = this.products.reduce((acc, cur, index) => {
        const pageIndex = Math.floor(index / MAX_PRODUCT);
        acc[pageIndex].push(cur);
        return acc;
      }, pages);

      return products.length >= MAX_PAGE ? products.slice(0, MAX_PAGE) : products;
    },
  },

  methods: {
    /**
     * 商品の更新をしたとき
     */
    onUpdateProduct(payload) {
      this.$emit("update", payload);
    },
    /**
     * マニュアルパネルであんちょこを押下したとき
     */
    onOpenCrib(product) {
      this.$emit("openCrib", product);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.product-table {
  font-size: 1.2rem;
  font-weight: bold;

  &-header {
    display: grid;
    grid-template-columns: 1fr 25px 25px 25px 25px 20px;
    text-align: center;
    padding-bottom: 6px;
    border-bottom: 1px solid $silver;
    font-size: 1rem;
  }
}

.name {
  text-align: left;
}
</style>

<style lang="scss">
@import "@/assets/styles/color.scss";
// hooper用スタイル
.hooper {
  height: auto;

  &:focus {
    outline: none;
  }

  &-track {
    min-height: 236px;
  }

  &-pagination {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0;
    padding-left: 10px;
  }

  &-indicator {
    width: 24px;
    height: 6px;
    border-radius: 3px;
    background: $alto;
    margin-right: 16px;

    &.is-active {
      background: $red;
    }

    .slip--fin &.is-active {
      background: $dustyGray;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
