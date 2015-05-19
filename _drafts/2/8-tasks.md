---
layout: post
title:  "第8周任务"
---

2.28 3.2 ~ 3.6

Dai
---
done :
  - [2.28] 活动页改tab顺序
  - [2.27 ~ 2.28] CN日历框将可订的月提至最前显示
  - [2.28] 点击日历框价格预订统一增加loading
    last.4.14.js -> last.4.15.js
    router.4.13.js -> router.4.15.js
    fish.calendar.3.6.js -> fish.calendar.4.15.js
  - [2.28] 评估无线的抢购提醒功能何时可以用在10元抢购上
    http://10.1.200.37:8081/wrntest/jsp/alarmtest.html
    标题：客官！您的线路马上开抢！
    描述：赶紧点我进入页面，晚了就木有嘞~
  - [3.4] 抢购亲子专场（12点）
  - [3.1 ~ 3.5] CN订单中心 改版、个人信息安全显示规范问题



Lu
--
done:
- [2.27 ~ 2.28] TOUCH列表页筛选按钮：点击筛选按钮展开弹窗后，再次点击筛选按钮可以收起弹窗。

Du
--
- [3.5]【APP专题】华东一区赏花踏青APP专题
- [3.5]【APP专题】巴士二日游春季赏花特卖专题
- 【APP专题】华中赏花专题

done:
  - [3.2] 【PC专题】巴士二日游春季特卖专题
  - [2.28 ~ 3.2] 启程 踏青赏花专题APP
  - [3.3] 启程 踏青赏花H5宣传



Zhou
----
- [3.3 ~ 3.4] 周末卡PC二级页面迭代
- [3.5 ~ 3.6]周末卡APP购卡卡片详情页上线
done :
  - [2.27] 华南二区
  - [2.28 ~ 3.2] 包楼APP专题
  - [3.3 cancel] 亲子第十一期h5


未分配：
-------
  - 列表页景点筛选和目的地可排序
  - App专题、滑屏、手机站页面统一统计代码
  - 微信开发者模式[找需求人具体沟通]
  - [3.2] cn及touch保险增加出游人身份证填写[待确认需求]
  - [3.2] TOUCH下单页保险信息：增加受保人具体信息填写信息框[待确认需求]
  - 华南二区
  - 周末卡PC实体卡购卡页面添加地址填写功能
  - 【PC专题】赏花专题
  - 【APP专题】APP 运营部清肺之旅专题
  - [3.6]【APP专题】华北大区春节时令产品特推专题
  - [3.3] 尾房迭代
  - [3.4] 亲子app迭代


周总结：

# 1. 本周工作内容与工作进度总结

节后bug修复，终页优化。

# 2.本周工作中遇到的问题

节后人员不齐，人力吃紧。

# 3.本周收获

加入代码审查，团队代码质量有提高。

# 4.下周计划

订单中心重构；继续代码审查。



# 订单中心修改

## 列表页 http://10.1.56.59:8000/order/order_list.html

1. 外联 css,js 照抄
2. 网页主体结构（公共头、尾， 面包屑导航。）


## 详情页 http://10.1.56.59:8000/order/order_detail.html

1. 外联 css,js 照抄
2. 网页主体结构（公共头、尾， 面包屑导航。）
3. 增加了进度条.processbar
4. 区块标题有修改“订单详情”
5. 敏感信息外显。