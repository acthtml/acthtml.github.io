---
layout: post
title:  "polymer note"
---

# polymer是什么

- polymer的世界观：什么都是元素
- polymer的架构
  - web components
  - the polymer library
  - elements


# web components是什么

- custom elements
- shadow DOM
- HTML imports
- web animations
- polyfills
- templates

## 关于自定义元素

- 什么是自定义元素
- 什么是polymer elements
- 自定义一个元素
  document.registerElement
- 安装一个polymer元素
- 扩展已有元素
- 元素的类型：UI和非UI

## 关于shadow DOM

- light DOM
- shadow DOM
- composed DOM

devTools中的显示

    #document-fragment
    #shadow-root

## 关于web components polyfills

custom elements
html imports
template
shadow DOM
+ polyfills


# polymer api

- 元素声明
  - 属性
  - 元素注册
  - 添加公共属性和方法
  - 添加私有和静态变量
  - 支持全局变量
  - 元素生命周期方法
  - polymer-ready事件
- 特性
  - 发布属性
  - 数据绑定和发布属性
  - 预计算属性
  - 声明事件映射
  - 自动节点搜索
  - 监控属性
  - 触发自定义事件
  - 扩展其他元素
- 预置的元素方法
  - 监控light DOM children节点的变化
  - 处理异步任务
  - 处理延迟任务
- 进阶
  - 元素绑定的过程
  - 数据的变化是怎么传递的？
  - Polymer的元素怎么处理自己
  - 兄弟元素的路径


## 元素的声明

    <polymer-element>

attributes: name,attributes,extends,noscript,constructor

### 元素的注册

    Polymer([tag-name,] [prototype]);

自定义元素的原型链

- 原型传给Polymer的方法
- 预置了一些方法和属性

### 元素的生命周期方法

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

## 特性

### 发布属性

- 双向绑定
- 能够直接在元素中直接定义值
- 支持reflected

如何使属性是发布属性？

- 在<polymer-element>的attributes属性中
- 在publish中

### 声明事件映射

事件有哪几种，如何处理委托。

### 属性监控

    observe : {
      bar : 'validate'
    }
    Paht.get('a.b.c').getValueFrom(this);

### 触发自定义函数

    this.fire(type, detail, targetNode, bubbles?, cancelable?)

## 预置元素方法

- onMutation
- async
- job

## 进阶

### 元素绑定的生命周期

当元素从document中去除时，Polymer会异步去除''{{}}''的绑定和''*Changed''的方法。
如果想在去去除时仍然保留这些特性，可以在去除时使用''cancelUnbindAll()''

    Polymer({
      detached : function(){
        this.cancelUnbindAll();
      }
    })


## 数据绑定

    // repeat
    <template repeat="{{person, person_index in people}}">
      name : {{person.name}}
    </template>jj

    this.people = [{
      name : 'XiaoLi',
      age : 18
    },{
      name : 'XiaoPeng',
      age : 19
    }]

    e.target.templateInstance.model.person

    // bind
    <template bind="{{Myitems as items}}">
      <p>{{length}}</p>
      <ul>
        <template repeat>
          <li>{{name}}</li>
        </template>
      </ul>
    </tempalte>

    // conditional templates
    <template if="{{conditional}}"></template>

    // import templates
    <template bind="{{}}" ref="myTemplate"></template>

    // attribute?={{boolean-expression}}

    // one-time bindings
    [[obj.value]]

    // filtering expressions
    {{ expression | filterName }}

    fiterName : tokenList, styleObject

    // 多级过滤函数
    {{ expression | filterA | filteB ... }}

    // 全局的过滤函数
    PolymerExpressions.prototype.uppercase = function(value, params){
      return value;
    }

## polyer帮助函数

    Polymer.import(urls, callback);
    Polymer.mixin(target, obj1 [, obj2, ...jjj])
    Polymer.waitingFor()
    Polymer.forceReady();

## 布局属性

- layout
- horizontal/vertical
- auto-vertical
- start/center/end
- self-start/center/end
- justified
- start/center/end-justified
- around-justified
- wrapper/reverse
- fullbleed
- block
- hidden
- relative
- fit

## 元素的样式

- [unresolved]
- [resolved]

    polyfill-next-selector { conte\nt: ':host > *' }
    ::content > * { }

    // polyfill-rule
    polyfill-rule {
      content: '.bar';
      background: red;
    }

    // polyfill-unscoped-rule
    polyfill-unscoped-rule {
      content: '#menu > .bar';
      background: blue;
    }

    <link rel="stylesheet"  href="main.css" no-shim>
    <link rel="stylesheet"  href="main.css" shim-shadowdom>

    // 手动
    var style = document.querySelector('#newstyles');
    var cssText = Platform.ShadowCSS.shimCssText(
          style.textContent, 'my-scope');
    Platform.ShadowCSS.addCssToDocument(cssText);

## touch & gestures

- touch-action="pan-x pan-y"
- events
  - up/down
  - tap
  - trackstart, track, trackend
  - hold, holdpulse
  - release

# elements

## elements guides

### layout elements

- core-header-panel
- core-toolbar
- core-drawer-panel
- core-scaffold

### flex box

- flex-direction // 定义主轴方向
  - row, row-reverse
  - column, column-reverse
- justify-content // 定义子元素如何在主轴排列
  - flex-start, flex-end
  - center
  - space-between, space-around
- align-items // 定义子元素入如何沿着侧轴排列
- align-self // 覆盖父元素的align-items，单独定义该元素如何沿着侧轴排列。

### material design spec

- baseline grids
- keylines
- touch target size


### core elements

- core-a11y-keys
- core-ajax, core-xhr
