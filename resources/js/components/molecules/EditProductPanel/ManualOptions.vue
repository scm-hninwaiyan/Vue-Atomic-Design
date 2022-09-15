<template>
  <ul class="options">
    <li class="option" @click="onClick">
      <span class="link">
        あんちょこを開く
        <Icon name="window" class="link-icon" />
      </span>
    </li>
    <li class="option" v-if="movieUrl">
      <a class="link" :href="movieUrl" target="__blank" rel="noopener">
        研修動画サイトを開く
        <Icon name="window2" class="link-icon" />
      </a>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/atoms/Icon";

export default {
  name: "MenuOptions",

  components: {
    Icon,
  },

  props: {
    // あんちょこ/商品動画URL
    appendices: {
      type: Object,
      default: null,
    },
  },

  computed: {
    /**
     * 商品動画URLを返却する
     */
    movieUrl() {
      return this.appendices?.movieUrl;
    },
  },

  methods: {
    /**
     * あんちょこを開くを押下したとき
     */
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.options {
  color: $white;
  text-align: left;
  padding: 0 21px;

  .option {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:first-of-type {
      margin-top: 0px;
    }

    margin-top: 20px;
  }
}

.link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: $white;

  &-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
