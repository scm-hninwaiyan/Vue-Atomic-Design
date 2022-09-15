<template>
  <section class="photo-section">
    <div class="header">
      <span>調理写真</span>
    </div>
    <ul class="photo-list">
      <li v-for="(photo, index) in photos" :key="index" class="photo-item">
        <a class="photo-link" :href="getUrl(photo)" target="__blank">{{ photo.name }}</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "PhotoSection",

  props: {
    photos: {
      type: Array,
      default: () => [],
    },
  },

  components: {},

  methods: {
    /**
     * 調理写真モーダルのURLを返却する
     */
    getUrl(photo) {
      return `/photo_modal?url=${photo.url}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.photo-section {
  .header {
    background: $doveGray;
    color: $white;
    font-weight: bold;
    padding: 10px 16px;
  }

  .photo-list {
    max-height: 243px;
    overflow-y: scroll;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 19px 8px 0;

    .photo-item {
      width: 48%;
      margin-bottom: 16px;
    }

    .photo-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      color: $codGray;
      box-shadow: 0 0 4px $clearDustyGray;
      border-radius: 8px;
      padding: 14px 16px;
    }
  }
}
</style>
