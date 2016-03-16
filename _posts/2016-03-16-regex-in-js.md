---
layout: post
title:  "正则表达式在js中的使用"
---

有这么一个任务，一个普通的异步请求，返回的是html，你只需要将html插入到#wrapp中就
行了。但是如果，html中包含样式（`<link>`、`<style>`）就复杂的多了。因为普通的插入
html，这些标签就不会被渲染。

要解决这个问题，必须获取里面的样式，将其添加的页面上。那么问题来了：

## 如何获取html字符传中的样式。

使用正则表达式。

1. 获取`<link>`标签。

![获取`<link>`标签](/assets/regex-in-js/1.png)

2. 提取`<link>`标签中的链接。

![提取`<link>`标签中的链接](/assets/regex-in-js/2.png)

3. 提取`<style>`标签。

![提取`<style>`标签](/assets/regex-in-js/3.png)

4. 提取`<style>`标签中的样式。

![提取`<style>`标签中的样式](/assets/regex-in-js/4.png)

既然已经知道怎么用正则表达式获取到指定字符串了，那么正则表达式在js中如何使用呢？

## 在js中使用正则表达式。

js中的字符串的`match`、`search`、`replace`、`split`支持正则表达式。例如：

```js
var html = '<link href="http://example.com/css/index.css" /><link href="http://example.com/css/index.css" />';

// 匹配<link>标签中的链接，并以数组的形式返回。
html.match(/(?<=href=").*?(?=")/gi)
```

就是利用这种方式，在字符中提取样式，并且重新创建`<link>`、`<style>`标签。
