---
layout: post
title:  "js错误类型"
---

# 为什么使用错误类型

日常开发中，定位错误的方法我们常使用``console.log('错误信息')``的方式来记录信息，
方便调试。但是对于大型项目，这些信息就有点捉襟见肘了。我们常常需要错误发生的文件、
行号等信息。并且，错误类型多的话，我们还需要对错误的类型进行分类。

这个时候，我们就需要利用js的错误对象来帮助我们发布错误，并且可以自定义错误类型来
满足一些苛刻的需求。


# 标准的js错误类型有哪些

js标准的错误类型有8种：1种是通用的标准类型，即``Error``，还有其他7种内置的错误类型。

1. ``EvalError`` 与``eval()``相关的错误。
2. ``InternalError`` 为内部错误，例如递归太多。
3. ``RangeError`` 索引错误，值超过索引范围。
4. ``ReferenceError`` 引用错误，例如变量并未定义。
5. ``SyntaxError`` 语法错误，例如语句未正常闭合。
6. ``TypeError`` 变量或参数类型错误。
7. ``URIError`` 方法``encodeURI``和``decodeURI``的参数错误。


# 如何创建js错误类型

我们可以抛出上面的标准类型，当不满足需求时，我们就自定义错误类型。例如我们创建一
个数据库类型的错误，名为``DatabaseError``。

{% highlight javascript %}

function DatabaseError(message){
  this.name = 'DatabaseError';
  this.message = message;
}

DatabaseError.prototype = Object.create(Error.prototype);
DatabaseError.prototype.constructor = DatabaseError;

try{
  throw new DatabaseError('数据库连接错误');
}catch(e){
  console.log(e.name); // DatabaseError;
  console.log(e.message); // 数据库连接错误
}

{% endhighlight %}
