// 发布订阅模式

// A js事件
// ===============
// 订阅
$('body').on('cctv', function(event, data){
  console.log('cctv1:' + data)
});

// 发布
$('body').trigger('cctv', 'hello');

// 取消订阅
$('body').off('cctv');


// B jquery 插件
// ===============
// Creates a "named" logging function.
function createLogger(name) {
  return function(_, a, b) {
    // Skip the first argument (event object) but log the name and other args.
    console.log(name, a, b);
  };
}

// Subscribe to the "foo" topic (bind to the "foo" event, no namespace).
$.subscribe('foo', createLogger('foo'));
// Subscribe to the "foo.bar" topic (bind to the "foo" event, "bar" namespace).
$.subscribe('foo.bar', createLogger('foo.bar'));
// Subscribe to the "foo.baz" topic (bind to the "foo" event, "baz" namespace).
$.subscribe('foo.baz', createLogger('foo.baz'));

// Publish arbitrary values.
$.publish('foo', [1, 2]);
// logs:
// foo 1 2
// foo.bar 1 2
// foo.baz 1 2

$.publish('foo.bar', [3, 4]);
// logs:
// foo.bar 3 4

$.publish('foo.baz', [5, 6]);
// logs:
// foo.baz 5 6

$.unsubscribe('foo.bar');
$.publish('foo', [7, 8]);
// logs:
// foo 7 8
// foo.baz 7 8
