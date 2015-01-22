@todo
- nodejs
- markdown
- bower
- grunt
- jeklly
- jeklly + github
- polymer project
- php drupal
- ruby on rails
- pthon django

- angular js

#nodejs

语言分类：[知乎，语言的分类](http://www.zhihu.com/question/20124038)

1. 页面脚本：html,js,css,asp,php,xml
2. 解释型：ruby, python
3. 混合型：java, c#
4. 编译型
5. 汇编型

模块路径解析

- 内置模块
- node_modules目录
  - /home/user/node_modules/foo
  - /home/node_modules/foo
  - /node_modules/foo
- NODE_PATH环境变量
  - NODE_PATH=/home/user/lib:/home/lib

包（package）

- index.js
- package.json

命令行程序

    $ node /home/user/bin/node-echo.js hello world
    $ node-echo hello world

    1. 通过#!注释来指定脚本解释器
    #! /user/bin/env node
    2. 提升文件权限
    $ chmod +x /home/user/bin/node-echo.js
    3. PATH
    $ sudo ln -s /home/user/bin/node-echo.js /user/local/bin/node-echo

工程目录

    - /home/user/workspace/node-echo/ #工程目录
      - bin/
          node-echo
      + doc/
      - lib/
          echo.js
      - node_modules/
          + argv/
      + tests/
      package.json
      README.md

## npm

    // 下载、安装
    $ npm install argv
    $ npm install argv@0.0.1 -g

    // pcakges.json
    {
      "name" : "node-echo",
      "versioin" : "0.0.1",
      "dependencies" : {
        "argv" : "0.0.2"
      },
      "main" : "./lib/echo.js",
      "bin" : {
        "node-echo" : "./bin/node-echo"
      }
    }

    // 发布
    $ npm publish

## 代码的部署

- 文件操作
  - Buffer 数据块
  - Stream 数据流
  - File System 文件系统
  - Path 路径
- 网络操作
  - http
  - https
  - url,query
  - net
- 进程管理
  - process
  - child process
  - cluster
- 异步编程


# 开源世界旅行手册

版本号的控制

    2.6.27-2-i686
    主版本号.次版本号（偶数为稳定版本，奇数为测试版本）.修正版本 - 修补版本-目标架构

远程路径规则

    协议://用户名:密码@位置/路径:端口

软件文件夹结构

- bin 可执行文件
- etc 配置文件
- lib 库文件
- share 其他私有资源

文件类型信息

    $ ls -l
    > drwxr-x---
    第一列是文件类型:"-"是普通文件,"d"为文件夹...
    剩下的9个字符分成三组，分别属于归属用户、群组、其他用户对于该文件的权限(r可读, w可写, x可执行)

权限

root用户, su(switch user), su root

系统的目录结构

    /   根目录
    │
    ├boot/              启动文件。所有与系统启动有关的文件都保存在这里
    │    └grub/         Grub 引导器相关的文件
    │
    ├dev/               设备文件
    ├proc/              内核与进程镜像
    │
    ├mnt/               临时挂载
    ├media/             挂载媒体设备
    │
    ├root/              root用户 的 $HOME 目录
    ├home/
    │    ├user/         普通用户 的 $HOME 目录
    │    └.../
    │
    ├bin/               系统程序
    ├sbin/              管理员系统程序
    ├lib/               系统程序库文件
    ├etc/               系统程序和大部分应用程序的全局配置文件
    │   ├init.d/        SystemV 风格的启动脚本
    │   ├rcX.d/         SystemV 启动脚本的链接，定义运行级别
    │   ├rc.d/          BSD 风格的启动脚本
    │   ├rc.xxx         BSD 风格启动脚本，定义运行级别
    │   ├network/       网络配置文件
    │   ├X11/           图形界面配置文件
    │
    ├usr/
    │   ├bin/           应用程序
    │   ├sbin/          管理员应用程序
    │   ├lib/           应用程序库文件
    │   ├share/         应用程序资源文件
    │   ├src/           应用程序源代码
    │   ├local/
    │   │     ├soft/    用户程序
    │   │     └.../     通常使用单独文件夹
    │   ├X11R6/         图形界面系统
    │
    ├var/               动态数据
    │
    ├temp/              临时文件


# bower

管理项目所依赖的框架、包、组件。

    # 安装bower
    $ npm install -g bower
    # 安装包
    $ bower install <packages>
    # 搜索包
    $ bower search <packages>

# grunt

前端运行工具。提供代码的压缩、编译、单元测试甚至图片精灵等重复繁琐任务。

# Yeoman

搭前端原型的工具。列表可以初始化需要bootstrap的项目, 依赖bower和grunt。

# jelyll

支持markdown，动态生成静态网站。

安装jeklly需要如下环境：

- Ruby
- RubyGems
- Linux
- Nodejs

快速上手：

    ~ $ gem install jekyll
    ~ $ jekyll new my-awesome-site
    ~ $ cd my-awesome-site
    ~/my-awesome-site $ jekyll serve
    # => Now browse to http://localhost:4000

基本用法

    $ jekyll build
    # 将文件中内容生成到 ./_site 文件夹中
    $ jekyll serve
    # 快速部署夫妇器

任务优先级控制

现在人人都是pm，人人都下任务，人人都优先级最高，人人都截止日期今天。

我们这里开发吃不消，我们希望付出跟回报成正比。

我们现在基本上40%的时间在做各种专题、主题，可能带来的业务还不如包楼的10%（打个比方）。

所以，我们的任务比重应该跟业务带来的回报成正比，这样才有目标感。

要不/home.html下周我们来个需求会，确定下任务比重和该周期应该完成的任务。





