---
layout: post
title:  "polymer note"
---
# 理解 Polymer

# 理解 web components

## 关于 custom elements

document.registerElement()

http://webcomponents.org/
http://w3c.github.io/webcomponents/spec/custom/
http://customelements.io/

## 关于 shadow DOM

createShadowRoot()

- Light DOM
- Shadow DOM
- Composed DOM

## 关于 HTML imports

## 关于 web animations

- Animations
- AnimationEffects
- TimingDictionaries
- TimingGroups
- AnimationPlayers

# 开发API

## 开发概述

### 元素声明

attributes

### 元素的生命周期函数

- createdCallback
  - created
  - ready
- attachedCallback
  - attached
  - domReady
- detachedCallback
  - detached
- attributeChangedCallback
  - attributeChanged

### 其他相关

- this.super() // extends时，使用父辈元素的方法。
- this.onMutation(domElement, someCallback) // 当domElement的children改变时，调用回调函数
- this.async() // 等同于window.setTimeout()，但是this指向当前元素并且
- this.job() // 单位时间内多次出发只出发一次。

- this.cancelUnbindAll()
- this.preventDispose = true;

- 监控数据变化
  Object.observe() 和 Platform.flush();

- this.alwaysPrepare = true

- this.resolvePath('x-foo.png') === 'components/x-foo/x-foo.png'


## 数据绑定
