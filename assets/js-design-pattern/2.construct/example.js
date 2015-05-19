// A. 构造器模式

function Person(name, age){
  this.name = name;
  this.age = age;

  this.sayHello = function(){
    console.log('hello, I\'m ' + this.name + ', ' + this.age + ' years old.');
  }
}

var john = new Person('John', 18),
    jack = new Person('Jack', 20);

john.sayHello();
jack.sayHello();


// B.1 带有原型的构造器模式
function Person(name, age){
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function(){
  console.log('hello, I\'m ' + this.name + ', ' + this.age + ' years old.');
}

// B.2 甚至可以这样
function Person(name, age){
  this.init(name, age);
}

Person.prototype = {
  init : function(name, age){
    this.name = name;
    this.age = age;
  },
  sayHello : function(){
    console.log('hello, I\'m ' + this.name + ', ' + this.age + ' years old.');
  }
}
