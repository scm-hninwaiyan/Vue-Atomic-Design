<template>
  <span class="actor" :class="classes" @click="onClick">
    {{ actor.label }}
  </span>
</template>

<script>
export default {
  name: "Actor",

  props: {
    actor: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return { "actor--active": this.active };
    },
  },

  methods: {
    onClick() {
      this.$emit("click", this.actor);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@import "@/assets/styles/mq.scss";

.actor {
  display: inline-block;
  margin-right: 15px;
  padding: 6px 17px;

  &--active {
    border-radius: 30px;
    border: 2px solid $codGray;
  }

  @include mq-down() {
    padding: 6px 8px;
  }
}
</style>
