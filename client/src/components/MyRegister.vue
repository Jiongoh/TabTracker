<template>
  <div class="register">
    <h2>Register Now</h2>
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
        @focus="getFocus"
        @blur="getBlur"
      />
    </div>
    <button @click="register" ref="btn">REGISER</button>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  name: "MyRegister",
  data() {
    return {
      email: "",
      password: "",
      infoShow: {},
    };
  },
  methods: {
    // register request
    async register() {
      if (this.$refs.btn.style.cursor == "not-allowed") {
        return;
      }
      const flag = this.registerRegular();
      if (flag) {
        try {
          // Modify pointer style
          this.$refs.btn.style.backgroundColor = "#C0C4CC";
          this.$refs.btn.style.cursor = "not-allowed";
          const email = this.email;
          const password = this.password;
          const response = await axios.post("http://localhost:8081/register", {
            email,
            password,
          });
          if ("error" in response.data) {
            this.$message.error(response.data.error);
          } else {
            this.$message.success("Register success,now you can login");
            this.$router.push("/MyLogin");
          }
        } catch (error) {
          this.$message.error(`${error.response.data}`);
        }
        this.$refs.btn.style.backgroundColor = "#409eff";
        this.$refs.btn.style.cursor = "pointer";
      }
    },
    // Check if the email password meets the regulations,The return value is of Boolean type
    registerRegular() {
      if (this.email == "" || this.password == "") {
        Message({
          showClose: true,
          message:
            "You need to enter your email and password before registering",
          type: "warning",
        });
        return false;
      } else {
        let str1 = this.email.match(
          /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/
        );
        if (str1 == null) {
          Message({
            showClose: true,
            message: "Please enter the correct email address",
            type: "error",
          });
          return false;
        }
        let str2 = this.password.match(/^[a-zA-Z0-9]{8,32}$/);
        if (str2 == null) {
          Message({
            showClose: true,
            message: "Please enter the correct password format",
            type: "error",
          });
          return false;
        }
      }
      return true;
    },
    // Get Focus Popup Prompt Box
    getFocus() {
      this.infoShow = this.$notify({
        title: "Prompt",
        dangerouslyUseHTMLString: true,
        message: `The password must match the following rules:
        <br>
        1. It must contain ONLY the following charactors: lower case, upper case, numerics.
        <br>
        2. It must be at least 8 charactors in length and not greater than 32 charactors in length.
        `,
        type: "info",
        duration: "0",
      });
    },
    // Loss of Focus Close Prompt Box
    getBlur() {
      if (this.infoShow) {
        this.infoShow.close();
      }
    },
  },
  mounted() {
    this.$el
      .querySelector('input[type="password"]')
      .addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
          this.register();
        }
      });
  },
};
</script>

<style scoped>
.register {
  border-radius: 4px;
  border: 1px solid #409eff;
  width: 450px;
  height: 200px;
  margin-left: 480px;
  margin-top: 260px;
  box-shadow: 1px 3px 5px #909399;
}
.register h2 {
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
.register input {
  width: 200px;
  height: 25px;
  padding-left: 7px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px #909399;
  margin-left: 120px;
}
.register input:focus {
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
.register button {
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