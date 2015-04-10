---
layout: post
title:  "第13周任务"
---

4.7 ~ 4.10（4.9上传）

dai:
----
done:
  - [4.7] 弹屏
  - [4.7 ~ 4.8] PC接入调查问卷
  - [4.7 ~ 4.8] 手机站接入调查问卷
  - [4.8] 终页添加浏览记录
          10元小图修改
          特卖频道修复倒计时问题
  - [4.10] 周末卡消费终页日历添加“可预约”字样
  - [4.10] 手机站订单中心


du
--
h5品成会议4.8得在线上，@pm刘凯，曹井荣

- [4.9] 周末卡app下单页添加选择景点。
done:
  - [4.7] h5品成会议
  - [4.8 ~ 4.9] 包楼pc改版
  - [4.10] 亲子第十一期h5

lu
--
- [4.9 ~ 4.10] 记住用户在列表页对筛选项的选择，到终页再返回时，回到之前浏览的位置(上周遗留）
done:
  - [4.8] "我的收藏"里，"周末游收藏"改成"周边游收藏"
  - [4.8] 点击"周边游订单页面"返回按钮，直接返回到"我的订单页面"。
  - [4.8] "填写订单页"返回按钮，由返回到列表页改成返回到详情页。

chen
----
done:
  - [4.7] 尾房换头图
  - [4.7] 预售app

未分配
------
  - pc终页迭代
  - cn及touch保险增加出游人身份证填写
    TOUCH下单页保险信息：增加受保人具体信息填写信息框
    【下单页】添加“再添加一位出游人”按钮（具体修改方法见表2）
  - 周末卡PC实体卡购卡页面添加地址填写功能

  - [4.9 ~ 4.10] 周末卡PC二级页面迭代



问卷调查

手机站 http://10.1.40.186:8200/booking_success.html
-------
添加.book_survey

<link rel="stylesheet" href="http://css.40017.cn/cn/min/??/touch/c/public/knownFor/knownFor.0.0.1.css?v=2015040701">
<script src="http://js.40017.cn/cn/min/??/touch/public/page/0.0.2/page.js,/touch/c/public/knownFor/knownFor.0.0.1.js?v=2015040701"></script>
<script>
$(function(){
    $('.book_survey').knownFor(6)
});
</script>
<style>
    .book_survey a{margin-top: 20px;color: #666;}
</style>

pc http://10.1.40.186:8000/book5.html
---
book_success.4.10.0.css => book_success.4.11.0.css
book_success.js => book_success.1.1.js

添加 .book_survey



# pc页面用户信息cookie更改（cnUser=>us）

周末卡下单页
card_book.js => card_book.1.1.js

动态打包下单页
book.4.11.2.js => book.4.11.3.js

普通下单页
book.4.16.0.js => book.4.16.1.js

周末卡列表页
card_list.1.1.js => card_list.1.2.js

pc10元度周末
ten_weekend.1.1.js => ten_weekend.1.2.js
ten_weekend_ticket.js => ten_weekend_ticket.1.1.js

列表页，终页
favorite_line.js 刷新
