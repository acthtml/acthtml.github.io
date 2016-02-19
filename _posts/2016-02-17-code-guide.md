---
layout: post
title:  "代码规范"
---

## 1. 目的

- 最佳实践；如果规范对你的开发起不了作用，那么应该优化规范。
- 团队协作；代码风格的统一，保持团队协作顺畅。

## 2. 命名规范

### 2.1 项目命名

全部采用小写方式， 以下划线分隔。

例：my_project_name

### 2.2 目录命名

参照项目命名规则；

有复数结构时，要采用复数命名法。

例：scripts, styles, images, data_models

### 2.3 JS文件命名

参照项目命名规则。

例：account_model.js

### 2.4 CSS, SCSS文件命名

参照项目命名规则。

例：retina_sprites.scss


### 2.5 HTML文件命名

参照项目命名规则。

例：error_report.html


## 3 HTML

### 3.1 语法

- 缩进使用soft tab（2个空格）；
- 嵌套的节点应该缩进；
- 在属性上，使用双引号，不要使用单引号；
- 属性名全小写，用中划线做分隔符；
- 不要在自动闭合标签结尾处使用斜线（HTML5 规范 指出他们是可选的）；
- 不要忽略可选的关闭标签，例：</li> 和 </body>。

{% highlight html %}

<!DOCTYPE html>
<html>
    <head>
        <title>Page title</title>
    </head>
    <body>
        <img src="images/company_logo.png" alt="Company">

        <h1 class="hello-world">Hello, world!</h1>
    </body>
</html>

{% endhighlight %}


### 3.2 HTML5 doctype

在页面开头使用这个简单地doctype来启用标准模式，使其在每个浏览器中尽可能一致的展现；
虽然doctype不区分大小写，但是按照惯例，doctype大写 （关于html属性，大写还是小写）。

{% highlight html %}

<!DOCTYPE html>
<html>
  ...
</html>

{% endhighlight %}

### 3.2 字符编码

通过声明一个明确的字符编码，让浏览器轻松、快速的确定适合网页内容的渲染方式，通常
指定为'UTF-8'。

{% highlight html %}

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    ...
</html>

{% endhighlight %}

### 3.3 属性顺序

属性应该按照特定的顺序出现以保证易读性；

- class
- id
- name
- data-*
- src, for, type, href, value , max-length, max, min, pattern
- placeholder, title, alt
- aria-*, role
- required, readonly, disabled

class是为高可复用组件设计的，所以应处在第一位；

id更加具体且应该尽量少使用，所以将它放在第二位。

### 3.4 boolean属性

boolean属性指不需要声明取值的属性，XHTML需要每个属性声明取值，但是HTML5并不需要；

{% highlight html %}

<input type="text" disabled>

<input type="checkbox" value="1" checked>

<select>
    <option value="1" selected>1</option>
</select>

{% endhighlight %}

### 3.5 实用高于完美

尽量遵循HTML标准和语义，但是不应该以浪费实用性作为代价；

任何时候都要用尽量小的复杂度和尽量少的标签来解决问题。

## 4. js

### 4.1 缩进

使用soft tab（2个空格）。

### 4.2 空行

以下几种情况需要空行：

- 变量声明后（当变量声明在代码块的最后一行时，则无需空行）
- 注释前（当注释在代码块的第一行时，则无需空行）
- 代码块后（在函数调用、数组、对象中则无需空行）
- 文件最后保留一个空行

{% highlight javascript %}

// need blank line after variable declaration
var x = 1;

// not need blank line when variable declaration is last expression in the current block
if (x >= 1) {
  var y = x + 1;
}

var a = 2;

// need blank line before line comment
a++;

function b() {
  // not need blank line when comment is first line of block
  return a;
}

// need blank line after blocks
for (var i = 0; i < 2; i++) {
  if (true) {
    return false;
  }

  continue;
}

var obj = {
  foo: function() {
    return 1;
  },

  bar: function() {
    return 2;
  }
};

// not need blank line when in argument list, array, object
func(
  2,
  function() {
    a++;
  },
  3
);

var foo = [
  2,
  function() {
    a++;
  },
  3
];


var foo = {
  a: 2,
  b: function() {
    a++;
  },
  c: 3
};

{% endhighlight %}

### 4.3 换行

换行的地方，行末必须有','或者运算符；

以下几种情况不需要换行：

- 下列关键字后：else, catch, finally
- 代码块'{'前

以下几种情况需要换行：

-代码块'{'后和'}'前
-变量赋值后

{% highlight javascript %}

// not good
var a = {
  b: 1,
  c: 2
};

x = y ? 1 : 2;

// good
var a = {
  b: 1,
  c: 2
};

x = y ? 1 : 2;
x = y ?
  1 : 2;

// no need line break with 'else', 'catch', 'finally'
if (condition) {
  ...
} else {
  ...
}

try {
  ...
} catch (e) {
  ...
} finally {
  ...
}

// not good
function test() {
  ...
}

// good
function test() {
  ...
}

// not good
var a, foo = 7,
  b,
  c, bar = 8;

// good
var a,
  foo = 7,
  b, c, bar = 8;

{% endhighlight %}

### 4.4 注释

注释应该遵循jsDoc风格。

#### 4.4.1 单行注释

双斜线后，必须跟一个空格；

缩进与下一行代码保持一致；

可位于一个代码行的末尾，与代码间隔一个空格。

{% highlight javascript %}

