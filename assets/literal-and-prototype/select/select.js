/**
 * @file select.js
 *
 * a jquery plugin example, four targets:
 *
 * - Just html, auto initialize.
 * - Import default properties from element's data.
 * - Bind obeject in element's data.
 * - Auto run the method when the settings is a string.
 */

(function() {

  function Select(wrapper, settings){
    this.wrapper = wrapper;
    return this.init(settings);
  }

  Select.prototype =  {
    // .select
    wrapper : null,
    // .option
    options : null,
    // .option.active
    selected : null,
    // is multiple
    multiple : false,
    // initialize
    init : function(settings){
      // Import default properties from element's data.
      $.extend(this, {}, this.wrapper.data(), settings)
      this.options = $('.option', this.wrapper);
      this.selected = $('.option.active', this.wrapper);

      // Bind events,
      var that = this;
      this.options.on('click', function(){
        var is_selected = $(this).hasClass('active');

        if(that.multiple){
          $(this).toggleClass('active');
        }else{
          that.options.removeClass('active');
          $(this).toggleClass('active', !is_selected)
        }

        that.selected = $('.option.active', that.wrapper);
      })
    },

    // Just a method example.
    say : function(){
      console.log('hello')
    }
  }

  // Add jquery plugin.
  $.fn.select = function(settings){
    this.each(function(){
      var instance = $(this).data('select');

      if(!instance){
        instance = new Select($(this),settings);
        $(this).data('select', instance);
      }

      // When the sttings is string, run the method.
      if(typeof settings == 'string') instance[settings]();
    });
    return this;
  }

  // Initialize plugin when dom ready.
  $('.select').select();
})();
