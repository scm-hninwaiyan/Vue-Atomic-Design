<template>
  <div class="side-menu">
    <div class="logo">
      <template v-if="isKamatora">
        <img class="logo-img" src="@/assets/img/logo_kamatora_white.png" alt="kamatora" width="150" height="58" />
      </template>
      <template v-else>
        <img class="logo-img" src="@/assets/img/logo_ginsara_white.png" alt="ginsara" width="180" height="45" />
        <img class="logo-img" src="@/assets/img/logo_sushijoto_white.png" alt="sushijoto" width="150" height="81" />
      </template>
    </div>
    <div class="store">
      <p>{{ storeCode }}</p>
      <p>{{ storeName }}</p>
    </div>

    <div class="actor">
      <span>{{ actorName }}</span>
    </div>

    <div class="main-menu-container">
      <ul class="main-menu">
        <li>
          <router-link class="main-menu-item link" to="/slips">
            <Icon name="file" class="icon" />
            伝票別
          </router-link>
        </li>
        <li>
          <router-link class="main-menu-item link" to="/products">
            <Icon name="item" class="icon" />
            商品別
          </router-link>
        </li>
        <li v-if="!isKamatora">
          <router-link class="main-menu-item link" to="/items">
            <Icon name="itemlist" class="icon" />
            アイテム別
          </router-link>
        </li>
      </ul>
    </div>

    <div class="sub-menu-container">
      <ul class="sub-menu">
        <li>
          <router-link class="sub-menu-item link" to="/photos">
            <Icon name="photo" class="icon" />
            調理写真一覧
          </router-link>
        </li>
        <li>
          <router-link class="sub-menu-item link" to="/past_slips">
            <Icon name="past-file" class="icon" />
            過去伝票一覧
          </router-link>
        </li>
        <li>
          <!--FAQは一旦遷移なしにしておく -->
          <span class="sub-menu-item link" to="/usage">
            <Icon name="faq" class="icon" />
            FAQ
          </span>
        </li>
        <li>
          <router-link class="sub-menu-item link" to="/alert_setting">
            <Icon name="setting" class="icon" />
            設定
          </router-link>
        </li>
        <li class="sub-menu-item link" @click="openLogoutModal">
          <Icon name="logout" class="logout" />
          ログアウト
        </li>
        <!-- ログアウト用モーダル -->
        <LogoutModal v-if="isOpenLogoutModal" @close="closeLogoutModal" />
      </ul>
    </div>
  </div>
</template>

<script>
import { LOGIN_SHOP_TYPE } from "@/enums";
import Icon from "@/components/atoms/Icon";
import LogoutModal from "@/components/organisms/LogoutModal";

export default {
  name: "SideMenu",

  data() {
    return {
      isOpenLogoutModal: false,
    };
  },

  props: {
    loginShopType: {
      type: Number,
      required: true,
    },
    actorName: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    storeCode: {
      type: Number,
      required: true,
    },
  },

  components: {
    Icon,
    LogoutModal,
  },

  computed: {
    /**
     * 釜寅かどうかを判断する
     */
    isKamatora() {
      return this.loginShopType === LOGIN_SHOP_TYPE.KAMATORA;
    },
  },

  methods: {
    openLogoutModal() {
      this.isOpenLogoutModal = true;
    },

    closeLogoutModal() {
      this.isOpenLogoutModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@import "@/assets/styles/mq.scss";

.side-menu {
  color: $white;
  background: $black;
  min-width: 240px;
  text-align: center;

  @include mq-down() {
    min-width: 200px;
    width: 200px;
  }

  padding-top: 18px;
}

.logo {
  margin-bottom: 44px;

  &-img {
    margin: 0 auto;

    &:not(:first-of-type) {
      margin-top: 18px;
    }
  }
}

.store {
  font-size: 1.4rem;
  margin-bottom: 15px;
}

.actor {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 63px;
}

.main-menu-container {
  padding-left: 16px;
  padding-bottom: 56px;
  border-bottom: 1px solid $mineShaft;
}

.main-menu {
  font-weight: bold;
  font-size: 2.2rem;
  text-align: left;

  &-item {
    padding-left: 23px;
    padding-top: 29px;
    padding-bottom: 29px;
    border-radius: 8px 0 0 8px;
  }

  .icon {
    margin-right: 14px;
  }
}

.link {
  color: $white;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &--active {
    background: $concrete;
    color: $red;

    &/deep/ g {
      fill: $red;
    }

    &/deep/ path {
      fill: $red;
    }

    &/deep/ rect {
      fill: $red;
    }

    &/deep/ circle {
      fill: $red;
    }
  }
}

.sub-menu-container {
  margin-top: 47px;
  padding-left: 16px;
  padding-bottom: 75px;
}

.sub-menu {
  font-weight: bold;
  text-align: left;
  font-size: 1.6rem;

  &-item {
    padding-left: 23px;
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 8px 0 0 8px;
  }

  .icon {
    margin-right: 14px;
    width: 22px;
  }
}
</style>
