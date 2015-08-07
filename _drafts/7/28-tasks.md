---
layout: post
title:  "第28周任务"
---

# 戴华

  - PC终页（除动态打包 7.23 ~ 7.24，动态打包 7.27 ~ 7.31）
    9.  1.终页“爸爸去哪儿3”标识位置调整,增加星级和说明
          - 标示位置不能调，会挡住标题
          - 添加相应的脚本样式
            <link rel="stylesheet" href="http://css.40017.cn/cn/min/??/cn/sl/common/hotel_star.css" />
            <script type="text/javascript" src="http://js.40017.cn/cn/min/??/cn/sl/common/hotel_star.js"></script>
          - 添加 html见页面
            终页 http://10.1.148.80:8000/last.html
            列表页 http://10.1.148.80:8000/list.html

        2.在推荐理由顶部增加宣传图和星级专题链接

        3.行程推荐部分，按照快乐童心的标准写个代码的模板"
          已提供给黄岛主，搞定。

    11. PC终页动态打包

  - done
    红包数据
    30. PC涉及到点评的相关改动（还有一些小bug待修复）
    41. 终页新增10元抢购入口（位置调整到套餐下面，信息量多时加hover效果）

  ## pc 抢购添加日历
    http://10.1.148.80:8000/last/last-snapping.html

    1. js
      - 升级到：
        snapping.1.1.js
        packages.1.10.js
      - 追加 <script src="http://js.40017.cn/cn/min/??/cn/sl/last/new/snapping-calendar.js"></script>
      - 添加配置项
        TCent.settings.snappingCalender = {
          url : {
            calendar : '/ajax/last/snapping/calendar.json?'
          }
        }
    2. 日历接口
      http://10.1.148.80:8000/ajax/last/snapping/calendar.json?routerid=1000&packageid=1001&comedate=2015-08

  ## app抢购 添加日历
    http://10.1.148.80:8100/snapping.html?memberid=123

    1. js,css 直接换成下面的
      <link rel="stylesheet" href="http://css.40017.cn/cn/min/??/cn/sl/snapping/base.wxcard.css,/touch/public/tab/0.0.2/tab.css,/touch/public/slider/0.0.1/slider.css,/touch/public/dialog/0.0.1/dialog.css,/touch/public/page/0.0.1/page.css,/touch/public/calendar/0.0.3/calendar.css,/cn/sl/snapping/snapping.34.0.css,/cn/sl/snapping/snapping-permission.24.0.css?v=2015010806" />
      <script type="text/javascript" src="http://js.40017.cn/cn/min/??/cn/sl/snapping/zepto.js,/touch/hb/c/bridge.1.1.0.js,/touch/public/tab/0.0.2/tab.js,/touch/public/slider/0.0.1/slider.js,/touch/public/dialog/0.0.1/dialog.js,/touch/public/page/0.0.1/page.js,/touch/public/calendar/0.0.3/calendar.js,/cn/sl/snapping/drupal.common.24.0.js,/touch/app/pub/public/getClientInfo.2.0.1.js,/cn/sl/snapping/snapping-permission.39.0.js,/cn/sl/snapping/snapping.39.0.js,/cn/sl/snapping/snapping-calendar.js,/cn/sl/snapping/favorites.33.0.js?v=2015061201"></script>

    2. 添加js配置项
      Drupal.settings.snappingCalendar

    3. html
      - <div class="page"> => <div id="mainPage">
      - 抢购元素添加进度条：
        .processbar-wrapper
      - 抢购元素添加一些属性：
        data-snapping-time-total="30000" 抢购总时间
        data-discount="7.1" 抢购折扣
    4. 日历接口跟pc一致。

  # 红包脚本事件

    首、列、终
    popover_redpacket.js => popover_redpacket.1.0.1.js

    首页红包弹屏
    redpacket-pop.js => redpacket-pop.1.0.1.js


  # 列表页点评数据异步 http://10.1.148.80:8000/list.html

    1. js
      routers_list.4.2.js => routers_list.4.3.js

    2. 异步
      http://10.1.148.80:8000/ajax/list/comments-count.json?routerids=100,101,102

    3. 添加js配置项
      TCent.settings.commentsCount

  #  终页新增10元抢购入口，位置改动

    router_snapping.5.5.js => router_snapping.5.5.1.js
    router_snapping.5.5.css => router_snapping.5.5.1.css

