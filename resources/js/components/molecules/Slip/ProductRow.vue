<template>
  <div class="product-row">
    <div>
      <Icon v-if="statusIcon" :name="statusIcon" />
    </div>
    <div class="name">{{ product.name }}</div>
    <div>
      <ContainerTypeIcon v-if="product.containerType" class="container-type" :value="product.containerType" />
    </div>
    <div>
      <RiceTypeIcon v-if="product.riceType" class="rice-type" :value="product.riceType" />
    </div>
    <div>
      <WasabiTypeIcon v-if="product.wasabiType" class="wasabi-type" :value="product.wasabiType" />
    </div>
    <div>{{ product.quantity }}</div>
    <div>
      <!--
        Note 
        ・z-index問題を回避するため、商品編集のUIをtooltip化する
        ・tooltipでラップするとデフォルトで、アイコン押下したときのパネル表示/パネル外クリックで非表示が利用できる
        https://github.com/Akryum/v-tooltip#component
        ・しかし、デフォルトの状態だとEditProductPanelがmountされっぱなしになるので、tooltip表示タイミングをmanualで制御する
      -->
      <v-popover offset="4" trigger="manual" :disabled="readOnly" :open="isShowEditProductPanel" @hide="onHide">
        <Icon class="link" name="link" @click="toggleEditProductPanel" />
        <template slot="popover">
          <EditProductPanel
            v-if="isShowEditProductPanel"
            :initialActors="product.actors"
            :initialStatus="product.status"
            :loginShopType="loginShopType"
            :appendices="product.appendices"
            @updateCharge="onUpdateCharge"
            @updateStatus="onUpdateStatus"
            @openCrib="onOpenCrib"
          />
        </template>
      </v-popover>
    </div>
  </div>
</template>

<script>
import { STATUS_ICON, STATUS_CODE } from "@/enums";
import Icon from "@/components/atoms/Icon";
import { RiceTypeIcon, ContainerTypeIcon, WasabiTypeIcon } from "@/components/atoms/Icon";
import EditProductPanel from "@/components/molecules/EditProductPanel";

export default {
  name: "ProductRow",

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
    // 参照のみする場合
    readOnly: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Icon,
    ContainerTypeIcon,
    RiceTypeIcon,
    WasabiTypeIcon,
    EditProductPanel,
  },

  data() {
    return {
      isShowEditProductPanel: false,
    };
  },

  computed: {
    /**
     * 調理ステータスのアイコン名を返却する
     */
    statusIcon() {
      return STATUS_ICON[this.product.status];
    },
  },

  methods: {
    /**
     * tooltipの外を押下したとき
     */
    onHide() {
      this.isShowEditProductPanel = false;
    },
    /**
     * 商品編集パネルのUIの表示制御を行う
     */
    toggleEditProductPanel() {
      this.isShowEditProductPanel = !this.isShowEditProductPanel;
    },
    /**
     *
     * 担当者変更の登録ボタンを押下したとき
     */
    onUpdateCharge(payload) {
      const newProduct = { ...this.product, actors: payload.actors };

      // 更新後にパネルを閉じる
      const handleUpdate = isUpdating => {
        if (!isUpdating) {
          this.onHide();
        }
        payload.setUpdating(isUpdating);
      };

      this.$emit("update", { newProduct, setUpdating: handleUpdate });
    },
    /**
     * ステータス変更をしたとき
     */
    onUpdateStatus(payload) {
      const newProduct = { ...this.product, status: payload.status };

      // 更新後にパネルを閉じる
      const handleUpdate = isUpdating => {
        if (!isUpdating) {
          this.onHide();
        }
        payload.setUpdating(isUpdating);
      };

      this.$emit("update", {
        newProduct,
        setUpdating: handleUpdate,
        // 調理完了にした場合true
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
.product-row {
  display: grid;
  align-items: center;
  grid-template-columns: 30px 1fr 25px 25px 25px 25px 20px;
  padding: 5px 0;
  text-align: center;
  border-bottom: 1px dashed $silver;
}

.name {
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.container-type {
  width: 21px;
}

.rice-type {
  width: 18px;
}

.wasabi-type {
  width: 18px;
}

.link {
  width: 2px;
  height: 10px;
  cursor: pointer;
}
</style>
