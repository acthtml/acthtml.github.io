/**
 * 亲子
 */

(function(){

// 筛选
var Tab = Backbone.model.extend({
  defaults : {
    index : 0,
    city : 0,
    type : 0,
    age : 0
  }
})


// 单条线路
var Line = Backbone.model.extend({
  defaults : function(){
    return {
      // 标题
      title : '',
      // 描述
      description : '',
      // 价格
      price : 0,
      // 城市
      city : '',
      // 游玩天数
      days : 0
    }
  },
  // 获取此线路的连接
  getLink : function(){
    return 'http://m.ly.com/selftrip/line/' + this.id + '/';
  }
});

})();
