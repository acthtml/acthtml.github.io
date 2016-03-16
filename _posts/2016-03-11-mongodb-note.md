---
layout: post
title:  "mongodb笔记"
---
{:toc}

## 1. NoSQL数据库与mongodb

mongodb是采用分布式文件存储的非关系型数据库。关系型数据库采用SQL语句进行查询，数
据则以表、行、列的形式存储于数据库中。而mongodb则以json文档的形式存储数据，查询语
句也更像面向对象语言。

## 2. 安装mongodb

[下载](https://www.mongodb.org/)对应的安装文件，进行安装。

安装结束，进入对应的`/bin`文件夹，运行命令，启动mongo服务器。

```
# 启动mongodb服务器
mongod --dbpath=数据存放的文件夹

# 连接数据库
mongodb://username:password@hostname:port/database-name
```

接下来，可以通过mongo shell来操作数据库。mongo shell是以javascript语法为基础的命
令行系统。

## 3. 创建/删除数据库

```
# 进入mango shell
mongo
# 创建数据库
use DATABASE_NAME
> switch to DATABASE_NAME
# 命令db显示当前所在的数据库名称，默认实在test数据库
db
> DATABASE_NAME
# 使用dropDatabase()方法删除数据库
db.dropDatabase()
# 查看数据库列表
show dbs
> local
> test
```

## 4. 创建集合

集合对应关系型数据的表。

```
# 创建集合
db.createCollection('COLLECTION_NAME')
```

## 5. 插入文档

文档对应关系数据库的行。文档为json格式，其字段对应关系型数据的列。同一个集合中文
档的字段不用都相同。

```
# 插入文档
# db.COLLECTION_NAME.insert(document)
db.coll.insert({name:'jack'})
db.coll.insert({name:'john', age:18})
# 插入的文档之后会自动生成一个_id键，值为objectid()的唯一id。
```

## 6. 更新文档

```
# 更新文档
# db.COLLECTION_NAME.update(<query>, <update>, options)
db.coll.update(
  {name : 'jack'},
  {age : 20},
  {
    upset : false, // 若没有找到指定项，是否插入，默认为false不插入。
    multi : false // 对匹配的多个文档处理，默认为false，只对找到的第一个文档进行处理。
  }
)
```

## 7. 保存文档

根据文档的id，若集合中已有，则更新对应的文档，否则插入文档。

```
# db.COLLECTION_NAME.save(document)
```

## 8. 删除文档

```
# db.COLLECTION_NAME.remove(<query>, options)
db.coll.remove(
  {age : {$lt : 20}},
  {
    justOne : true // 是否只删除一条。
  }
)
# 删除所有
db.coll.remove({})
```

## 9. 查询

通过``db.COLLECTION_NAME.find(<query>)``来按照指定条件查询。

```
# 找到所有年龄是20的人
db.coll.find({age : 20})
# 找到年龄小于20的人
db.coll.find({age : {$lt : 20}})
```

这样的条件操作符还有：

- 大于 ``$gt``
- 大于等于 ``$gte``
- 小于等于 ``$lte``
- 小于 ``$lt``

并且还有多个条件融合。

```
# 类似于关系型数据库的AND
# 找出年龄介于18和20之间的人
db.coll.find({age:{$lt:20}, age:{$gt:18}})
# 找出年龄小于18或者大于20的人
db.coll.find({$or:[{age:{$lt:18}}, {age:{$gt:20}}]})
```

可以使用limit()来限制结果文档数量，使用skip()跳过指定数量的文档。

```
# 每页10条，显示第三页
db.coll.find({}).limit(10).skip(20)
```

## 10. 聚合

类似于关系型数据的``group by``语句

```
# db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
db.coll.aggregate({
  $group : {
    _id : "$name",
    num : {$sum : 1}
  }
})
```

使用aggreate()函数实现聚合。其中``_id:"$name"``指明以字段``name``来聚合，``num:{$sum:1}``
来指明结果集中``num``字段是``name``相同的总数。

其他一些聚合操作：

- $sum 计算总和
- $avg 计算平均值
- $min 最小值
- $max 最大值
- $push 在结果文档中插入一个值到数组中
- $addToSet 同$push，但不创建副本
- $first 第一个文档
- $last 最后一个文档

## 11.管道

管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。这样使得一次
执行多条命令。

管道的操作有：

- $project 用于修改文档结构。
- $match 同find()。
- $limit 同limit()。
- $skip 同skip()。
- $unwind 将文档中某一数组类型的字段拆分成多条，每条包含数组中的一个值。
- $group 将集合中的文档分组。
- $sort 同sort()。
- $geoNear 按地理位置排序。

```
# 找到所有年龄小于20的学生，并且按照班级分类，每页100条，显示第5页。
db.coll.aggregate(
  [
    {$match : {age : {$lt : 20}}},
    {$group : {_id : "classRoom"}},
    {$limit : 100},
    {$skip : 401}
  ]
)
```
