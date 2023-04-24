# TabTracker
一个基于Vue2和Express的全栈项目

前端使用了Vue Router进行路由跳转，同时使用Vuex和vuex-router-sync将路由信息存储在全局状态中。使用vuex-persistedstate插件将Vuex数据存储在localstorage中。Axios用于在前端发送请求，同时使用Lodash工具库进行数据处理。Element UI组件库用于快速搭建页面。

后端使用了Express框架，使用bcrypt进行密码加密和解密，使用Cors解决跨域问题。jsonwebtoken用于生成和验证token，Morgan工具用于方便地查看和调试服务器信息。使用mysql2包连接远程数据库，并对许多功能进行了封装。

该项目实现了基本的用户注册、登录、退出登录，查看标签内容，搜索标签内容，创建标签以及编辑和修改标签等功能。此外，还实现了历史浏览记录和用户登录后可以收藏标签的功能。


## 笔记
### 前端
#### 1. 提取数组内的对象的指定属性并生成一个新数组，可以用Array.map()实现
> 例如提取data中的id属性  
> ```
> data.map((item)=> item.id);
> ````

#### 2. 分别提取两个**内容不同但长度相同的数组**的指定对象，并将其拼接成一个对象，可以先使用map()方法遍历第一个数组，在回调函数内对第一个数组解构赋值提取属性，再提取第二个数组的属性，最后将这些属性组成一个新对象返回
> 例如提取array1的id和name属性,提取array2的content和date属性  
> ```
> filterList(array1, array2) {
>     return array1.map((item, index) => {
>     const { id, name } = item;  <br/>
>     const { content, date } = array2[index];
>     return { id, name, content, date };
>     });
> }
> ```
