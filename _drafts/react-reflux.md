---
layout: post
title:  "Reflux, React的应用架构"
---

React解决了MVC中的V的问题，但是对于大型应用来说，不只是ui层要复用，数据处理层也要
复用，于是facebook想出了flux方法，将整个架构分成4个部分：

- action
- dispatcher
- store
- component
