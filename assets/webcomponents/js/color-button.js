(function(){

  // 会变色的按钮 color-button
  var ColorButton = document.registerElement('color-button', {
    extends : 'button',
    prototype : $.extend(Object.create(HTMLElement.prototype), {
      createdCallback : function(){
        $(this).on('click', $.proxy(this.change, this));
      },

      change : function(){

        $(this).css({
          background : this.randomColor()
        })
      },

      randomColor : function(){
        return '#' + (Math.random() * 0xffffff << 0).toString(16);
      }
    })
  })

})();
