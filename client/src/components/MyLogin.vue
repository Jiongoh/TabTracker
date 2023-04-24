<template>
  <div class="login">
    <h2>Login Now</h2>
    <div class="input">
      <i class="el-icon-user"></i
      ><input type="text" placeholder="Enter your email" v-model="email" />
    </div>
    <div class="input">
      <i class="el-icon-lock"></i>
      <input
        type="password"
        placeholder="Enter your password"
        v-model="password"
      />
    </div>
    <button ref="btn" @click="login">LOGIN</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyLogin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (this.$refs.btn.style.cursor == "not-allowed") {
        return;
      }
      try {
        // Modify pointer style
        this.$refs.btn.style.backgroundColor = "#C0C4CC";
        this.$refs.btn.style.cursor = "not-allowed";
        const email = this.email;
        const password = this.password;
        const response = await axios.post("http://localhost:8081/login", {
          email,
          password,
        });
        if ("error" in response.data) {
          this.$message.error(response.data.error);
        } else {
          this.$message.success("Wellcome to TabTracker");
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setUser", response.data.user);
          this.$router.push("/MyHomePage");
        }
      } catch (error) {
        this.$message.error(`${error.response.data}`);
      }
      this.$refs.btn.style.backgroundColor = "#409eff";
      this.$refs.btn.style.cursor = "pointer";
    },
  },
  mounted() {
    this.$el
      .querySelector('input[type="password"]')
      .addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
          this.login();
        }
      });
  },
};
</script>

<style scoped>
.login {
  border-radius: 4px;
  border: 1px solid #409eff;
  width: 450px;
  height: 200px;
  margin-left: 480px;
  margin-top: 260px;
  box-shadow: 1px 3px 5px #909399;
}
.login h2 {
  background-color: #409eff;
  margin-top: 0;
  height: 50px;
  color: #fff;
  text-align: center;
  line-height: 45px;
  cursor: default;
  text-shadow: 1px 1px 1px #f2f6fc;
  box-shadow: 1px 1px 3px #909399;
}
.login input {
  width: 200px;
  height: 25px;
  padding-left: 7px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px #909399;
  margin-left: 120px;
}
.login input:focus {
  border: 1px solid #409eff;
  outline: 0;
}
.el-icon-user,
.el-icon-lock {
  position: absolute;
  font-size: 20px;
  color: #c0c4cc;
  line-height: 25px;
  font-weight: 500;
  left: 90px;
}
.login button {
  width: 100px;
  height: 30px;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 4px;
  margin-left: 170px;
  margin-top: 5px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 1px 1px 5px #909399;
  text-shadow: 1px 1px 1px #f2f6fc;
}
.input {
  position: relative;
}
</style>