---
layout: post
title:  "ES7中的装饰器"
---

es7装饰器，灵感来源于python中的``@``描述符，其本质都是装饰者模式。

在es7中，通过``@``标识其是装饰器。装饰器有两种用法，一个是对类的属性，另一个直接
对类使用。

# 类属性的装饰器

在对类的属性使用时，装饰器返回一个函数表达式，该函数接受三个参数：目标对象、属性
名、属性描述符，函数执行后返回的则是属性描述符。

{% highlight javascript %}

function readonly(target, key, decriptor){
  decriptor.writable = false;
  return decriptor;
}

class Person {
  @readonly,
  name : 'John',
  sayHello(){
    console.log(`Hello, I'm ${this.name}`);
  }
}

var person = new Person();
person.sayHello();
person.name = 'Jack'; // Error，因为通过@readonly装饰器描述其属性为不可重写。
person.sayHello();

{% endhighlight %}

# 类的装饰器

类的装饰器有点类似类的属性扩展，其装饰器函数本质是一个构造函数。

{% highlight javascript %}

@police
class Person{
  name = 'John';
  sayHello(){
    console.log(`Hello, I'm ${this.name}.`);
  }
}

function police(target){
  target.sayHello = function(){
    console.log(`Stop! Police ${target.name} here.`);
  }
}

Person.sayHello();

{% endhighlight %}

