<template>
  <portal to="modal">
    <Overlay @click="onClose">
      <div class="crib-modal">
        <Icon class="close-icon" name="close2" @click="onClose" />
        <div class="product-img" v-if="!isProductImageNotFound">
          <img :src="productImageURL" @error="onError" class="img" alt="product" width="480" height="354" />
        </div>
        <div class="product-img--404" v-else>
          <p>商品画像が存在しません</p>
        </div>
        <div v-if="cribImageUrl && !isCribImageNotFoundOrError" class="crib-img">
          <img :src="cribImageUrl" @error="onErrorCribImage" class="img" alt="crib" width="700" height="700" />
        </div>
        <div v-if="isCribImageNotFoundOrError" class="crib-img--404">
          <p>あんちょこ画像の取得に失敗しました</p>
        </div>
      </div>
    </Overlay>
  </portal>
</template>

<script>
import { SHOP_TYPE } from "@/enums";
import CribImageRepository from "@/repositories/rex-api/CribImageRepository";
import Overlay from "@/components/atoms/Overlay";
import Icon from "@/components/atoms/Icon";

/**
 * 店舗タイプに応じた商品画像のURLを返却する
 */
const resolveBaseUrl = shopType => {
  if (shopType === SHOP_TYPE.GINSARA) {
    return process.env.VUE_APP_GINSARA_PRODUCT_IMAGE_BASE_URL;
  }

  if (shopType === SHOP_TYPE.SUSHI_JOTO) {
    return process.env.VUE_APP_SUSHI_JOTO_PRODUCT_IMAGE_BASE_URL;
  }

  if (shopType === SHOP_TYPE.KAMATORA) {
    return process.env.VUE_APP_KAMATORA_PRODUCT_IMAGE_BASE_URL;
  }

  return "";
};

export default {
  name: "CribModal",

  props: {
    shopType: {
      type: Number,
      required: true,
    },
    syouhinCode: {
      type: Number,
      required: true,
    },
    appendices: {
      type: Object,
      default: null,
    },
  },

  components: {
    Overlay,
    Icon,
  },

  data() {
    return {
      isProductImageNotFound: false,
      isCribImageNotFoundOrError: false,
      cribImageUrl: "",
    };
  },

  async created() {
    if (this.hasProductCribImage) {
      try {
        const { publicUrl } = await CribImageRepository.get(this.appendices.anchocoImageUrl);
        this.cribImageUrl = publicUrl;
      } catch (error) {
        // Note
        // 一時URL取得に失敗した場合、urlに404となる文字列をつっこんでる
        this.cribImageUrl = "error";
      }
    }
  },

  computed: {
    /**
     * メニュー画像のURLを返却する
     * https://balconia.backlog.jp/view/REX_KDWEB-72
     * 対応してる画像のサイズは以下の通り
     * 240x177
     * 278x205
     * 286x211
     * 328x242
     * 342x252
     * 346x255
     * 364x269
     * 367x271
     * 380x280
     * 480x354
     * 596x440
     * 640x472
     * 692x511
     * 706x521
     * 734x542
     * 748x552
     * 750x554
     * 784x579
     * 828x611
     * 1496x1104
     **/
    productImageURL() {
      const baseURL = resolveBaseUrl(this.shopType);
      const productId = this.syouhinCode;
      return `${baseURL}/${productId}/480x354.jpg`;
    },
    /**
     * あんちょこ画像がある場合True
     */
    hasProductCribImage() {
      return !!this.appendices?.anchocoImageUrl;
    },
  },

  methods: {
    /**
     * モーダルを閉じる
     */
    onClose() {
      this.$emit("close");
    },
    /**
     * 商品画像が存在しない場合
     */
    onError() {
      this.isProductImageNotFound = true;
    },
    /**
     * あんちょこ画像一時URL取得処理に失敗 or あんちょこ画像一時参照用のURLが404
     */
    onErrorCribImage() {
      this.isCribImageNotFoundOrError = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
.crib-modal {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  .close-icon {
    position: absolute;
    top: 50px;
    right: 50px;

    width: 50px;
    height: 50px;
  }
}

.product-img {
  width: 48%;

  &--404 {
    width: 48%;
    background: white;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.crib-img {
  width: 48%;

  &--404 {
    width: 48%;
    background: white;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.img {
  margin: 0 auto;
  background-image: url("~@/assets/svg/ic_loading.svg?base64");
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