# 周倩

  - [7.23] 特卖新品诱惑专题
  - [7.24 ~ 7.27] 3. 小米生活独立投放专题 @卢茜
  - [7.28] 标签页
    29. 添加标签页A事件数据
    39. 标签页“其他城市”内首字母切换，手势图标由“光标”改为“手指”

# 杜荣璋

  - 亲子（pc相关筛选7.23 ~ 7.24，app筛选迭代 7.27 ~ 7.28）
    12. APP筛选功能迭代
    13. 添加快乐童心模块
    14. 景区、玩乐、出境游版块添加主题分类和IP切换功能
    15. 周边游、国内游版块添加主题分类和IP切换功能
    16. 幻灯广告分IP展示
    17. 幻灯广告样式修改
    18. 页面产品的项目排序：周边游、国内游、景点、当地玩乐、出境、邮轮
    19. 跟“星爸”过暑假，样式修改

# 谢晓阳

  - [7.23] 游品汇
  - 特卖（7.24 ~ 7.28，小鲜肉协助下。）
    21.【APP】秒杀未开始前加上提醒，首页和秒杀页都是
    22.【APP】新品诱惑子页面
    23.【APP】今日秒杀页面筛选项优化
    24.【APP】秒杀页面向上滑动返回特卖首页
    25.【APP】秒杀筛选无结果页面制作

# 陆中泽

  - 手机站（除续住增订7.23 ~ 7.24，续住增订 7.27 ~ 7.31）
    1. 定位的问题 ，用户手动切换城市后的gps定位问题
    2. 列表页用户选择丢失的问题，用户在选择的条件下二次进入产品页再返回出现用户丢失的情况（google 浏览器 小米生活等兼容性问题）
    26. 首页主题标签返回逻辑bug修复，线上是返回到大首页，应该是返回到周边游首页的
    27. 微信支付环境下增加一个浮沉提示。
    28. 首页发现位增加分割线。

# 邓加鹏

  - [7.23] 20.【APP】红包页面领取改成一栏形式，不要分两栏了

  - [7.24] PC列表
    33. 列表页搜索无结果，筛选无结果页面优化
    34. 列表页中的景点筛选可以按不同的景点主题分类
    35. 爸爸去哪儿专题生成那张海报，加点动画效果，直接放出来，太生硬了，用户容易忽略

  - done [7.27 ~ 7.31] 客栈
    36. 客栈touch首页
    37. 客栈touch定制列表页
    38. 客栈touch热门目的地城市筛选页


# 何正婷

  1. 前端HTML,CSS，工具入门
  2. 使用html，css，独立完成一个静态页面。


# 未分配
  - 后台直接开发
    4. 支付来源细分功能 @刘伟
    5. 部分退款可点评 @刘伟
    6. 手机站及PC订单中心屏蔽“无线抢购频道”订单退改入口 @黄鑫霞
    7. 列表页标签筛选“或关系”改成“与关系” @吴皓琦
    8. 将列表页的“今日可订”、周末有房的日期带到终页
       这个列表页中每条线路的链接添加?date=2017-07-23就行
    10. PC首页v4.1版本迭代。
    31. 景区页打包周边游产品
    32. 列表页筛选项全面优化



周总结：

# 1. 本周工作内容与工作进度总结

这周主要是抢购日历改版。

# 2.本周工作中遇到的问题

把任务分配变成了专人做专事。

# 3.本周收获

React技术有所掌握了。

# 4.下周计划

pc动态打包。