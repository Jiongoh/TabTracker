<template>
  <div class="myheader">
    <router-link :to="{ name: 'MyHomePage' }" tag="span" class="title"
      >TabTracker</router-link
    >
    <span class="title"></span>
    <button
      v-if="!this.$store.state.isUserLoggedIn"
      class="btn"
      @click="navigateTo('/MyRegister')"
      ref="registerBtn"
    >
      SIGN UP
    </button>
    <button
      v-if="!this.$store.state.isUserLoggedIn"
      class="btn"
      @click="navigateTo('/MyLogin')"
      ref="loginBtn"
    >
      LOGIN
    </button>
    <button v-if="this.$store.state.isUserLoggedIn" class="btn" @click="logout">
      LOG OUT
    </button>
    <button class="btn-left" @click="navigateTo('/MyTab')" ref="browswBtn">
      BROWSE
    </button>
  </div>
</template>

<script>
export default {
  name: "MyHearder",
  data() {
    return {};
  },
  computed: {
    isRegisterActive() {
      return this.$route.path === "/MyRegister";
    },
    isLoginActive() {
      return this.$route.path === "/MyLogin";
    },
    isBrowseActive() {
      return this.$route.path === "/MyTab";
    },
  },
  watch: {
    isRegisterActive() {
      if (this.$refs.registerBtn) {
        this.isRegisterActive
          ? (this.$refs.registerBtn.style.borderBottom = "2px solid #fff")
          : (this.$refs.registerBtn.style.borderBottom = "none");
      }
    },
    isLoginActive() {
      if (this.$refs.loginBtn) {
        this.isLoginActive
          ? (this.$refs.loginBtn.style.borderBottom = "2px solid #fff")
          : (this.$refs.loginBtn.style.borderBottom = "none");
      }
    },
    isBrowseActive() {
      if (this.$refs.browswBtn) {
        this.isBrowseActive
          ? (this.$refs.browswBtn.style.borderBottom = "2px solid #fff")
          : (this.$refs.browswBtn.style.borderBottom = "none");
      }
    },
  },
  methods: {
    navigateTo(route) {
      if (this.$route.path == route) {
        return;
      }
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setBookMark", []);
      this.$router.push({ name: "MyHomePage", query: { refresh: true } });
    },
  },
};
</script>

<style scoped>
.myheader {
  background-color: #409eff;
  height: 60px;
  box-shadow: 1px 3px 5px #909399;
  padding-right: 10px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  position: fixed;
}
.title {
  float: left;
  color: #fff;
  line-height: 60px;
  font-size: 20px;
  padding-left: 20px;
  cursor: default;
}
.title:hover {
  color: #b3d8ff;
}
.btn {
  float: right;
  width: 80px;
  height: 100%;
  color: #ebeef5;
  background-color: transparent;
  border: none;
  font-size: 16px;
  transition: all 0.2s;
}
.btn:hover {
  background-color: #53a8ff;
  color: #fff;
  /* border-bottom: 2px solid #fff; */
}
.btn-left {
  margin-left: 15px;
  float: left;
  width: 80px;
  height: 100%;
  color: #ebeef5;
  background-color: transparent;
  border: none;
  font-size: 16px;
  transition: all 0.2s;
}
.btn-left:hover {
  background-color: #53a8ff;
  color: #fff;
}
</style>