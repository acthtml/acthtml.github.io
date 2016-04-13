---
layout: post
title:  "Koa-router"
---

``koa-router``包用于koa框架的路由定义。

## 快速上手

1. 安装

```bash
# next标签指明用于koa@2版本
npm install koa-router@next
```

2. 使用

```javascript
var Koa = require('koa'),
    app = new Koa(),
    Router = require('koa-router'),
    router = new Router();

// 定义路由
router.get('/home', async (ctx, next)=>{
  ctx.body = 'hello world';
  await next();
})

router.get('/user/:id', async (ctx, next)=>{
  ctx.body = 'hello user :' + ctx.params.id;
  await next();
})

app.use(router.routes());
app.listen(3000);
```
## new Router([opts])

opts选项是一个对象，目前只有一个配置属性：prefix，用于设置路由的前缀。

```js
router = new Router({prefix:'/path/prefix'})
router.get('/home', async (ctx, next){
  ctx.body = '需要访问/path/prefix/home';
  await next();
})
```

该构造函数用于生成router实例，每个router实例具有下面的方法：

## router.verb([name,] path, middlewaves...)

verb是个代词，指代http动词，这些动词在[RESTful](/2016/04/08/restful-api.html)应用
中有特殊意义，动词有：get, put,post, patch, delete。

```js
router
  .get('/user/:id', async (ctx, next) => {});
  .post('/user/:id', async (ctx, next) => {});
  .delete('/user/:id', async (ctx, next) => {});
```

像上面那样，我们定义路由、路由的访问方式、对应路径运行的中间件。

我们还可以获取指定路径的参数，例如路径为``/user/:id``，我们可以在``ctx.params``中
访问参数``id``指代的值，例如``ctx.params.id``。

定义路由的时候，我们还能给路径取个名字，我们可以用访问路径名字来取代指定路径，这
样，对需要频繁修改路径的场景非常有用。

```js
router.get('login', '/user/login', async (ctx, next) => {})
// 跳转到名为login的路径
router.url('login');
```

对于指定路由，我们可以顺序运行多个中间件，中间件以``,``逗号分隔就行。

## router.routes()

返回一个router实体定义的中间层。

```js
app.use(router.routes())
```

## router.use([path,] middlewaves...)

对指定路径运行中间层。

```js
// session middleware will run before authorize
router
  .use(session())
  .use(authorize());

// use middleware only with given path
router.use('/users', userAuth());

// or with an array of paths
router.use(['/users', '/admin'], userAuth());

app.use(router.routes());
```

通过router.use()我们还能设置层级路径。

```js
var users = new Router(),
    router = new Router();

users
  .get('/', async (ctx, next) => {})
  .get('/:id', async (ctx, next) => {})

router.use('/users', users.routes())

app.use(router.routes())
```

## router.prefix(prefix)

设置路径的前缀，可冲掉 new Router([opts]) 中的opts.prefix设置。

## router.redirect(source, destination, code)

对于路径source重定向到destination，返回状态码为code。

```js
router.redirect('/home', '/new-home', 301)
```

## router.url(name [,params])

根据路径规则和参数，返回对应的url。

```js
router.get('user', '/user/:id', async (ctx, next) => {});
// '/user/111'
router.url('user', 111)
// '/user/222'
router.url('user', 222)
```

## router.params(name, middlewave)

对指定请求参数，运行中间件函数。

```js
router
  .param('id',async (id, ctx, next) => {
    for(var user of users){
      if(user.id == id) ctx.state.user = user;
    }
    await next();
  })
  .get('/users/:id', async (ctx, next) => {
    ctx.body = 'hello :' + ctx.state.user.name;
    await next();
  })
```


## API：

- new Router([opts])
  - Router.url(path, params)
- instance of new Router()
  - router.verb([name,] path, middlewaves...)
    - get/put/post/patch/delete
  - router.routes()
  - router.use([path,] middlewaves...)
  - router.prefix(prefix)
  - router.redirect(source, distenation, code)
  - router.url(path, params)
  - router.params(name, middlewave)
