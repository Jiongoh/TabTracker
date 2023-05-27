# TabTracker
标签收藏网站TabTracker：全栈项目，包含前后端。前端使用了一系列库和工具，包括 lodash、axios、core-js、Element UI、Vue Router、Vuex、vuex-persistedstate 和 vue-router-sync等。

[在线测试](http://123.249.18.208/Jiong/Vue/TabTracker/client/index.html)

## 网站主要功能描述
用户可以注册和登录账号，通过安全的身份验证机制进行访问。登录后，用户可以浏览标签列表，并进行标签的创建和收藏。只有登录用户才能享受标签收藏的功能。此外，项目还提供了一个主页，用于展示用户浏览过的标签的历史记录以及用户收藏的标签。

### 前端介绍
前端部分使用 Vue 2 构建用户界面，通过 Element UI 实现了现代化且美观的组件库。Vue Router 和 Vuex 被用于管理路由和状态，提供了良好的用户导航和全局状态管理。通过 axios 进行与后端的数据交互，同时使用 lodash 和 core-js 辅助处理数据和提供跨浏览器支持。vuex-persistedstate 用于在 Vuex 中持久化存储状态，确保用户刷新页面后仍能保留登录状态。vue-router-sync 用于在 Vuex 和 Vue Router 之间进行同步，确保状态和路由的一致性。

### 后端介绍
后端部分基于 Node.js 和 MySQL，使用了一系列库和工具来构建可靠和安全的服务器端。bcryptjs 用于密码的哈希和验证，body-parser 用于解析请求体，cors 用于处理跨域请求，jsonwebtoken 用于生成和验证身份认证的 JSON Web Tokens。express 是基本的 Web 应用程序框架，morgan 用于记录 HTTP 请求日志，mysql2 用于与 MySQL 数据库进行交互。
