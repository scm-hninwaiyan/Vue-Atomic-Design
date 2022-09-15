<template>
  <div>
    <Actor
      class="actor"
      v-for="actor in actors"
      :key="actor.value"
      :actor="actor"
      :active="isActive(checkedActors, actor)"
      @click="onClick"
    />
  </div>
</template>

<script>
import { ACTOR_OPTIONS } from "@/enums";
import Actor from "@/components/atoms/Actor";

export default {
  name: "ActorsRow",

  props: {
    // 選択済みの担当者
    checkedActors: {
      type: Array,
      default: () => [],
    },
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
  },

  components: {
    Actor,
  },

  computed: {
    /**
     * アクターの一覧を返却する
     */
    actors() {
      return ACTOR_OPTIONS[this.loginShopType];
    },
  },

  methods: {
    isActive(checkedActors, actor) {
      return checkedActors.some(currentActor => currentActor === actor.value);
    },
    onClick(actor) {
      this.$emit("click", actor);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mq.scss";

.actor {
  margin-right: 15px;

  @include mq-down() {
    margin-right: 5px;
  }
}
</style>
