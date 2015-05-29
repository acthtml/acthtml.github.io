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
