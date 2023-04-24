# TabTracker
Full Stack | 后端基于Node.js，Express和MySQL2，使用远程MySQL服务器作为服务器数据库端。前端基于Vue2，Vue Router和Vuex，使用了ElementUI搭建页面。


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
