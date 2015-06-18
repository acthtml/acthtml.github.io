# polymer start note

## 声明属性

属性有哪些特点：

- 双向绑定
- 默认值
- 属性反射
- 计算（ computed ）
- 属性值监控
- 只读 read-only
- 属性值类型，可以序列化到对至标签属性

如何声明属性

{% highlight javascript %}

Polymer({
  is : "my-element",
  // 设置属性
  properties : {
    myProperty : {
      // 值类型，property <=> attributes serialize and deserialize
      // String, Boolean, Date, Array, Object, Number
      type : String,
      // default value
      value : 'some value',
      // 是否反射到attribute
      reflectToAttribute : true,
      // 是否只读，只读状态值不能设置，只能通过私有函数设置 this._setPropertyName(value)
      // 其中PropertyName指定的是当前的属性名，例如这里为 this.setMyProperty(value)
      readOnly : true,
      // 是否允许双向绑定。允许双向绑定时，还会触发myProperty-changed事件。
      notify : true,
      // 监控的函数名称
      observer : 'myPropertyChanged',
      // 计算值。
      computed : 'myAge + 1'
    },
    myAge : {
      type : Number,
      value : 10
    },
    // 监控多种属性变化。
    observers : [
      'myProperyChanged(myProperty, myAge)'
    ],
    // @see myPropery.observer
    myProperyChanged : function(new_value, old_value){
    },
    ready : function(){
      this.addEventListener('myPropery-changed', function(e){
        console.log('new value is ' + e.detail.value);
      })
    }
  }
})

{% endhighlight%}
