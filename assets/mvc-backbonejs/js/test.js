/**
 * @fileOverview test.js
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
      price : 0,
      city  : ''
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
        img   : data.ImageUrl,
        type  : data.SubTitle,
        age   : data.Description,
        days  : data.Days,
        price : data.AmountDirect,
        city  : data.CityName
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

  // Line View
  var LineView = Backbone.View.extend({
    tagName : 'li',
    template : _.template($('#template-line').html()),
    events : {
      'click' : 'go'
    },
    initialize : function(){
      this.listenTo(this.model, 'add', this.render);
    },
    render : function(){
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  // App View
  var AppView = Backbone.View.extend({
    el : $('.lines-list'),
    initialize : function(){
      var LinesList = new Lines;
      this.listenTo(LinesList, 'add', this.addOne);
      LinesList.fetch({data : {page:1}});
    },
    addOne : function(line){
      var view = new LineView({
        model : line
      });

      this.$el.append(view.render().el);
    }
  });

  var App = new AppView;
})();
