# vue-manage:office::通用后台管理

## 安装依赖
```
yarn install
```

### 编译和启动服务
```
yarn serve
```

### 编译和打包
```
yarn build
```

### 检查
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目介绍

普通组件：置顶栏 echarts（折线图表 扇形表）					
echarts数据获取从vuex(模块化+命名空间)中获取(也可以通过props的方式获取）		
路由组件：主页,添加物品/店铺,管理员列表/设置,说明,管理,订单列表,信息发送,店铺列表,图片加载,用户列表,游客登录扇形表,富文本编辑器  	
功能包括:  登录/注册 （通过id判断用户重复登录）					
添加商铺	添加商品
数据展示	管理用户								
食品管理   权限验证
管理员设置 图表（echarts）
富文本编辑器（Vue-Quill-Editor）
