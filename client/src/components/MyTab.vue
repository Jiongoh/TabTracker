<template>
  <div class="mytab">
    <div class="tab">
      <search-bar title="Search">
        <div class="input">
          <i class="el-icon-search"></i>
          <input
            type="text"
            class="searchbar"
            placeholder="Enter keyword search"
            v-model="search"
          />
        </div>
      </search-bar>
    </div>
    <div class="tab" v-if="tabs.length">
      <my-panel title="Game">
        <div class="wrap" v-if="result.length > 0">
          <el-row>
            <el-col :span="24"
              ><div
                class="grid-content bg-purple-dark"
                v-for="item in result"
                :key="item.id"
              >
                <strong>{{ item.name }}</strong>
                <br />
                <img :src="item.image" width="400px" />
                <button
                  class="btn"
                  @click="
                    navigateTo({
                      name: 'ViewTab',
                      params: { tabId: item.id },
                    })
                  "
                >
                  VIEW
                </button>
              </div></el-col
            >
          </el-row>
        </div>
        <div class="warp" v-if="noResult">
          <div class="noresult">No results found</div>
        </div>
        <div class="wrap" v-if="!noResult && result.length <= 0">
          <el-row :gutter="20">
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <strong>{{ leftTab.name }}</strong>
                <br />
                <img :src="leftTab.image" width="400px" />
                <button
                  class="btn"
                  @click="
                    navigateTo({
                      name: 'ViewTab',
                      params: { tabId: leftTab.id },
                    })
                  "
                >
                  VIEW
                </button>
              </div></el-col
            >
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <strong>{{ rightTab.name }}</strong>
                <br />
                <img :src="rightTab.image" alt="" width="400px" />
                <button
                  class="btn"
                  @click="
                    navigateTo({
                      name: 'ViewTab',
                      params: { tabId: rightTab.id },
                    })
                  "
                >
                  VIEW
                </button>
              </div>
            </el-col>
          </el-row>
        </div>
        <button class="create" @click="navigateTo('/CreateGame')"><i class="el-icon-plus"></i></button>
      </my-panel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyPanel from "./MyPanel.vue";
import SearchBar from "./SearchBar.vue";
import _ from "lodash";
export default {
  components: { MyPanel, SearchBar },
  name: "MyTab",
  comments: {
    MyPanel,
  },
  data() {
    return {
      tabs: [],
      search: "",
      result: [],
      noResult: false,
    };
  },
  computed: {
    leftTab() {
      return this.tabs[0];
    },
    rightTab() {
      return this.tabs[1];
    },
    hasResult() {
      return this.result.length === 0;
    },
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:8081/getgame");
      this.tabs.push(...response.data);
    } catch (error) {
      this.$message.error(`${error}`);
    }
    this.$forceUpdate();
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
  watch: {
    search: _.debounce(async function () {
      const route = {
        name: "MyTab",
      };
      if (this.search !== "") {
        route.query = {
          search: this.search,
        };
      }
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(val) {
        this.search = val;
        if (!val) {
          this.result.splice(0, this.result.length);
          this.noResult = false;
        } else {
          try {
            const response = await axios.get(
              `http://localhost:8081/MyTab?search=${val}`
            );
            const filterData = response.data.filter((data) => {
              return !this.result.some((item) => item.id === data.id);
            });
            this.result.push(...filterData);
            this.noResult = this.result.length === 0;
          } catch (error) {
            this.$message.error(`${error}`);
          }
        }
      },
    },
  },
};
</script>

<style scoped>
.mytab {
  margin-top: 80px;
}
.tab {
  margin: 15px;
  border: 1px solid #409eff;
  border-radius: 4px;
  box-shadow: 1px 3px 5px #909399;
}
.create {
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
.wrap {
  color: #606266;
}
.wrap strong {
  font-size: 30px;
}
.img {
  margin-right: 20px;
}
.btn {
  display: block;
  text-align: center;
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
  margin: 10px auto;
}
img {
  box-shadow: 3px 3px 5px #909399;
}
.searchbar {
  margin-top: 10px;
  width: 1300px;
  height: 50px;
  padding-left: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px #909399;
  font-size: 20px;
}
.searchbar:focus {
  border: 1px solid #409eff;
  outline: 0;
}
.tab .input {
  position: relative;
}
.el-icon-search {
  font-size: 35px;
  position: absolute;
  right: 50px;
  top: 20px;
  color: #c0c4cc;
}
.noresult {
  color: #909399;
  font-size: 20px;
}
</style>
