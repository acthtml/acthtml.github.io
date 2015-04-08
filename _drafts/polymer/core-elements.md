# polymer core elements 笔记

每个元素一句话一demo

## core-a11y-keys [demo](https://www.polymer-project.org/0.5/components/core-a11y-keys/demo.html)

用户键盘事件监控

    <core-a11y-keys target="{{}}" keys="up down left right" on-keys-pressed="{{arrowHandler}}"></core-a11y-keys>

## core-ajax, core-xhr [demo](https://www.polymer-project.org/0.5/components/core-ajax/demo.html)

处理ajax请求

    <core-ajax
      auto
      url=""
      handleAs="json"
      on-core-response="{{handleResponse}}"></core-ajax>

## core-seletor

元素像input:checkbox那样可被选中。

    <core-selector selected="0">
      <div name="1"></div>
      <div name="2"></div>
      <div name="3"></div>
    </core-selector>

## core-animated-pages [demo](https://www.polymer-project.org/0.5/components/core-animated-pages/demo.html)

选中其中的子元素作为呈现页面，并且在各个页面之间互相以动画过渡。

## core-meta [demo](https://www.polymer-project.org/0.5/components/core-meta/demo.html)

提供元数据的存数和分类能力，参考core-transition

    <core-meta id="my-element" label="My Element">
      <property name="color" value="blue"></property>
    </core-meta>

## core-transition [demo](https://www.polymer-project.org/0.5/components/core-transition/demo.html)

提供动画类库

    <!-- my-transition.html -->
    <polymer-element name="my-transition" attributes="">
      <script>
        Polymer({
          go : fucntion(node){
            node.style.transition = 'all 1 ease-out';
            node.style.opacity = 0;
          }
        });
      </script>
    </polymer-element>
    <my-transition id="my-fade-out"></my-transitoin>

    <!-- my-transition-demo.html -->
    <link rel="import" href="my-transition.html">
    <div id="animate"></div>
    <script>
      var meta = document.createElement('core-meta');
      meta.type = 'transition';
      var transition = meta.byId('my-fade-out');
      transition.go(document.querySelector('#animate'));
    </script>

## core-style

共享继承样式，提供样式双向绑定的能力

    <core-style></core-style>
