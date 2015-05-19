/**
 * @fileOverview book.js
 *
 * 下单页
 */

(function(){

  // 配置项
  require.config({
    // 基准配置项，模块js的路径都是相对基准路径的
    baseUrl : 'js/lib',
    // 不在基准目录下的可以用下面这种方式，例如以“app”开头的模块在基准目录的../app下。
    paths :{
      'app' : '../app'
    },
    // 加载非AMD规范的模块
    shim : {
      'jquery.pubsub' : 'ba-tiny-pubsub'
    }
  })

  require(['jquery', 'app/book'], function($, book){
    $('.hotel input').on('change', function(){
      book.setHotelDate($(this).val());
    })

    $('.scenery input').on('change', function(){
      book.setSceneryDate($(this).val());
    })

    // submit
    $('.submit').on('click', book.submit)
  })
})();
