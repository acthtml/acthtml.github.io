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

  var List = new Lines();

  var o = {};
  _.extend(o, Backbone.Events);
  o.listenTo(List, 'add', function(e){
    console.log(e);
  });

  List.fetch({page:2});
})();
