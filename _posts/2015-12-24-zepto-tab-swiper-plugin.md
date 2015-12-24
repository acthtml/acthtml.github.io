---
layout: post
title:  "一款tab滑动插件"
---

[demo](/assets/zepto.tabswiper.js/tabswiper.html)

{% highlight html %}

<div class="tab">
  <div class="tab-nav-box">
    <div class="tab-nav-wrapper">
      <ul class="tab-nav">
        <li>nav 1</li>
        <li>nav 2</li>
        <li>nav 3</li>
      </ul>
    </div>
  </div>
  <div class="tab-items-wrapper">
    <div class="tab-items">
      <div class="tab-item">item 1</div>
      <div class="tab-item">item 2</div>
      <div class="tab-item">item 3</div>
    </div>
  </div>
</div>

<script>
  var tabswiper = $('.tab').tabswiper({
    // 初始化完成回调
    afterInit: function(index, nav, item) {
      console.log('tab 初始化完成，现选中第' + (index + 1) + '个');
    },
    // 选择之前回调
    beforeSelect: function(index, nav, item) {
      // true为可选，false为不可选
      return true
    },
    // 选中之后回调
    afterSelect: function(index, nav, item) {
      console.log('tab已选中第' + (index + 1) + '个');
    }
  }).data('tabswiper');
</script>

{% endhighlight %}


