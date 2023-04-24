<template>
  <div class="form">
    <h2>Edit The Tab</h2>
    <div class="input">
      <i class="el-icon-collection-tag"></i>
      <el-popover
        placement="top-start"
        title="Game Tag Name"
        width="200"
        content="Please enter the tag name of the game you want to create."
        trigger="focus"
      >
        <input slot="reference" type="text" v-model="input.name" ref="name"
      /></el-popover>
    </div>
    <br />
    <div class="input">
      <i class="el-icon-coordinate"></i>
      <el-popover
        placement="top-start"
        title="Developer"
        width="200"
        trigger="focus"
        content="Please enter the name of the game developer."
      >
        <input
          slot="reference"
          type="text"
          v-model="input.developer"
          ref="developper"
      /></el-popover>
    </div>
    <br />
    <div class="input">
      <i class="el-icon-sell"></i>
      <el-popover
        placement="top-start"
        title="Publisher"
        width="200"
        trigger="focus"
        content="Please enter the name of the game publisher."
      >
        <input
          slot="reference"
          type="text"
          v-model="input.publisher"
          ref="publisher"
      /></el-popover>
    </div>
    <br />
    <div class="input">
      <i class="el-icon-picture-outline"></i>
      <el-popover
        placement="top-start"
        title="Image Link"
        width="190"
        trigger="focus"
        content="Please enter the URL link for the game cover image."
      >
        <input slot="reference" type="text" v-model="input.image" ref="image"
      /></el-popover>
    </div>
    <br />
    <div class="inputarea">
      <i class="el-icon-more-outline"></i>
      <el-popover
        placement="top-start"
        title="Description"
        width="220"
        trigger="focus"
        content="Please enter the text description for the game."
      >
        <textarea
          slot="reference"
          cols="178"
          rows="10"
          v-model="input.description"
          ref="description"
        ></textarea>
      </el-popover>
    </div>
    <br />
    <button class="create" @click="save($event)">SAVE</button>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <button
      :class="{ create: hasContent, cancel: !hasContent }"
      @click="emptyInput($event)"
      ref="canclebtn"
    >
      CANCEL
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditTab",
  data() {
    return {
      input: {
        id: "",
        name: "",
        developer: "",
        publisher: "",
        image: "",
        description: "",
      },
    };
  },
  methods: {
    async save(e) {
      if (this.isEmpty()) {
        this.$message.error("Content cannot be empty");
        return;
      } else {
        try {
          e.target.style.backgroundColor = "#C0C4CC";
          e.target.style.cursor = "not-allowed";
          const id = this.input.id;
          const name = this.input.name;
          const developer = this.input.developer;
          const publisher = this.input.publisher;
          const image = this.input.image;
          const description = this.input.description;
          const response = await axios.put(
            `http://localhost:8081/MyTab/${id}/edit`,
            {
              id,
              name,
              developer,
              publisher,
              image,
              description,
            }
          );

          if ("error" in response.data) {
            this.$message.error(response.data.error);
          } else {
            this.$message.success("Update successfully");
            this.$router.push(`/MyTab/${id}`);
          }
        } catch (error) {
          this.$message.error(`${error.response.data}`);
        }
        e.target.style.backgroundColor = "#409eff";
        e.target.style.cursor = "pointer";
      }
    },
    isEmpty() {
      return this.input.name == "" ||
        this.input.developer == "" ||
        this.input.publisher == "" ||
        this.input.image == "" ||
        this.input.description == ""
        ? true
        : false;
    },
    emptyInput() {
      if (this.hasContent) {
        this.$set(this.input, "name", "");
        this.$set(this.input, "developer", "");
        this.$set(this.input, "publisher", "");
        this.$set(this.input, "image", "");
        this.$set(this.input, "description", "");
      }
    },
  },
  computed: {
    hasContent() {
      return (
        this.input.name != "" ||
        this.input.developer != "" ||
        this.input.publisher != "" ||
        this.input.image != "" ||
        this.input.description != ""
      );
    },
  },
  async mounted() {
    try {
      const tabId = this.$store.state.route.params.tabId;
      const response = await axios.get(`http://localhost:8081/MyTab/${tabId}`);
      const [game] = response.data;

      this.input.id = tabId;
      this.input.name = game.name;
      this.input.developer = game.developer;
      this.input.publisher = game.publisher;
      this.input.image = game.image;
      this.input.description = game.description;
    } catch (error) {
      this.$message.error(`${error}`);
    }
  },
};
</script>

<style scoped>
.form {
  margin: 15px;
  border: 1px solid #409eff;
  border-radius: 4px;
  box-shadow: 1px 3px 5px #909399;
  text-align: center;
  margin-top: 80px;
}
.form h2 {
  background-color: #409eff;
  margin-top: 0;
  height: 50px;
  color: #fff;
  line-height: 50px;
  cursor: default;
  padding-left: 10px;
  text-align: center;
  text-shadow: 1px 1px 1px #f2f6fc;
  box-shadow: 1px 1px 3px #909399;
}
.form input {
  width: 1300px;
  height: 30px;
  padding-left: 7px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px #909399;
}
.form input:focus {
  border: 1px solid #409eff;
  outline: 0;
}
.el-icon-collection-tag,
.el-icon-coordinate,
.el-icon-sell,
.el-icon-picture-outline,
.el-icon-more-outline {
  position: absolute;
  left: 12px;
  top: 3px;
  font-size: 25px;
  color: #c0c4cc;
  line-height: 25px;
  font-weight: 500;
}
.input,
.inputarea {
  position: relative;
}
.create {
  width: 100px;
  height: 30px;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 1px 1px 5px #909399;
  text-shadow: 1px 1px 1px #f2f6fc;
  margin-bottom: 15px;
}
.cancel {
  width: 100px;
  height: 30px;
  color: #fff;
  background-color: #c0c4cc;
  border: none;
  border-radius: 4px;
  cursor: not-allowed;
  transition: all 0.3s;
  box-shadow: 1px 1px 5px #909399;
  text-shadow: 1px 1px 1px #f2f6fc;
  margin-bottom: 15px;
}
.inputarea textarea {
  padding-top: 5px;
  padding-left: 7px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px #909399;
}
.inputarea textarea:focus {
  border: 1px solid #409eff;
  outline: 0;
}
</style>