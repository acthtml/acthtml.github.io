---
layout: post
title:  "echarts使用指南"
---

[echarts](http://echarts.baidu.com.cn/)是百度图说团队出的一个图表插件，有多种[样式](http://echarts.baidu.com.cn/doc/example.html)
可供选择。使用起来也比较简单。

{% highlight html %}

 <div id="main"></div>
<script src="http://echarts.baidu.com/build/dist/echarts-all.js"></script>
<script>
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        ...
    }
    myChart.setOption(option);
</script>

{% endhighlight %}

其中``option``可以配置图表的样式和数据，可以在[案例列表](http://echarts.baidu.com.cn/doc/example.html)中找到对应的``option``。

[demo](/assets/echarts-guider/echarts.html)
