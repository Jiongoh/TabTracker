# TabTracker
一个基于Vue2和Express的全栈项目

[Link description](http://123.249.18.208/Jiong/Vue/TabTracker/client/index.html)

前端使用了Vue Router进行路由跳转，同时使用Vuex和vuex-router-sync将路由信息存储在全局状态中。使用vuex-persistedstate插件将Vuex数据存储在localstorage中。Axios用于在前端发送请求，同时使用Lodash工具库进行数据处理。Element UI组件库用于快速搭建页面。

后端使用了Express框架，使用bcryptjs对用户数据进行加密和解密，使用Cors解决跨域问题。jsonwebtoken用于生成和验证token，Morgan工具用于方便地查看和调试服务器信息。使用mysql2包连接远程数据库，并对许多功能进行了封装。

该项目实现了基本的用户注册、登录、退出登录，查看标签内容，搜索标签内容，创建标签以及编辑和修改标签等功能。此外，还实现了历史浏览记录和用户登录后可以收藏标签的功能。

