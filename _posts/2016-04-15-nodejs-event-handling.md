---
layout: post
title:  "nodejs中的错误处理"
---

nodejs中的错误捕获主要有3中：

1. try/catch
2. process.on('uncaughtExceptioin', err => {})
3. domain

### try/catch

try/catch 方式能很好的捕获同步发生的错误，并能有上下文环境。

### process.on('uncaughtException', err => {})

对于未正常捕获的错误，可让process进行监听``'uncaughtException'``事件进行捕获，但
是却丢了发生错误的上下文环境。

```js
process.on('uncaughtException', err => {
  console.log('error here, but I can do nothing.')
})

foo();
```

上面的例子，错误虽然被捕获到了，但是由于丢失了上下文，所以并不能给客户端友好的返
回。

### domain

domain允许捕获异步中的错误，并保持上下文关系。

```js
import domain from 'domain';

let d = domain.create();
d.on('error', err => {
  console.log('domain caught error.')
})
d.run(()=>{
  setTimeout(() => {
    throw new Error('a new Error.');
  }, 0)
})
```
