<template>
  <div>
    <div class="bookmarktab">
      <h2>BookMark Tab</h2>
      <div class="container">
        <div
          class="content"
          v-if="
            this.$store.state.isUserLoggedIn ||
            this.$store.state.bookMarkList.length !== 0
          "
        >
          <el-table :data="bookMarkGame" stripe style="width: 100%">
            <el-table-column prop="bookMarkAt" label="Bookmark At" width="250">
            </el-table-column>
            <el-table-column prop="CreateAt" label="Created At" width="250">
            </el-table-column>
            <el-table-column prop="UpdateAt" label="Updated At" width="250">
            </el-table-column>
            <el-table-column prop="name" label="Tab Name" width="250">
            </el-table-column>
            <el-table-column prop="address" label="Operation">
              <template slot-scope="scope">
                <button
                  class="btn"
                  @click="
                    navigateTo({
                      name: 'ViewTab',
                      params: { tabId: scope.row.id },
                    })
                  "
                >
                  VIEW
                </button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- empty mode -->
        <div v-else>
          <el-empty description="Nothing Defined">
            <router-link :to="{ name: 'MyLogin' }" tag="button" class="btn"
              >Go To Login</router-link
            >
          </el-empty>
        </div>
      </div>
    </div>
    <div class="history">
      <h2>History Tab</h2>
      <div class="content" v-if="this.$store.state.historyList.length !== 0">
        <el-table :data="historyTab" stripe style="width: 100%">
          <el-table-column
            prop="LastReadingTime"
            label="Last Reading Time"
            width="250"
          >
          </el-table-column>
          <el-table-column prop="CreateAt" label="Created At" width="250">
          </el-table-column>
          <el-table-column prop="name" label="Tab Name" width="250">
          </el-table-column>
          <el-table-column label="Operation">
            <template slot-scope="scope">
              <button
                class="btn"
                @click="
                  navigateTo({
                    name: 'ViewTab',
                    params: { tabId: scope.row.tabId },
                  })
                "
              >
                VIEW
              </button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-empty description="Nothing Defined"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyHomePage",
  data() {
    return {
      bookMarkGame: [],
      historyTab: [],
    };
  },
  mounted() {
    if (this.$store.state.historyList.length) {
      this.fetchHistoryTab();
    }
    if (this.$store.state.isUserLoggedIn) {
      this.getBookMarkList();
      return;
    } else {
      this.$message({
        message: "Go log in first, then check bookmark tabs",
        type: "warning",
      });
    }
  },
  methods: {
    async getBookMarkList() {
      if (this.$store.state.isUserLoggedIn) {
        const requestData = {
          userId: this.$store.state.user.id,
          token: this.$store.state.token,
        };
        try {
          const response = await axios.post(
            "http://localhost:8081/getbookmark",
            requestData
          );
          if ("error" in response.data) {
            this.$message.error(response.data.error);
          } else if ("message" in response.data) {
            this.$message(response.data);
          } else {
            this.$store.dispatch("setBookMark", response.data);
            this.fetchBookMark();
          }
        } catch (err) {
          this.$message.error(err);
        }
      }
    },
    async fetchBookMark() {
      if (this.$store.state.isUserLoggedIn) {
        const params = this.$store.state.bookMarkList.map((item) => item.tabId);
        const data = {
          tabId: params,
          token: this.$store.state.token,
        };
        try {
          const res = await axios.post(
            "http://localhost:8081/homepageget",
            data
          );
          if ("error" in res.data) {
            this.$message.error(res.data.error);
          } else if ("message" in res.data) {
            this.$message(res.data);
          } else {
            this.bookMarkGame.push(
              ...this.FilterBookMarkList(
                res.data,
                this.$store.state.bookMarkList
              )
            );
          }
        } catch (err) {
          this.$message.error(err);
        }
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    FilterBookMarkList(arr1, arr2) {
      return arr1.map((item, index) => {
        const { CreateAt, UpdateAt, id, name } = item;
        const { bookMarkAt, bookmarkId } = arr2[index];
        return { CreateAt, UpdateAt, id, name, bookMarkAt, bookmarkId };
      });
    },
    async fetchHistoryTab() {
      if (this.$store.state.historyList.length) {
        const params = this.$store.state.historyList.map((item) => item.tabId);
        const data = {
          tabId: params,
        };
        try {
          const response = await axios.post(
            "http://localhost:8081/history",
            data
          );
          if ("error" in response.data) {
            this.$message.error(response.data.error);
          } else {
            this.historyTab.push(
              ...this.filterHistoryTab(
                response.data,
                this.$store.state.historyList
              )
            );
          }
        } catch (err) {
          this.$message.error(err);
        }
      }
    },
    filterHistoryTab(arr1, arr2) {
      return arr1.map((item, index) => {
        const { name, CreateAt } = item;
        const { tabId, LastReadingTime } = arr2[index];
        return { name, CreateAt, tabId, LastReadingTime };
      });
    },
  },
  created() {
    this.$router.beforeEach((to, _, next) => {
      if (to.query.refresh) {
        window.location.reload();
      }
      next();
    });
  },
};
</script>

<style scoped>
.bookmarktab {
  margin: 15px;
  border: 1px solid #409eff;
  border-radius: 4px;
  box-shadow: 1px 3px 5px #909399;
  margin-top: 90px;
}
.history {
  margin: 15px;
  border: 1px solid #409eff;
  border-radius: 4px;
  box-shadow: 1px 3px 5px #909399;
}
.bookmarktab h2 {
  background-color: #409eff;
  margin-top: 0;
  margin-bottom: 0;
  height: 50px;
  color: #fff;
  line-height: 52px;
  cursor: default;
  padding-left: 20px;
  text-shadow: 1px 1px 1px #f2f6fc;
  box-shadow: 1px 1px 3px #909399;
}
.history h2 {
  background-color: #409eff;
  margin-top: 0;
  margin-bottom: 0;
  height: 50px;
  color: #fff;
  line-height: 52px;
  cursor: default;
  padding-left: 20px;
  text-shadow: 1px 1px 1px #f2f6fc;
  box-shadow: 1px 1px 3px #909399;
}
.btn {
  width: 100px;
  height: 30px;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 1px 1px 5px #909399;
  text-shadow: 1px 1px 1px #f2f6fc;
  margin: 5px;
}
</style>