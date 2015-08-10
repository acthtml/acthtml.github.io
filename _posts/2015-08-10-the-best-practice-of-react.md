---
layout: post
title:  "React最佳实践"
---

1. 拆分用户界面为一个组件树。
  - 组件的最小颗粒度跟数据模型一致。
  - 组件的最大颗粒度跟功能单一性原则一致。
2. 创建应用的一个静态版本
3. 识别出最小的（但是完整的）代表 UI 的 state
4. 确认 state 的生命周期

React改变了编程模式，当然也改成了思维方式。我们来看看下面的设计稿，该怎么开始？

![设计原型](/assets/the-best-practice-of-react/images/1.png)

1. 拆分各个组件，形成一个组件树。

组件按照这两条标准划分：

- 组件的最小颗粒度跟数据模型一致
- 组件的最大颗粒度跟功能单一性原则一致

![拆分组件](/assets/the-best-practice-of-react/images/2.png)

最终形成的组件树为：

- TodoApp
  - TodoTextInput
  - TodoAllDone
  - TodoList（undone）
    - TodoItem
  - TodoList（done）
    - TodoItem

有了结构，可以写每个组件了，然后创建一个静态版本。

2. 写每个组件，创建静态版本。
3. 然后确定能代表整个UI的最小State。
4. 确认state的生命周期。

最终的[demo](/assets/the-best-practice-of-react/index.html)
