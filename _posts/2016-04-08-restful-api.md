---
layout: post
title:  "RESTful"
---

RESTful规范解读。

### 1. URL

``http://example.com/v1/zooms/ID/anminals/ID``

1. 带版本号
2. 都是名词
3. 复数来表示集合

### 2. HTTP动词

对资源的操作使用http动词，动词有这么几个：

- GET 获取
- POST 新增
- PUT 更新（客户端提供资源的全部属性）
- PATCH 更新（客户端提供资源的部分属性）
- DELETE 删除
- HEAD 获取资源的元数据
- OPIONS 获取资源的那些属性可被客服端修改

### 3. Filting 过滤参数

``url?sortby=name&order=asc&page=2&limit=20``

### 4. Status Code 状态码

- 200 OK
- 201 CREATED
- 202 ACCEPTED
- 204 NO CONTENT
- 400 INVAILD REQUEST
- 401 UNAUTHORIZED
- 403 FORBIDDEN
- 404 NOT FOUND
- 406 NOT ACCEPTABLE
- 410 GONE
- 500 SERVERS ERROR

### 5. Error Handling 错误处理

如果操作发生错误，一般使用error作为键名来返回错误信息。

``{ error : "Invaild API Key"}``

### 6. 返回结果

对于返回的结果，必须符合其中一种：列表、单个资源、空文档。

### 7. Hypermedia API

在api结果中提供资源、文档的url来帮助开发者进行下一步操作。
