---
layout: post
title:  "HTTP POST请求中的编码格式"
---

Http协议以ascii码传输的，协议分成三个部分：状态行、请求头、消息主体。

```
  <method> <request-url> <version>
  <headers>

  <entity-body>
```

协议规定post提交的数据必须放在消息主题内，但协议并不规定必须用何种编码方式。所以
就在请求头用``Content-Type``字段来声明编码方式，服务器端也根据这个头部来进行解码。

编码方式一共有四种。

### 1. application/x-www-form-urlencoded 以url转码的形式提交

这是通常的POST提交方式，``<form>``标签的``enctype``属性默认就是``application/x-www-form-urlencoded``
这个值。

请求类似于这样：

```
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

其中key和value都进行了URL转码，然后通过``&``符号链接。这种形式服务器端都支持的很
好，列如在php中可以直接使用``$_POST[title]``来获取title字段的值。

### 2. multipart/form-data 提交富文本内容

```
POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png

PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
```

这种形式一遍用在提交文件。这里有一个boundary，用于分割不同的字段。

### 3. application/json 提交json格式

```
POST http://www.example.com HTTP/1.1
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```

### 4.text/xml 提交xml格式

```
POST http://www.example.com HTTP/1.1
Content-Type: text/xml

<?xml version="1.0"?>
<methodCall>
    <methodName>examples.getStateName</methodName>
    <params>
        <param>
            <value><i4>41</i4></value>
        </param>
    </params>
</methodCall>
```
