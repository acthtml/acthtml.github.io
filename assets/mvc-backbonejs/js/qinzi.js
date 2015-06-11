/**
 * 亲子
 */

(function(){

  // Line Model
  var Line = Backbone.Model.extend({
    defaults : {
      name  : '',
      desc  : '',
      img   : '',
      type  : '',
      age   : '',
      days  : '',
      price : 0
    },

    // 获取对于的url
    getUrl : function(){
      return 'path-to-' + this.id + '.html';
    },

    parse : function(data){
      return {
        id    : data.LineId,
        name  : data.LineMainTitle,
        desc  : data.WirelessTitle,
        img   : data.ImagePath,
        type  : data.SubTitle,
        age   : data.Description,
        days  : data.Days,
        price : data.AmountDirect
      };
    }
  })

  // Lines Collection
  var Lines = Backbone.Collection.extend({
    model : Line,

    parse : function(data){
      return data.lineList;
    },

    url : function(){
      return 'ajax/list.json'
    }
  });

  var Tab = Backbone.Model.extend({
    defaults : {}
  })
})();
