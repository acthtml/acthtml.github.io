---
layout: post
title:  "sublime 和 git"
---

## sublime

sublime编辑器做到了快、跨平台、可扩展，不仅仅可以作为前端的开发工具，其他开发像
php、ruby、python也完全能胜任。再加上一些第三方插件，可以比拟IDE([插件的安装方法](https://sublime.wbond.net/installation))

目前，我离不开的：

- emment [快速书写html+css](http://blog.wpjam.com/m/emmet/)
- HTML-CSS-JS-Pretty 格式化工具
- SublimeGit sublime的git插件，支持git全功能。安装好插件就调用sublimegit:document
  就能看到文档。

## git

git的基本原理在这里[Pro Git（中文版）](http://git.oschina.net/progit/)，这里我列
一下基本用法，详细的需要在刚才提到的教程中找到。

- `git status` 查看当前分支的
- `git add` 将内容添加的缓存区
- `git commit` 将缓存区的内容添加在本地服务器
- `git branch` 管理分支
  - 创建分支 `git branch <branch-name>`
  - 删除分支 `git branch -D <branch-name>`
  - 删除远程分支 `git push --delete <branch-name>`
- `git checkout` 切换分支/签出某个文件
  - 切换分支 `git checkout <branch-name>`
  - 在本地切换到远程分支 `git checkout -b <local-branchname> <origin/remote_branchname>`
- `git push` 将本地服务器的内容推送的远程服务器
  - 将本地修改推送到远程 `git push`（当push.default设置是matching则是把本地的
    所有分支都会推送到远程，simple则只把当前分支。）
  - 删除远程分支、标签
- `git pull` 将远程服务器的内容拉到本地
- 标签管理
  - 删除远程标签 `git push origin --delete tag <tagname>`
  - 删除本地标签 `git tag -d <tagname>`


## git flow

[git flow](http://www.basecss.net/article/install-git-flow-in-windows.html)是git
工作流程。先来看看我们在无git时遇到的问题：

- 我们正在开发，线上正好有一个bug需要修复，但是这个bug与我们正在开发的代码冲突。
- 多个人需要同时开发不同的功能，如果在同一个代码环境又互相冲突。例如同一页面中同
  时开发多个功能。

来看看git flow怎么解决的。git flow将代码环境分成两个主分支：

- master主分支，始终跟线上环境一模一样的。
- develop开发分支，最稳当的开发版本，时刻准备着发布到线上。

但是这样还不够，还有下面这三条辅助分支

- feature/xxx 特性分支，开发新特性用的，从develop分支中衍生出来，开发好之后会合并
  到develop分支，等待发布。
- hotfix/xxx 热点修复分支，从master分支中衍生出来，修复线上的bug专用。开发好之后
  合并到master分支和develop分支
- realse/xxx 发布分支，从develop分支衍生出来，最后合并到master分支。用于将最新稳
  定的开发版本发布到线上。

下面是git flow的常用命令

- git flow init 初始化，第一次用需要初始化
- git flow feature start new-home 开始开发一个新特性，例如这里开发一个新首页，我
  命名为new-home，使用这个命令会自动新建一个名为feature/new-home的分支。
- git flow feature finish new-home 新首页开发完毕，使用这条命令自动会将这条分支
  合并到develop分支，并且自动删除分支feature/new-home
- git flow realse start 4.0 / git flow realse finish 4.0 开发到一定阶段就要发布
  到线上了。这条命令就是将develop分支合并到master分支，并且添加一个名为4.0的tag。
- git flow hotfix start 4.0.1 线上需要修复bug，使用这条命令。这里会自动生成一条从
  master上衍生而来的分支,名为hotfix/4.0.1。等你修复好之后，使用git flow hotfix finish 4.0.1 。
  git自动会将这条分支（hotfix/4.0.1）合并到master，并且给当前master添加一个名为
  4.0.1的tag。


## sublime & git

安装sublimeGit插件，让上面的一切git操作集成到sublime中。

对于windows，你需要配置其git和git flow的路径：

{% highlight javascript %}
{
  "git_executables": {
    "git": [ "D:/Program Files (x86)/Git/bin/git.exe"],
    "git_flow": ["D:/Program Files (x86)/Git/bin/git.exe", "flow"]
  }
}
{% endhighlight %}

并且你需要将C:/用户/你的用户名/.ssh中的文件复制到 /你的Git安装目录/.ssh中，这样就
能使用sublime中的git push&pull操作了。