if (condition) {
    // if you made it here, then all security checks passed
    allowed();
}

var zhangsan = 'zhangsan'; // one space after code

{% endhighlight %}

#### 4.4.2 多行注释

最少三行, '*'后跟一个空格，具体参照右边的写法；

建议在以下情况下使用：

- 难于理解的代码段
- 可能存在错误的代码段
- 浏览器特殊的HACK代码
- 业务逻辑强相关的代码

{% highlight javascript %}

/*
 * one space after '*'
 */
var x = 1;

{% endhighlight %}


#### 4.4.3 文档注释

各类标签@param, @method等请参考usejsdoc和JSDoc Guide；

建议在以下情况下使用：

- 所有常量
- 所有函数
- 所有类

{% highlight javascript %}

/**
 * @func
 * @desc 一个带参数的函数
 * @param {string} a - 参数a
 * @param {number} b=1 - 参数b默认值为1
 * @param {string} c=1 - 参数c有两种支持的取值</br>1—表示x</br>2—表示xx
 * @param {object} d - 参数d为一个对象
 * @param {string} d.e - 参数d的e属性
 * @param {string} d.f - 参数d的f属性
 * @param {object[]} g - 参数g为一个对象数组
 * @param {string} g.h - 参数g数组中一项的h属性
 * @param {string} g.i - 参数g数组中一项的i属性
 * @param {string} [j] - 参数j是一个可选参数
 */
function foo(a, b, c, d, g, j) {
    ...
}

{% endhighlight %}

### 4.5 引号

最外层统一使用单引号。

{% highlight javascript %}

// not good
var x = "test";

// good
var y = 'foo',
    z = '<div id="test"></div>';

{% endhighlight %}

### 4.6 变量命名

- 标准变量采用驼峰式命名（除了对象的属性外，主要是考虑到cgi返回的数据）
- 'ID'在变量名中全大写
- 'URL'在变量名中全大写
- 'Android'在变量名中大写第一个字母
- 'iOS'在变量名中小写第一个，大写后两个字母
- 常量全大写，用下划线连接
- 构造函数，大写第一个字母
- jquery对象必须以'$'开头命名

{% highlight javascript %}

var thisIsMyName;

var goodID;

var reportURL;

var AndroidVersion;

var iOSVersion;

var MAX_COUNT = 10;

function Person(name) {
    this.name = name;
}

// not good
var body = $('body');

// good
var $body = $('body');

{% endhighlight %}

### 4.7 函数

- 无论是函数声明还是函数表达式，'('前不要空格，但'{'前一定要有空格；
- 函数调用括号前不需要空格；
- 立即执行函数外必须包一层括号；
- 不要给inline function命名；
- 参数之间用', '分隔，注意逗号后有一个空格。

{% highlight javascript %}

// no space before '(', but one space before'{'
var doSomething = function(item) {
    // do something
};

function doSomething(item) {
    // do something
}

// not good
doSomething (item);

// good
doSomething(item);

// requires parentheses around immediately invoked function expressions
(function() {
    return 1;
})();

// not good
[1, 2].forEach(function x() {
    ...
});

// good
[1, 2].forEach(function() {
    ...
});

// not good
var a = [1, 2, function a() {
    ...
}];

// good
var a = [1, 2, function() {
    ...
}];

// use ', ' between function parameters
var doSomething = function(a, b, c) {
    // do something
};

{% endhighlight %}

### 4.8 数组、对象

- 对象属性名不需要加引号；
- 对象以缩进的形式书写，不要写在一行；
- 数组、对象最后不要有逗号。

{% highlight javascript %}

// not good
var a = {
    'b': 1
};

var a = {b: 1};

var a = {
    b: 1,
    c: 2,
};

// good
var a = {
    b: 1,
    c: 2
};

{% endhighlight %}

### 4.9 null

适用场景：

- 初始化一个将来可能被赋值为对象的变量
- 与已经初始化的变量做比较
- 作为一个参数为对象的函数的调用传参
- 作为一个返回对象的函数的返回值

不适用场景：

- 不要用null来判断函数调用时有无传参
- 不要与未初始化的变量做比较

{% highlight javascript %}

// not good
function test(a, b) {
    if (b === null) {
        // not mean b is not supply
        ...
    }
}

var a;

if (a === null) {
    ...
}

// good
var a = null;

if (a === null) {
    ...
}

{% endhighlight %}

### 4.10 undefined

永远不要直接使用undefined进行变量判断；

使用typeof和字符串'undefined'对变量进行判断。

{% highlight javascript %}

// not good
if (person === undefined) {
    ...
}

// good
if (typeof person === 'undefined') {
    ...
}

{% endhighlight %}

### 4.11 杂项

- 不要混用tab和space；
- 不要在一处使用多个tab或space；
- 换行符统一用'LF'；
- 对上下文this的引用只能使用'_this', 'that', 'self'其中一个来命名；
- 行尾不要有空白字符；
- switch的falling through和no default的情况一定要有注释特别说明；
- 不允许有空的代码块。

{% highlight javascript %}

// not good
var a   = 1;

function Person() {
    // not good
    var me = this;

    // good
    var _this = this;

    // good
    var that = this;

    // good
    var self = this;
}

// good
switch (condition) {
    case 1:
    case 2:
        ...
        break;
    case 3:
        ...
    // why fall through
    case 4
        ...
        break;
    // why no default
}

// not good with empty block
if (condition) {

}

{% endhighlight %}
