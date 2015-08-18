---
layout: post
title:  "Reflux：基于React的应用架构"
---

React的设计目的是管理视图层，所以对于大型应用来说，我们还需要数据层面的复用。所以
facebook设计了flux架构，并官方发布了[dispather.js](https://github.com/facebook/flux/blob/master/src/Dispatcher.js)，
但是这个使用起来比较复杂，于是网友开发了更加简单的版本：reflux.

reflux将应用程序划分成3个部分：

- **actions** 动作
  程序的应用行为，例如条目的“添加”、“修改”。这些动作应该有视图组件交互触发，并且
  发布给监听这些动作的仓库。
- **stores** 仓库
  相当于MVC中的M层。监听动作，根据动作来操作数据，最后将数据发布给视图组件。
- **view components** 视图组件
  根据仓库的数据渲染视图组件，还能发布相应的动作。

```
╔═════════╗       ╔════════╗       ╔═════════════════╗
║ Actions ║──────>║ Stores ║──────>║ View Components ║
╚═════════╝       ╚════════╝       ╚═════════════════╝
     ^                                      │
     └──────────────────────────────────────┘
```

要使用Reflux，只要搞懂下面的几点就行：

1. 动作如何创建和发布。
2. 仓库如何创建，如何监听动作，如何发布变化给监听的组件。
3. 组件如何监听仓库，如何发布动作。

## 1. 动作的创建和发布

使用``Reflux.createAction(options)``创建单个动作，``Reflux.createActions(Array options)``
创建多个动作。

{% highlight javascript %}

      // 创建单个动作
  var action = Reflux.createAction(),
      // 创建多个动作
      actions = Reflux.createActions(['add', 'del']);

  // 发布动作，并传递一些参数给处理这（监听的仓库）
  action(some_data);
  actions.add(some_data);
  actions.del(some_data);

{% endhighlight %}

动作还有2个hooks函数：

- ``preEmit`` 返回处理过后的参数给监听者。
- ``shouldEmit`` 返回false则不发布给监听者（仓库）。

## 2. 仓库的创建，监听动作，发布变化给监听组件

使用``Reflux.createStore``可创建仓库，使用``listenTo``、``listenToMany``来监听单
个或多个动作，使用``trigger``来发布变化给监听组件。

{% highlight javascript %}

  var store = Refulx.createStore({
    // 在init中绑定监听事件
    init : function(){
      this.listenTo(action, this.onAdd);
      this.listenToMany(actions);
    },
    onAdd : function(status){
      // 一些对status的操作。
      // .....

      // 将数据发布给监听组件
      this.trigger(status);
    }
  })

{% endhighlight %}

上的可以利用``listenables``参数进行简写，去掉init和listenTo、listenToMany

{% highlight javascript %}

  var store = Reflux.createStore({
    listenables : actions,
    onAdd : function(){
      // ....
    }
  })

{% endhighlight javascript %}

## 3. 视图组件监听仓库，发布动作。

通过仓库的``listen``方法进行监听。

{% highlight javascript %}

  var Component = React.createClass({
    componentDidMount : function(){
      // 监听仓库
      store.listen(function(status){
        // 根据status来更新state
        this.setState({data:status});
      }.bind(this))
    },
    // 一个组件的交互动作
    add : function(){
      // 发布动作
      actions.add(some_data);
    }
  })

{% endhighlight %}

对于性能问题，我们一般会在组件在挂载后才进行监听，移除后去除监听。所以我们需要这
样做：

{% highlight javascript %}

  // 组件挂载后进行监听
  componentDidMount : function(){
    this.unsubscribe = store.listen(this.changeStatus);
  },
  // 组件移除后去除监听
  componentWillUnmount : function(){
    this.unsubscribe();
  },
  // 一个方法示例
  changeStatus : function(status){
    this.setState({data:status});
  }

{% endhighlight %}

上面的最佳实践可以变成下面的缩写。

{% highlight javascript %}

  mixins : [Reflux.connect(store, 'data')]

{% endhighlight %}

最后放一个简单的[demo](/assets/react-reflux/example.html)。


参考文档：

- [reflux](https://github.com/reflux/refluxjs)



