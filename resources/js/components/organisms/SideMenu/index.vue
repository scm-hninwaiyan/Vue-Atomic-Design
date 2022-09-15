<template>
  <SideMenu :loginShopType="loginShopType" :actorName="actorName" :storeName="storeName" :storeCode="storeCode" />
</template>

<script>
import { mapGetters } from "vuex";
import SideMenu from "./SideMenu";

export default {
  name: "SideMenuIndex",

  components: {
    SideMenu,
  },

  computed: {
    ...mapGetters("authStore", ["loginShopType", "actorName", "storeName", "storeCode"]),
  },
};
</script>
