# 一些代码片段

// OA论坛自动回帖。
// ===============
(function(){
  var timer = null,
      i = 0;

  function submit(){
    i ++;
    if(new Date().getTime() >= new Date('2015-05-29 14:00:00').getTime()){
      btnSubmit();
      clearTimeout(timer);
      console.log( i + '=> success');
      return;
    }

    console.log( i + '=> ' + new Date());
    timer = setTimeout(submit, 300);
  }

  submit();
})();



// 网页移动端全屏
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes" />
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true" />
<!-- UC应用模式 -->
<meta name="browsermode" content="application" />
<!-- QQ应用模式 -->


<!-- 允许二次分享 -->
<script type="text/javascript" src="http://js.40017.cn/cn/min/??/touch/app/pub/public/share.js?v=2015031701"></script>
<div style="display: none;">
    <input type="hidden" name="tcshareurl" id="tcshareurl" value="http://www.ly.com/zhuanti/saleseckill-zhejiang/" />
    <input type="hidden" name="tcshareimg" id="tcshareimg" value="http://img1.40017.cn/cn/sl/zzy_zhuanti/djp2015052201/share.jpg" />
    <input type="hidden" name="tcsharetext" id="tcsharetext" value="每日抢爆款，周边游酒+景特价套餐每日开秒，低至1折，限时限量等你来抢！ http://www.ly.com/zhuanti/saleseckill-zhejiang/" />
    <input type="hidden" name="tcDesc" value="每日抢爆款，周边游酒+景特价套餐每日开秒，低至1折，限时限量等你来抢！ http://www.ly.com/zhuanti/saleseckill-zhejiang/" />
</div>



强制网络资源以规定的格式执行，例如html格式一定以html格式执行，不能以脚本方式执行。
X-Content-Type-Options:nosniff
http://droidyue.com/blog/2014/09/27/refused-to-execute-script-from-because-its-mime-type-text-slash-plain-is-not-executable-and-strict-mime-type-checking-is-enabled/

/* 网页灰化处理 */
html{
  -webkit-filter: grayscale(100%); /* webkit */
  -moz-filter: grayscale(100%); /*firefox*/
  -ms-filter: grayscale(100%); /*ie9*/
  -o-filter: grayscale(100%); /*opera*/
  filter: grayscale(100%);
  filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  filter:gray; /*ie9- */
}


<!-- 无线HB调用 -->
http://10.1.200.37:8081/wrntest/jsp/all_navbar_test.html


<!-- 景区链接格式 -->
Drupal.client.is ? 'http://shouji.17u.cn/internal/scenery/details/$id' : 'http://m.ly.com/scenery/scenerydetail_$id_0_0.html'
<!-- 自助游链接格式 -->
Drupal.client.is ? 'http://shouji.17u.cn/internal/selftrip/details/$id/?tcwebtag=v414v' : 'http://m.ly.com/selftrip/line/$id'


<!-- 扫描地址 -->
http://www.ly.com/zizhuyou/CreateTwoDimensionCode.aspx?id=http://m.17u.cn/client/qr/26902982/ + encodeURIComponent(selftrip|details|%id)
http://www.ly.com/zizhuyou/CreateTwoDimensionCode.aspx?id=http://m.17u.cn/client/qr/26902982/ + encodeURIComponent(shouji.17u.cn|internal|selftrip|details|$id|?tcwebtag=v414v)


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


http://shouji.17u.cn/internal/share/weixin



## 手机登陆

if(!Drupal.client.mid){
  location.href = Drupal.client.is ? 'http://shouji.17u.cn/internal/login/' : 'path-to-touch-login'
}
