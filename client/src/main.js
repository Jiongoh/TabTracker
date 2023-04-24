import Vue from 'vue'
import App from './App.vue'
// import VueRouter
import VueRouter from 'vue-router'
// import a router
import router from './router'
// import Elemnet-UI
import { Message, Notification, Menu, MenuItem, Submenu, Popover, Col, Row, Switch, Tooltip, Empty, Link, Table, TableColumn } from 'element-ui'
// import Vuex Configuration
import store from './store'
// import Vuex-Router-Sync
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

// use the VueRouter plugin
Vue.use(VueRouter)

// use Element-UI
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Popover);
Vue.use(Col);
Vue.use(Row);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Empty);
Vue.use(Link);
Vue.use(Table);
Vue.use(TableColumn);

sync(store, router);

new Vue({
  render: h => h(App),
  router: router,
  store,
}).$mount('#app')
