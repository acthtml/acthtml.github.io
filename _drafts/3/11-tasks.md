---
layout: post
title:  "第11周任务"
---
3.23 ~ 3.27（上传 3.24 3.26）

Dai
---
- [3.26 ~ 3.27] 10元改版PC
- 快速预订改版
- 查找会员id为undefined的情况。
done :
  - 手机站添加佟大为321弹层，公共@毛韫林
  - [3.27] 并且增加321弹层。
  - [3.23 ~ 3.24] 手机站添加抢购模块，底部追加客户端下载弹框。
  - [3.25] 订单中心改版+对接上线
  - 订单中心无效信息过滤。
  - 搜索页 他们正在搜 图标 @曹井荣
  - 清明快速预订 全售罄的进行隐藏 @范新美
  - pc分ip四弹框 http://www.ly.com/zizhuyou/shenzhen91/67496-xianlu/
    ip  深圳 广东 广州  珠海  时间：本周四到 3月31号
  - 订单中心支付。
Du
--
done :
- [3.23 ~ 3.26] 10元抢购改版

Lu
--
- [3.25 ~ 3.30] 列表页迭代
done :
  - [3.23 ~ 3.24] 周边游CN首页v4.0前端拼接

未分配
------
  - pc竞价列表页迭代
  - 周末卡PC二级页面迭代
  - 亲子pc迭代
  - pc终页迭代
  - 尾房app迭代
  - 预售pc
  - 尾房pc
  - 预售app
  - 赏花app改版
  - 包楼APP改版
  - 包楼pc改版
  - 赏花pc上线

  -【手机站竞价投放列表页】搜索框下部空白处，展示相关热门搜索以及热门景点目的地
  -【手机站竞价投放列表页】列表页外显线路内置标签，同APP列表页。
  -【手机站竞价投放列表页】搜索无结果时，推荐后台维护的线路
  -【手机站竞价投放列表页】屏蔽跟团游的线路
  - 手机站抢购线路详情页更改
  - 亲子第十一期h5
  - 亲子pc迭代
  - 包楼换头图pc
  - cn及touch保险增加出游人身份证填写
    TOUCH下单页保险信息：增加受保人具体信息填写信息框
    【下单页】添加“再添加一位出游人”按钮（具体修改方法见表2）
  - 周末卡PC实体卡购卡页面添加地址填写功能

  - 【PC专题】6山东烟台龙口南山（合并） 周一必须完成。


订单中心 @陆翔
--------------
http://10.1.40.186:8000/order/order_list.html

1. 普通订单接口少了订单的创建日期（createdDate） action -> actions
2. 新增 TCent.settings.tab 的脚本设置。



10元度周末。

http://61.155.159.100:8033/zizhuyou/seckill/SeckillLineListAPP.aspx?action=GetTenLineForJson&cityid=1&phaseid=42&time=2015-3-25 10:00:00&imgWidth=200&imgHeight=150

图片地址：ImgUrl
标题：SubTitle
描述：Features
心动价：LineMaxPrice
同程价：NetWorkPrice
折扣：LineMaxPrice / NetWorkPrice
城市名称：CityName
线路ID：LineId
线路地址（PC)：LineUrl
线路地址（APP)：http://www.ly.com/zizhuyou/tripdetail-线路ID.html


http://61.155.159.100:8033/zizhuyou/seckill/SeckillLineListAPP.aspx?action=SearchSeckillLineByKWForPC&phaseid=25&&keyword=%E5%8F%8C11&iid=0.4887744502630085


http://61.155.159.100:8033/zizhuyou/seckill/SeckillLineListAPP.aspx?action=GetTenLineForJson&cityid=226&time=2015-4-1+11%3A00%3A00&pageindex=1&phaseid=43&_=1427338671306&callback=jsonp2
http://61.155.159.100:8033/zizhuyou/seckill/SeckillLineListAPP.aspx?action=SearchSeckillLineByKWForPC&phaseid=43&callback=jsonp2&keyword=%E7%BA%BF


周总结：

# 1. 本周工作内容与工作进度总结

本周主要跟踪几个大的任务，终页，10元的改版。控制任务数量，保证质量。

# 2.本周工作中遇到的问题

任务较大，分摊出去需要做好质量跟踪。

# 3.本周收获

成员慢慢可以承担起来。

# 4.下周计划

关注架构，代码审查。
