---
layout: post
title:  "js代码风格指南"
---

我一直有这样的一个想法，团队间成员的代码风格一致，并且我们编写的js能够自动生产开
发文档。今天，我就朝着这个想法来迈进一步。

## 代码风格

代码风格一致势必要有一套代码规范，而且这套规范应该是最佳实践，而不是教条主义。

### 缩进

永远使用两个空格作为缩进，这样会让你的代码在各个编辑器里看起来一致。如果你习惯使
用tab作为缩进，请将其绑定成等同于两个空格键。

例如在sublime text中可以这么设置：

{% highlight javascript %}
// Preferences => Settings - User
{
  // tab大小为2个
  "tab_size": 2,
  // 将tab转换成空格
  "translate_tabs_to_spaces": true
}

// 下面是sublime的最佳编写方案
{
  "color_scheme": "Packages/Color Scheme - Default/Monokai.tmTheme",
  "default_line_ending": "unix",
  "ensure_newline_at_eof_on_save": true,
  "fallback_encoding": "UTF-8",
  "ignored_packages":
  [
    "Vintage"
  ],
  "rulers":
  [
    80
  ],
  "shift_tab_unindent": true,
  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "trim_automatic_white_space": true,
  "trim_trailing_white_space_on_save": true,
  "use_tab_stops": true,
  "word_separators": "./\\()\"'-:,.;<>~!@#%^&*|+=[]{}`~?"
}
{% endhighlight %}




参考文档：
- [书写具备一致风格、通俗易懂 JavaScript 的原则](https://github.com/rwaldron/idiomatic.js/tree/master/translations/zh_CN)
- [Google JavaScript 编码规范指南](http://alloyteam.github.io/JX/doc/specification/google-javascript.xml)
- [JSDoc 语法](http://usejsdoc.org/)
- [JS文档生成工具：JSDoc 介绍](http://www.jianshu.com/p/6c49e2a0cebe)

