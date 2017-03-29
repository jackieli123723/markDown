title: 龙渊数据平台的前端架构+Git使用
speaker: zhuowenli
url: http://lilidong.cn
transition: move
files: /css/ppt.css
theme: moon
usemathjax: yes

[slide]
## 龙渊数据平台前端架构+Git使用
## &nbsp;
######　作者: 李立冬  (平台研发中心web前端工程师)



[slide]

## 为什么要前后端分离？
----
* 前后端分离，工程师各司其职 {:&.rollIn}
* 前端负责交互和呈现，后端提供数据接口
* 团队开发协作的效率
* 前端的性能优化



[slide]
## 前后端分离实现

- 前端：负责View和Controller层
- 后端：负责Model层，业务处理/数据等

![](/img/ajax.png)

[slide]

## 技术选型

> 最近几年比较热门的mv*框架，AngularJS React Vue Ember BackboneJS 等等，前端技术更新频率太快，那么前端框架那么多，如何才能挑选出最适合团队开发技术栈？

----
* 技术：语言、框架、工具、设计、开发模式等 {:&.rollIn}
* 业务：解决业务开发中遇到的技术瓶和需求
* 个人：依赖个人的学习能力

[slide]

## 数据平台前后端分离架构
-----
<div class="columns5">
    <img src="/img/fis.svg" >
    <img src="/img/less.svg" >
    <img src="/img/node.svg" >
    <img src="/img/git.svg" >
    <img src="/img/java.svg" >
</div>

- 前端技术选型：
   -  Fis+Jello+less+Node+Git
- 后端选型：
  - 基于Java Velocity

[slide]

## 项目结构示意
----
```bash
 longyuan-data-front
  ├─components # 公用的第三方库，如jquery，zepto
  ├─page # 每个页面的模块（每个文件的构成如home.less hom.vm home.js,home.tmpl）
  │  └─home
  │      └─home.less # 单独路由私有less
  │      └─home.vm # Velocity模板 同步或者异步数据渲染
  │      └─home.js # 单独路由js模块
  │      └─home.tmpl # js异步文件模板 
  ├─static # 静态资源
  │  ├─base # js模块化库
  │  ├─css #页面的公用less 模块，字体文件，公用配置等等
  │  ├─images #图片资源
  │  └─libs #自定义的js模块（module.exports暴露需要的函数，变量或者对象）
  │  favicon.png #网站左上角图标
  ├─test # 放fis的调试json文件，用于本地开发，不上线
  │  └─data
  │      └─xxx # xxx.json （mock数据）异步数据
  │  └─page
  │      └─xxx # page同步数据 同层级的目录 如home.json
  ├─widget # 公用的模板（如公用的头部，版权信息等等,可灵活组合）
  │  └─header
  │      └─xxx # 模板
  ├─component.json # dependencies（类似npm的package.json）
  ├─.gitignore # git配置文件
  ├─fis-conf.js # 配置文件
  ├─api.doc # 后端接口说明文档（后端维护）
  ├─README.md # 开发说明
  └─server.conf # 路由中转 （正则来匹配）
```
[slide]


## 解决哪些问题
> FIS是专为解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题的工具框架。

#### &nbsp;
![](/img/question.JPG)

[slide]
## 如何编译
1. 安装 jello
    ```
    npm install -g jello@1.0.3
    ```
2. 安装插件
    ```
    npm install -g fis-parser-marked
    npm install -g fis-parser-utc
    npm install -g fis-parser-less
    npm install -g fis-packager-depscombine
    npm install -g fis-postprocessor-amd
    npm install -g fis-preprocessor-cssprefixer
    npm install -g fis-postpackager-simple
    ```
3. 进入当前目录后发布代码
    ```
    jello server start //启动本地开
    jello release -w   //开发环境
    ```
