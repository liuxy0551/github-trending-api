# github-trending-api

<p align="center">
  <a href="https://github.com/liuxy0551/github-trending-api#github-trending-api" target="blank"><img src="./static/logo.jpg" width="500" alt="Github Trending" /></a>
</p>

提供 GitHub Trending 的 api 接口，<a href="https://www.apifox.cn/apidoc/shared-3245f62c-0da3-46a0-a877-a2477e9ef88b/api-10436551" target="_black">接口文档</a>，响应数据示例如下：

``` json
{
  "code": 200,
  "data": {
    "list": [
      {
        "username": "imcuttle",
        "repositoryName": "mometa",
        "description": "🛠 [Beta] 面向研发的低代码元编程，代码可视编辑，辅助编码工具",
        "url": "https://github.com/imcuttle/mometa",
        "language": "TypeScript",
        "starCountStr": "1,154",
        "starCount": 1154,
        "forkCountStr": "159",
        "forkCount": 159,
        "todayStarStr": "161",
        "todayStar": 161,
        "time": "2022-03-12 23:38:23"
      }
    ],
    "total": 25,
    "current": 1,
    "pageSize": 5,
    "isCache": true
  },
  "message": "成功"
}
```


## 使用方法

```
yarn
yarn dev
```

在浏览器中打开 <a href="http://127.0.0.1:9003/repository/list" target="_black">http://127.0.0.1:9003/repository/list</a>


## 缓存规则

&emsp;&emsp;每半小时拉取一次数据，如果拉取失败，会重试，最多重试5次，每次成功会把结果更新到 Redis。
