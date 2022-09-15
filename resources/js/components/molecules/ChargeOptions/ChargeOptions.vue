<template>
  <ul class="options">
    <Option
      v-for="option in options"
      class="option"
      :key="option.value"
      :value="option.value"
      :active="isActorActive(option.value)"
      @click="onSelect"
    >
      {{ option.label }}
    </Option>
    <Button class="button" color="primary" type="button" :disabled="!dirty" @click="onUpdate">
      <Icon name="arrow2" class="button-icon" />
      登録
    </Button>
  </ul>
</template>

<script>
import { ACTOR_NAME_SHORT, ACTOR_OPTIONS } from "@/enums";
import { toggle, isEqual } from "@/utils";
import Icon from "@/components/atoms/Icon";
import Option from "@/components/atoms/Option";
import Button from "@/components/atoms/Button";

export default {
  name: "Options",

  components: {
    Icon,
    Option,
    Button,
  },

  props: {
    // ログインしている店舗タイプ
    loginShopType: {
      type: Number,
      required: true,
    },
    // 選択済の担当者
    initialActors: {
      type: Array,
      default: () => [],
    },
  },

  created() {
    this.actors = [...this.initialActors];
  },

  data() {
    return {
      actors: [],
    };
  },

  computed: {
    /**
     * 初期状態のステータスから変更がある場合、true
     */
    dirty() {
      return !isEqual(this.actors, this.initialActors);
    },
    /**
     *  アクターの選択肢を返却する
     */
    options() {
      return ACTOR_OPTIONS[this.loginShopType].map(option => ({
        ...option,
        label: ACTOR_NAME_SHORT[this.loginShopType][option.value],
      }));
    },
  },

  methods: {
    /**
     * 引数のアクターが、伝票のアクター内に存在するかを判断する
     */
    isActorActive(listActor) {
      return this.actors.includes(listActor);
    },
    /**
     * アクターを選択したとき
     */
    onSelect(value) {
      const updated = toggle(this.actors, value);
      //ひとつ以上の選択が必須
      if (updated.length === 0) return;

      this.actors = updated;
    },
    /**
     * 登録ボタンを押下したとき
     */
    onUpdate() {
      this.$emit("update", this.actors);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";

.options {
  padding: 0;
  color: $white;
  text-align: center;

  .option {
    &:first-of-type {
      margin-top: 16px;
    }

    margin-top: 20px;
  }

  .button {
    margin: 26px auto 10px auto;
    width: 80px;
    height: 30px;

    &-icon {
      margin-right: 8px;
      width: 6px;
    }
  }
}
</style>
