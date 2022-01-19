# github-trending-api

<p align="center">
  <a href="https://github.com/liuxy0551/github-trending-api#github-trending-api" target="blank"><img src="./static/logo.jpg" width="500" alt="Github Trending" /></a>
</p>

提供 GitHub Trending 的 api 接口，响应数据示例如下：

``` json
{
    "code": 200,
    "data": [
        {
            "username": "imcuttle",
            "repositoryName": "mometa",
            "description": "🛠 [Beta] 面向研发的低代码元编程，代码可视编辑，辅助编码工具",
            "url": "https://github.com/imcuttle/mometa",
            "language": "TypeScript",
            "starCountStr": "1,020",
            "starCount": 1020,
            "forkCountStr": "136",
            "forkCount": 136,
            "todayStarStr": "300",
            "todayStar": 300
        }
    ],
    "message": "成功"
}
```

## 使用方法

```
yarn
yarn dev
```

在浏览器中打开 http://127.0.0.1:9003/repository/list
