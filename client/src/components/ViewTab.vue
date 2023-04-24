<template>
  <div class="view">
    <h2>{{ this.game.name }}</h2>
    <div class="switch" v-if="this.$store.state.isUserLoggedIn">
      <el-tooltip
        class="item"
        effect="light"
        :content="this.bookmark ? 'UnBookMark' : 'BookMark'"
        placement="top-start"
      >
        <el-switch
          v-model="bookmark"
          active-color="#13ce66"
          inactive-color="#C0C4CC"
          :disabled="disable"
        >
        </el-switch>
      </el-tooltip>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="6" :offset="1"
          ><div class="grid-content bg-purple">
            <img :src="this.game.image" width="768px" height="434px" /></div
        ></el-col>
        <el-col :span="6" :offset="9"
          ><div class="grid-content bg-purple">
            <div
              class="company"
              v-if="this.game.developer == this.game.publisher"
            >
              <strong>{{ this.game.name }}</strong> was developed and
              distributed by
              <i>{{ this.game.developer }}</i>
            </div>
            <div
              class="company"
              v-if="this.game.developer != this.game.publisher"
            >
              <strong>{{ this.game.name }}</strong> was developed by
              <i>{{ this.game.developer }}</i> and released by
              <i>{{ this.game.publisher }}</i>
            </div>
            <div class="description">
              <strong>DESCRIPTION: <br /> </strong>{{ this.game.description }}
            </div>
            <div class="timestamp" v-if="!this.game.UpdateAt">
              This tab was created at <br />
              <i>{{ this.game.CreateAt }}</i>
            </div>
            <div class="timestamp" v-if="this.game.UpdateAt">
              This tab was updated at <br />
              <i>{{ this.game.UpdateAt }}</i>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
    <button
      class="btn"
      @click="
        navigateTo({
          name: 'EditTab',
          params: { tabId: game.id },
        })
      "
    >
      <i class="el-icon-edit"></i>
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ViewTab",
  data() {
    return {
      game: {},
      disable: false,
      isMounted: false,
      bookmark: null,
    };
  },
  computed: {},
  created() {},
  async mounted() {
    try {
      const tabId = this.$store.state.route.params.tabId;
      const response = await axios.get(`http://localhost:8081/MyTab/${tabId}`);
      const [game] = response.data;

      this.game = {
        id: tabId,
        name: game.name,
        developer: game.developer,
        publisher: game.publisher,
        CreateAt: game.CreateAt,
        UpdateAt: game.UpdateAt,
        image: game.image,
        description: game.description,
      };
      this.bookmark = this.switch;
    } catch (error) {
      this.$message.error(`${error}`);
    }
    this.isMounted = true;

    this.bookmark = this.$store.state.bookMarkList.some((item) => {
      return item.tabId === this.game.id;
    });
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async bookMarkTab() {
      if (this.disable) {
        return;
      }
      this.disable = true;
      const requestData = {
        tabId: this.game.id,
        userId: this.$store.state.user.id,
        token: this.$store.state.token,
      };
      try {
        const response = await axios.post(
          "http://localhost:8081/bookmarkgame",
          requestData
        );
        if ("error" in response.data) {
          this.$message.error(response.data.error);
        } else if ("success" in response.data) {
          this.$message({
            message: response.data.success,
            type: "success",
          });
          this.$store.dispatch("setBookMark", response.data.bookmark.id);
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.disable = false;
      }
      this.$forceUpdate();
    },
    async unBookMarkTab() {
      const bookmarkItem = this.$store.state.bookMarkList.find(
        (item) => item.tabId === this.game.id
      );
      if (!bookmarkItem) {
        return;
      }
      if (this.disable) {
        return;
      }
      this.disable = true;
      const requestData = {
        tabId: this.game.id,
        userId: this.$store.state.user.id,
        token: this.$store.state.token,
        bookmarkId: bookmarkItem.bookmarkId,
      };
      try {
        const response = await axios.post(
          "http://localhost:8081/unbookmarkgame",
          requestData
        );
        if ("error" in response.data) {
          this.$message.error(response.data.error);
        } else if ("success" in response.data) {
          const index = this.$store.state.bookMarkList.findIndex(
            (item) => item.bookmarkId === bookmarkItem.bookmarkId
          );
          this.$store.dispatch("deleteBookMark", index);
          this.$message({
            message: response.data.success,
            type: "success",
          });
        }
      } catch (err) {
        this.$message.error(err);
      } finally {
        this.disable = false;
      }
      this.$forceUpdate();
    },
  },
  watch: {
    bookmark(value, oldval) {
      if (oldval === null) {
        return;
      }
      if (value && this.isMounted) {
        this.bookMarkTab();
      } else if (!value && this.isMounted) {
        this.unBookMarkTab();
      }
    },
  },
};
</script>

<style scoped>
.view {
  margin: 15px;
  border: 1px solid #409eff;
  border-radius: 4px;
  box-shadow: 1px 3px 5px #909399;
  position: relative;
  margin-top: 80px;
}
.view h2 {
  background-color: #409eff;
  margin-top: 0;
  height: 50px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  cursor: default;
  text-shadow: 1px 1px 1px #f2f6fc;
  box-shadow: 1px 1px 3px #909399;
}
.switch {
  position: absolute;
  right: 30px;
  top: 15px;
}
img {
  box-shadow: 3px 3px 5px #909399;
}
.content {
  color: #79bbff;
  text-shadow: 1px 1px 1px #dcdfe6;
}
.content strong {
  font-size: 25px;
  color: #53a8ff;
}
.company {
  font-size: 20px;
}
.company i {
  font-size: 22px;
  font-weight: 600;
  color: #66b1ff;
}
.description {
  margin-top: 20px;
  font-size: 20px;
  color: #66b1ff;
}

.timestamp {
  margin-top: 20px;
  font-size: 18px;
  color: #53a8ff;
}
.timestamp i {
  font-size: 25px;
  color: #53a8ff;
}
.btn {
  margin-right: 7px;
  position: fixed;
  top: 50%;
  right: 0;
  background-color: #409eff;
  border-radius: 30px;
  color: #fff;
  width: 50px;
  height: 50px;
  border: none;
  box-shadow: 1px 1px 5px #909399;
  text-shadow: 1px 1px 1px #f2f6fc;
}
.el-icon-edit {
  font-size: 25px;
}
/* elementUI专用 */
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>