4. 自动打开浏览器预览页面
5. 进入当前目录后发布代码
    ```
    jello release -omp //部署时 -o:压缩 -m:文件做md5 -p:打包
    jello server open  //打开打包的目录
    ```
[slide]


## 配置文档fis-conf.js

1. 配置amd编译

    ```
    fis.config.set('modules.postprocessor.vm', 'amd');
    fis.config.set('modules.postprocessor.js', 'amd');
    fis.config.set('settings.postprocessor.amd', {packages: [{name: 'libs',location: 'static/libs/', main: 'index'}]});

    ```

2. 配置less和autoprefixe

    ```
   fis.config.set('settings.parser.less.include_paths', ['./static/css']);
   fis.config.set('settings.preprocessor.cssprefixer.browsers', ["iOS >= 3.2"....]);
   fis.config.set('modules.parser.less', 'less');
    ```

3. pack打包和merge整合（[更多配置](https://github.com/fis-dev/fis/wiki/%E9%85%8D%E7%BD%AEAPI#pack)）

    ```
   fis.config.set('pack', {                           
  'css/common.css': [
    'components/**.css',
    'components/**.less',
    'static/css/*.css',
    'widget/**.css',
    'widget/**.less',
  ]
   
    ```
[slide]

## 使用
1. 进入server.conf配置对应页面路由

    ```
    rewrite ^\/app\/gameBasic\/gameBasicView.do$ /page/gameBasicView/gameBasicView
    ```

2. vm模板的资源引入编译

    ```html
    #extends("/page/layout/gameLayout.vm")
    ## 相同目录的同名css/less/js会自动引入，所以这两句可以不用写的
    #require("/static/css/base.less")
    #require("/static/css/main.less")
    #require("/static/css/home.less")
    #block("content")
     <div class="code">your code.......</div>
    #end  

    #require("static/libs/common.js") ##由于commonjs是全局非模块化的，需要这样加载
    #script()
    require(["./gameBasicView"], function(gameBasicView) {
    });
    #end
    ## 需要依赖一下自己，否则该vm中依赖没法自动加载进来。
    #require("./gameBasicView.vm")
    #end
    ```

3. 打开本地开发环境对应端口和路由

[slide]


### 模板数据绑定
    
1. test/page/gameBasicView.json

  ```json
  {
      "appId": "289ee05803487e57",
      "appName": "巨龙之战"
  }
  ```

2. page/gameBasicView/gameBasicView.vm

  ```velocity
  <h1>$appId</h1>
  <h2>$appName</h2>
  ```
4. 输出结果

  ```html
  <h1>289ee05803487e57</h1>
  <h2>巨龙之战</h2>
  ```
[slide]

### 编译对应js模块
1. page/gameBasicView/gameBasicView.js

  ```js
var $ = require('jquery');
var pickerDateRange = require("libs/dateRange")
var echarts = require("libs/echarts")
var theme = require("libs/theme")
echarts.registerTheme('macarons',theme) 
var resultTableObjAll = require("libs/config")
...
  ```

2. 编译后：AMD模块

  ```js
  define('page/gameBasicView/gameBasicView',['require', 'exports', 'module', "components/jquery",....], function(require, exports, module) {
var $ = require('jquery');
var pickerDateRange = require("libs/dateRange")
var echarts = require("libs/echarts")
var theme = require("libs/theme")
echarts.registerTheme('macarons',theme) 
var resultTableObjAll = require("libs/config")
  })

  ```

[slide]

## 效果

![](/img/home.png)

[slide]

## 善于运用工具来处理前端工程性问题

[slide]

### 市面上主要的css预处理器：Less\Sass\Stylus
---
| Less | Sass | Stylus
:-------|:------:|-------:|--------
环境 |js/nodejs | Ruby(这列右对齐) | nodejs(高亮) {:.highlight}
扩展名 | .less | .scss/.sass | .styl
特点 | 老牌，用户多，支持js解析 | 功能全，有成型框架，发展快 | 语法多样，小众，未来趋势
案例/框架 | [Bootstrap](http://getbootstrap.com/) | [Compass](http://beta.compass-style.org) [Bootstrap](http://getbootstrap.com/css/#sass) [Foundation](http://foundation.zurb.com/) [Bourbon](http://bourbon.io) [Base.Sass](https://github.com/jsw0528/base.sass) |

[slide]

## 举个例子

![](/img/eg.jpg)

[slide]

## Sass

<div class="columns-2">
    <pre>
        <code class="scss">
@mixin table-scaffolding {
    th {
        text-align: center;
        font-weight: bold;
    }
    td, th { padding: 2px; }
}

@mixin left($dist:2px) {
    float: left;
    margin-left: $dist;
}

#data {
    @include left(10px);
    @include transition(all 0.3s ease);
    @include table-scaffolding;
}
        </code>
    </pre>
    <pre>
        <code class="css">
#data{
    float: left;
    margin-left: 10px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

#data th {
    text-align: center;
    font-weight: bold;
}

