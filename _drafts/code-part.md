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
