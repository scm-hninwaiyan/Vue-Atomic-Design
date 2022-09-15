<!--
  ログイン前のテンプレート
-->
<template>
  <div class="main">
    <div class="content">
      <slot name="content">
        <h1 class="title"></h1>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/color.scss";
@import "../../../assets/styles/mq.scss";

.main {

  .content {
    min-height: calc(100vh - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-weight: bold;

    .title {
      font-size: rem;
      text-align: center;
    }
  }
}

@include mq-down() {
  .main {
    .content {
      .title {
        font-size: 3rem;
      }
    }
  }
}
</style>
