---
layout: post
title:  "polymer note"
---

- polymer库
- 平台polyfills

bower 安装

    bower init
    bower install --save Polymer/polymer
    bower update


使用elements

- platform.js
  - web components APIs
  - polyfill
  - HTML Import
- polymer-ready


创建elements

1. load Polymer core(polymer.html)
2. <polymer-element>
  - name
  - noscript
3. lifecycle methos
  - created()
  - ready()

创建可复用的elements，并发布在github上。(http://docs.polymerchina.org/docs/start/reusableelements.html)


The Platform

- Web Components
  - Shadow DOM
  - HTML Imports
  - Custom Elements
- DOM
  - URL
  - WeakMap
  - Mutatioin Observers
  - observe.js
- Others
  - Web Animations

[工具 & 测试](http://docs.polymerchina.org/resources/tooling-strategy.html)
[js source map详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