#data td, #data th {
    padding: 2px;
}



</code>
    </pre>
</div>

[slide]


<div class="columns">
    <pre>
        <code class="less">
 // Variables variables.less
@gray-base:#000;
@gray-dark:lighten(@gray-base, 20%);// #333
// Mixins mixins.less
.transition-all() {
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
}
.serif-font() {
    font-family: 'Lora', 'Times New Roman', serif;
}
.clearfix() {
    &:before,
    &:after {
        display: table;
        content: "";
    }
    &:after {
        clear: both;
    }
}
.clearfix(){
    *zoom: 1;
}

.size(@wdith, @height) {
    width: @wdith;
    height: @height;
}
        </code>
    </pre>
</div>

[slide]

## Less

<div class="columns-2">
    <pre>
        <code class="scss">
@import "variables.less";
@import "mixins.less";

body {
    .serif-font;
    font-size: 20px;
    color: @gray-dark;
    color:red;
}

.container {
   .transition-all();
   .clearfix;
   .size(100px,100px);
   color:red;
   font-size:14px;
   border: 1px solid;

}
        </code>
    </pre>
    <pre>
        <code class="css">
body {
  font-family: 'Lora', 'Times New Roman', serif;
  font-size: 20px;
  color: #333333;
  color: red;
}
.container {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  *zoom: 1;
  width: 100px;
  height: 100px;
  color: red;
  font-size: 14px;
  border: 1px solid;
}
.container:before,
.container:after {
  display: table;
  content: "";
}
.container:after {
  clear: both;
}
</code>
    </pre>
</div>

[slide]

>  koala是一个前端预处理器语言图形编译工具，支持Less、Sass、Compass、CoffeeScript，帮助web开发者更高效地使用它们进行开发。跨平台运行，完美兼容windows、linux、mac。关键特性多语言支持 支持Less、Sass

###### &nbsp;
![](/img/koala.png)

[slide]

## 工具实现实时编译

![](/img/demo-less.gif)

[slide]

## 借助nodejs环境模块

- node：<span class="red">npm install -g less </span>
- gulp：<span class="red">npm install -g gulp-less</span>
- grunt: <span class="red">install -g grunt-contrib-less</span>
- webpack: <span class="red">module loaders</span>

[slide]

## git简介
<div class="context-text">
  git是最优秀的<span class="red">分布式版本控制</span>管理系统，相对于集中式的管理方式如SVN等,每个人都可以从中心版本中克隆代码到本地，拷贝一个完整的git仓库，以<span class="green">多分支</span>的形式进行各种<span class="red">合作开发</span>
</div>
[slide]

## git常用开发使用指南
----
* git仓库 {:&.rollIn}
* 分支管理
* 文件管理
* 版本回退
* 定位管理
[slide]


