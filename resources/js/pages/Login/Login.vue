<template>
  <LoginTemplate>
    <template v-slot:content>
      <div class="wrap">
        <h1 class="title">Bulletin Board System</h1>
        <div class="alert alert-danger" v-if="message">
          {{ message }}
        </div>
        <form class="form-wrap" @submit.prevent="onSubmit">
          <div class="form-input">
            <li class="form-row">
              <label class="form-label" for="email">Email</label>
                <InputText
                  class="form-text"
                  id="email"
                  v-model="email"
                  placeholder="Enter Email Address"
                />
            </li>
            <li class="form-row">
              <label class="form-label" for="password">Password</label>
                <InputText
                  class="form-text"
                  id="password"
                  type="password"
                  v-model="password"
                  placeholder="Enter Password"
                  autocomplete
                />
            </li>
          </div>
          <Button type="submit" class="button--primary button">
            Login
          </Button>
        </form>
      </div>
    </template>
  </LoginTemplate>
</template>

<script>
import LoginTemplate from "../../components/templates/Login/Login.vue";
import Button from "../../components/atoms/Button/Button.vue";
import InputText from "../../components/atoms/InputText/InputText.vue";

export default {
  name: "Login",

  components: {
    LoginTemplate,
    Button,
    InputText,
  },

  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },

  methods: {
    onSubmit() {
      if (!this.email) {
        this.message = "Email required";
      }
      if (!this.password) {
        this.message = "Password required";
      }
      else {
        this.axios
          .post("api/v1/login", {
            email: this.email,
            password: this.password,
        })
        .then((response) => {
          if (response.data) {
            this.$store.commit("AUTH_USER", response.data.currentUser);
            this.$store.commit("LOGIN", true);
            localStorage.setItem("token", response.data.token);
            this.$router.push({ name: "postList" });
          } else {
            this.error = response.data.message
          }
        })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/color.scss";

.wrap {
  text-align: center;
}
.form-wrap {
  display: contents;
}
.form-input {
  margin: 93px 0px;
}
.form-row {
  &:first-of-type {
    margin-bottom: 48px;
  }

  &:last-of-type {
    margin-top: 20px;
  }
}
.form-label {
  display: inline-block;
  width: 110px;
  margin-right: 31.5px;
  text-align: initial;
  font-size: 1.6rem;
}
.form-text {
  font-size: 1.6rem;
  min-width: 480px;
  max-width: 480px;
  height: 64px;
  font-weight: normal;
}

.form-error-message {
  color: $red;
}

.button {
  font-size: 2.2rem;
  width: 352px;
  line-height: 72px;
  height: 72px;
  display: inline-block;
}
.button-icon {
  position: relative;
  right: 15px;
  width: 8px;
  height: 14px;
}
</style>
