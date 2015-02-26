---
layout: post
title:  "春节"
---

# 删除春节皮肤

## pc首页

1. 去掉样式 home_chunjie.css
2. .top_search_bar 中去掉
    <div class="spring-lanleft"></div>
    <div class="spring-lanright"></div>
    <div class="spring-left">
      <img src="http://img1.40017.cn/cn/sl/home/2015/chunjie/sprleftbg.png" alt="">
    </div>
    <div class="spring-right">
      <img src="http://img1.40017.cn/cn/sl/home/2015/chunjie/sprrightbg.png" alt="">
    </div>

## pc终页

1. 去掉.page-notice





1.日历添加“除夕~初七”

终页、下单页 fish.calendar.3.6.js 刷新

2. 列表页 “春节预售”->“春节大促”标签（筛选、线路、斜条）

list.5.2.1.css -> list.5.2.3.css

3. 终页添加春节提示 http://10.1.56.59:8000/

    <p class="page-notice">春节旺季酒店房间紧张，为确保您顺利出行，请尽早预订支付。</p>
    <style>
      .page-notice{font:14px/30px "Microsoft Yahei"; color:#fff; background: #e23a4d; height: 30px; width:1200px; margin: 0 auto; text-align: center;}
      #page{padding-top: 10px;}
    </style>

4. 首页添加春节提示。http://10.1.56.59:8000/home.html

    <p class="page-notice">春节旺季酒店房间紧张，为确保您顺利出行，请尽早预订支付。</p>
    <style>
      .page-notice{font:16px/80px "Microsoft Yahei"; color:#fff; background: #e23a4d; height: 60px; width:1200px; margin: 0 auto; text-align: center;}
      #page{padding-top: 0;}
    </style>