## 团队协作git版本控制
- Workspace：<span class="green">工作区</span>
- Index / Stage：<span class="green">暂存区</span>
- Repository：<span class="green">仓库区（或本地仓库）</span>
- Remote：<span class="green">远程仓库</span>
[slide]

## 工作原理
![](/img/git-point.png)
[slide]


##### 检查本机是否有ssh key

```
  $ cd ~/.ssh
  $ ls
  jackieli@DESKTOP-7P9ISK2 ~
  $ cd ~/.ssh
  jackieli@DESKTOP-7P9ISK2 ~/.ssh
  $ ls
  id_rsa  id_rsa.pub  known_hosts
  jackieli@DESKTOP-7P9ISK2 ~/.ssh
  $ vim id_rsa
  jackieli@DESKTOP-7P9ISK2 ~/.ssh
  $ vim id_rsa.pub
```
查看是否存在`id_rsa`和`id_rsa.pub`文件

[slide]

#### 生成新的ssh key

```
$ ssh-keygen -t rsa -C "<your_email@youremail.com>"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/jackieli/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

![](/img/git-ssh.png)

###### &nbsp;
###### 用文本编辑器打开“id_rsa.pub”文件，复制内容到gitlab个人设置中ssh密钥中
[slide]

##### 配置代码仓库用户名和邮箱
```
$ git config --global user.name "Jackieli"
$ git config --global user.email lilidong@ilongyuan.com.cn
```

![](/img/git-ok.png)

[slide]

## 创建项目 
```
$ mkdir longyuan-data-front
$ cd longyuan-data-front
$ git init
```
[slide]
## 检出仓库
```
$ git clone 仓库代码地址
```
  [slide]

## 分支
```
$ git branch 名字
```
----
* master 为正式环境稳定代码 
* onlineTest 为测试环境代码
* 还可根据需求建立bugfix 或者其他分支。根据项目人员的开发角色灵活设置每个人维护的分支
* 分支有本地分支和远程分支（ dev/origin ） 
* 切换分支 

```
$ git checkout [branch]
```

![](/img/git-branch.png)

[slide]

## 添加和提交
<div class="left">添加到暂存库</div>

```
$ git add * (--all)
```

<div class="left">提交改动至版本库</div>
```
$ git commit -am "代码提交信息注释"
```
[slide]

## 合并分支
----
* 合并其他分支到你的当前分支 
```
$ git merge <branch>
```

* 合并分支时git会尝试去自动合并改动，当无法解决冲突时必须手动解决冲突后再提交。
可以使用下面的命令查看冲突的文件

```
$ git status
```

<div class="left">在<span class="red">合并改动</span>之前，你可以使用如下命令</div>
```
$ git diff <source_branch> <target_branch>
```
  [slide]

## 推送和拉取
<div class="left">推送指定分支到远程仓库</div>

```
$ git push [remote] [branch]`
```

<div class="left">拉取远程仓库的更新</div>

```
$ git pull
```
[slide]

## 版本回退
<div class="left">已经使用git add 添加到仓库的文件，想要使得它回到add 之前</div>

```
$ git reset HEAD <file name>
```

<div class="left">对于每次commit的log记录，想回退到某一个log的时候并且保留当前修改(放弃之后的修改加--hard)</div>
```
$ git reset <commit id>
$ git reset --hard <commit id>
```
[slide]

## 定位管理
<div class="left"><span class="red">定位负责人</span>，查看文件的每个部分是谁修改的</div>

```
$ git blame <file>
```

<div class="left">会显示出每一行修改的人</div>
<div class="left">尤其是在发现了错误代码的情况下或者不规范使用合并代码，责任制清楚明了,想抵赖都没门~~~~~</div>


[slide]

      <h1>Q&amp;A</h1>
![](/img/qa.jpg)
[slide]

<div class="left">获取课件代码</div>
```
$ git clone https://github.com/jackieli123723/longyuan-data-front-ppt.git
```

<div class="left">个人博客</div>
```
http://lilidong.cn
```
