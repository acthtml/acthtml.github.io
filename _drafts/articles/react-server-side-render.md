---
layout: post
title:  "React服务器端渲染"
---

一些思路笔记。

React服务器端渲染需要做到4件事：

- 能够解析js，这个Node.js天生干这个。
- 能够解析JSX，这个需要``node-jsx``模块。
- 能够将React组件生成相应的HTML，这个React有对应的方法``React.renderToString()``。
- 能够将CommonJS标准的模块在浏览器端运行，这个需要``browserify``。
