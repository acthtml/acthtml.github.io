# 专题代码统计

每个专题需要添加如下代码：

    <!-- 专题追踪开始 -->
    <script>
      var track_settings = {
        // 页面类型
        pageType : 0,
        // 专题代码
        specialTopicCode : 0,
        // 线路产品id
        lineProductId : 0,
        // ip地址
        ip : '',
        // 平台id
        platformId : 0,
        ajax_type : 'jsonp',
        url : {
          // 统计
          go : 'ajax/track/go.json',
          // 获取ip
          ip : 'ajax/track/ip.json'
        }
      }
    </script>
    <script src="http://js.40017.cn/cn/min/??/cn/sl/touch/track.js?d=2015032501"></script>
    <!-- 专题追踪结束 -->


其中，track_router() 对 '.track-router-list a, .track-router' 中的href属性进行重写，追加了专题id（track_stcode=xxxx）。

如果专题的线路是异步过来的话，就必须手动调用track_router() 了。


表单提交track_stcode


# 手机站

http://172.16.2.38/hybrid/?p=236

(function(){

  var params = {
    "param": {
        "pagename":"h5_linelist(命名规则：h5_项目_页面)",
        "action":"load(默认)|exit|stop|restart",
    },
    "CBPluginName": "_tc_web_util",
    "CBTagName": "set_page"
  }

  window._tc_bridge_util && window._tc_bridge_util.set_page(params);
})();
