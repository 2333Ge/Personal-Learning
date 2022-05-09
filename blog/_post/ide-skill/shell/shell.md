---
title: Shell 概览
date: 2022-04-21
category: Shell
tags:
  - Shell
---

<!-- more -->
## 前言

https://b23.tv/9Xh3oaW

本文主要介绍日常操作中一些实用指令，如用终端快速查目标目录下中最大的几个文件。

因为只是抛砖，所以每个点都不不会太深入，如果有感觉实用的地方，建议根据备注的序号，在文末查看参考文章。

ps: 以下示例均在mac终端中运行，其他终端中可能会略有偏差。

## What is Shell

> Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。[1]

业界所说的Shell通常指Shell脚本

## 首先建议了解的技巧、概念

1. 如何快速查询指令及使用的方法：

- `man + 指令名`：查看系统中的指令帮助、配置文件等信息。如`man ls`

![](./image/man1.jpg)

- `tldr + 指令名`: 相比`man`更加简单，提供了更多的示例，安装及详细使用方式见[官网链接](https://hub.fastgit.org/tldr-pages/tldr)

![tldr](./image/tldr.svg)

- `任意内容 + Tab`: 自动补全指令，如输入`find -`，再点击Tab键会提示以下信息：

![tab](./image/tab1.jpg)

大部分的指令可通过上述方式在系统中查看更详细的说明。

2. 终端快捷键

终端中某些快捷键和Vim、编辑器快捷键相同，如`Ctrl A`，所以记住一些快捷键可多提升多处的开发体验
<!-- 同步其他文章 -->

```bash
Ctrl L # 清屏，把末尾行置顶，并不清空，等于终端输入`clear`
Cmd K  # 清屏，清空终端
Ctrl A # 光标移动至行开始
Ctrl E # 光标移至行末尾[8]
Ctrl K # 将光标以后的内容删除
Ctrl + R # 在历史命令中查找[8],比如之前某条命令执行失败，可通过此方式快速找到对应命令重新执行
```

1. 一些基础概念

- **标准输入、标准输出**：一个命令通常从一个叫标准输入的地方读取输入，默认情况下，这恰好是你的终端。同样，一个命令通常将其输出写入到标准输出，默认情况下，这也是你的终端。[11]
- **输入/输出重定向**：[11]
  - `>`: 输出重定向
  - `<`: 输入重定向
  - `>>`: 以追加的方式输出重定向
- **管道操作符`|`**: 处理前面一个指令传出的正确输出信息，并将其传入下一个指令
## 实用命令

<!-------------------无示例------------------------->
- `history`:显示历史执行过的命令
- `date`: 查看当前时间
- `touch`: 设置文件的修改和访问时间，如果没有对应文件将新建一个。
- `open`: 打开文件、目录或应用程序。`open .`: 在"访达（finder）"中打开当前文件夹。
- `curl`: 发出网络请求，然后得到和提取数据，显示在"标准输出"（stdout）上。[15]，各个选项含义可查看[阮一峰的blog][curl]，接口出现问题时，用此方法复现出问题的接口场景非常方便。
- `cp source_file target_file`: 文件拷贝。
<!-------------------组合示例------------------------->
- `cd`: 切换当前工作目录
```bash
$ cd ~  # 切换到当前用户根目录，等于直接输入`cd`
$ cd /  # 切换到所有用户共享的根目录
$ cd -  # 回到上一次的目录
```
- `pwd`: 查看终端当前所在路径
![cd](./image/cd.jpg)

- `echo`: 打印参数到标准输出
- `mv  源文件/文件夹  新文件/文件夹`: 为文件或目录改名、或将文件或目录移入其它位置
- `ls`:列出目录下的内容，`ls -l`: 查看当前目录下的所有文件及详细信息
- `cat`: 连接和打印文件，`cat  -n 文件`：打印文件内容，显示行号
- `du`:查看磁盘占用，`du -h 文件名`: 使用人类易读的单位打印文件磁盘占用（注意并不等于文件大小）。
```bash
$ echo "# Hello World" > hello.md
$ cat hello.md
# Hello World
$ mv -v hello.md hello2.md
hello.md -> hello2.md
$ du -h hello2.md
4.0K	hello2.md
$ ls -l
total 8
-rw-r--r--  1 ych  staff  14  5  7 11:42 hello2.md
```
<!-------------------单个示例------------------------->

- `xargs`:将标准输入转为命令行参数。一些命令不支持标准输入，只能直接在命令行输入参数，导致无法导致无法用管道命令传递参数[10]，此时可用`xargs`如：
```bash
$ echo "hello world" | echo
# 无输出
$ echo "hello world" | xargs echo
hello world
```
更详细的用法可参考[阮一峰大佬的博客](https://www.ruanyifeng.com/blog/2019/08/xargs-tutorial.html)

- `mkdir path/directory`: 创建新文件夹，`path`不存在或`directory`存在会抛出错误，`mkdir -p path/directory`:递归的创建一个某个目录，目录存在则跳过，不会抛出错误。

- `shellcheck yourscript`: 检查脚本是否有语法错误，[shellcheck工具安装](https://github.com/koalaman/shellcheck#from-your-terminal)
![](./image/shellcheck.png)

- `wc`: 计数行数、词数（换行符、空格符分割）、字节数。
 
```bash
wc [-clmw] [file ...]
-l  # 行数
-c  # 字节数
-w  # 词数
```
如：统计当前目录下文件数
```bash
$ find . -type f | wc -l
42
```
<!-- my question -->
为什么是4
```
$ echo aaa | wc -c
4
```
- `who`:显示登陆者和相关数据（进程信息，启动时间）
```bash
# 显示当前终端会话信息
$ who am i
ych      ttys002  May  6 18:10
# 显示所有可用信息，并展示表头
$ who -a -H
USER     LINE     WHEN         IDLE  	   PID	COMMENT
reboot   ~        May  4 17:41   .   	     1
ych      console  May  4 17:42  old  	   153
ych      ttys002  May  6 18:10   .   	 55852
...
```

- `head`: 输出文件的头部信息
```bash
# 输出文件的前几行：
$ head -n 行数 文件名
# 输出文件的前几个字节：
$ head -c 字节数 文件名
```

- `tail`: 输出文件的末尾信息
```bash
# 输出文件的末尾几行：
$  tail -n count path/to/file
# 输出开始至末尾count行
tail -n +count path/to/file
# 输出文件的末尾几个字节：
$ tail -c count path/to/file
```

- `diff`: 比较文件和目录

<!-------------------暂无示例------------------------->

<!-------------------详细示例------------------------->
- `find`:文件查找，`find 路径 -name 关键字`：在指定路径下以文件名查找文件
- `which  命令名`: 查看某个命令是否存在以及执行的位置
```bash
$ which npm
/Users/ych/.nvm/versions/node/v12.18.0/bin/npm
```
### `grep`

- `grep pattern 文件`：在给定的文件中，按行匹配`pattern`的内容，打印该行。

```bash
-i  # 忽略搜索字符串的大小写
-v  # 取反，输出不匹配pattern的那些文本行
-n  # 输出行号
-l  # 输出能匹配pattern的文件名
-c  # 输出匹配成功的行数
--exclude  # 排除需要搜索的文件
--exclude-dir # 排除需要搜索的目录
--include  # 指定需要搜索的文件
```

示例：打印test.md中以#开头的行及行号
```bash
grep -n "^#" test.md 
```
### `find`[9]

`find`:文件查找

**操作符**

- `-and`、`-a`: 与，一行中的两个语句隐含用`-a`连接，第一个语句为false则后面不再执行。
- `-or`、`-o`: 或
- `-not`、`!`: 非

```bash
expr1 -and expr2
# 等于
expr1 -a expr2
# 等于
expr1 expr2
```
**find常用参数**

某些情况可以指定数字类型的参数`n`为以下形式：

- `+n` 超过n
- `-n` 少于n
- `n`  等于n

```bash
# 以下参数中的 n均可以被 +n、-n替换
-amin n # 最后一次访问文件的时间大于、等于、小于n分钟
-size n[cwbkMG] # 文件使用空间大于、等于、小于n(cwbkMG)
	b # 512 字节
	c # 字节
	w # 双字节
	k # kb
	M # mb
	G # gb
-type # 查找某一类型的文件，诸如：
  b # 块设备文件。
  d # 目录。
  c # 字符设备文件。
  p # 管道文件。
  l # 符号链接文件。
  f # 普通文件
-name pattern # 基于文件名查找，可使用正则
-maxdepth levels # 在起点以下最多levels层目录下查找
```

**示例**

1. 查找当前目录下除了node_modules目录中的所有md文件

```bash
find . -name "*.md" -a ! -path "./node_modules/*"
```

2. 显示node_modules中所有大于1MB的文件

```bash
$ find node_modules ! -type d -size +1M | xargs du -h
 21M	node_modules/@sentry/cli/sentry-cli
1.7M	node_modules/react-native/node_modules/hermes-engine/osx-bin/hermesc
2.9M	node_modules/react-native/node_modules/hermes-engine/linux64-bin/hermesc
...
```

### `cut`

`cut`: 从标准输入或文件中剪切字段，每列序号从1开始

**选项**

```bash
cut -b list [-n] [file ...]
cut -c list [file ...]
cut -f list [-d delim] [-s] [file ...]

-b list  # list指定字节位置
-c list  # list指定字符位置
-d delim  # 用delim做字段分隔符
-f list  # 配合-d，指定哪一段用字段分隔符分割的字段，输出由一个分割符分割
```

**示例**

1. 上例「显示node_modules中所有大于1MB的文件」太长了，切掉重复的部分

```bash
$ find node_modules ! -type d -size +1M | cut -c 14-
prettier/esm/parser-flow.mjs
prettier/esm/parser-typescript.mjs
prettier/parser-flow.js
prettier/parser-typescript.js
prettier/index.js
leancloud-storage/dist/av-weapp-min.js.map
...
```

2. 处理一下`who`的数据，只打印已开启的终端名及启动时间

```
$ who -H                                 
USER     LINE     WHEN         
ych      console  May  4 17:42 
ych      ttys002  May  6 18:10 
ych      ttys003  May  6 18:10 
ych      ttys005  May  5 10:33 
ych      ttys006  May  5 10:36 
ych      ttys008  May  7 18:51

$ who -H | tr -s " " | cut -d " " -f 2,3-
LINE WHEN 
console May 4 17:42 
ttys002 May 6 18:10 
ttys003 May 6 18:10 
ttys005 May 5 10:33 
ttys006 May 5 10:36 
ttys008 May 7 18:51 
```

### `which`

`which`: 在 PATH 变量指定的路径中搜索某个系统命令的位置并且返回第一个搜索结果。也就是说使用 which 命令就可以看到某个系统命令是否存在以及执行的到底是哪一个位置的命令。[2]

```bash
$ which date
/bin/date

$ which npm
/Users/ych/.nvm/versions/node/v12.18.0/bin/npm

$ which which
which: shell built-in command # 内置命令
```

### `mv`

`mv`:为文件或目录改名、或将文件或目录移入其它位置。

`mv` 选项，可以在控制台输入 `mv -` + `Tab`键自动补全，查看可选项

```bash
# -f  -- 覆盖前不提示
# -i  -- 覆盖前提示
# -n  -- 不覆盖已存在的文件
# -v  -- 移动文件后显示文件名
$ mv -v mv.md mv2.md
mv.md -> mv2.md
```

### `tr`

`tr`: 将标准输入复制到标准输出，并替换或删除所选字符。

**选项**

```bash
tr [-Ccsu] string1 string2
-s string1 # 压缩输入中重复的string1

# string1 string2可以是如下形式
a-z、1-9 # 表示范围a-z、1-9
[c*n] # c代表的字符重复n次，仅在有string2时有效
[:class:] # class可为
    # alnum        字母、数字字符
    # alpha        字母字符
    # blank        空白符
    # cntrl        控制字符
    # digit        数字字符
    # graph        图形字符
    # lower        小写字符
    # phonogram    音标字符
    # print        可打印字符
    # punct        标点符号
    # rune         有效字符
    # space        空格字符
    # special      特殊字符
    # upper        大写字符
    # xdigit       十六进制字符
```

**示例**

1. 打印test.txt内容，将换行符号替换成空格
```bash
$ cat test.txt | tr -s "\n" " "
```
2. 打印PATH，换行使更易读

```bash
$ echo $PATH
/Users/ych/.nvm/versions/node/v12.18.0/bin:/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin...
$ echo $PATH | tr ':' '\n'
/Users/ych/.nvm/versions/node/v12.18.0/bin
/usr/local/bin
/usr/local/sbin
...
```
3. 小写字母转大写

```bash
$ echo hello | tr '[:lower:]' '[:upper:]'
HELLO
```

<!-- my question: 如何做任意字符串替换 -->
📢 注意：tr只进行字符一对一替换，字符长度不等的情况用tr可能不符和预期，如下，he并没有替换为ABCD
```bash
$ cat hello2.md
# hello world
$ tr 'he' 'ABCD' < hello2.md
# ABllo world
```

### `awk`

`awk`: 一种处理文件的通用编程语言。

## 通配符[5]

- `*`: 匹配0或任意个字符
- `?`: 匹配一个任意字符
- `[-]`: 匹配中括号的字符。例如[a-b]，匹配小写字母，只会匹配集合中的一个
- `[^]`: 匹配除了中括号的一个字符。例如[^0-9]，匹配除了数字的字符，只会匹配集合中的一个
- `{ab,ba}`: 匹配其中一个字符串。例如匹配ab或ba

```bash
# 打印所有以.sh结尾的文件
ls *.sh

# 打印所有以.md、.txt结尾的文件
ls *.{md,txt}

# 创建文件：touch1.md、touch4.md、touch3.md、touch5.md
touch touch{1,3,4,5}.md

touch  {f1,f2}/{a..e}.md # 等于 touch f1/a.md、f1/b.md、f1/c.md、f1/d.md、f1/e.md、f2/a.md、f2/b.md、f2/c.md、f2/d.md、f2/e.md、
```

## 变量

- `$?`: 从上一个命令中获取错误代码
- `$_`: 获取上一个命令的最后一个参数
- `$@`: 获取所有参数


## 命令分隔符

- `&&`: ...
- `||`: ...
- `;`: `true ; echo hello`: 都执行

## 示例


2. 显示本机IP

```bash
$ ifconfig en0 | grep inet --color=auto
	inet6 ...
	inet 10.6.... netmask 0xfffff800 broadcast 10.6....
# 等于
$ grep inet <(ifconfig en0) --color=auto
	inet6 ...
	inet 10.6.... netmask 0xfffff800 broadcast 10.6....
```

> en0: Ethernet 0，以太网接口 0，大多数情况en0是你的WIFI[6]

3. 删除本地测试分支

在开发的时候建立很多测试分支

```bash
$ git branch | grep "test-*" | xargs git branch -D
```

4. `>` + `echo`

```bash
$ echo hello > hello.txt
$ cat hello.txt
hello
# 等于
$ cat < hello.txt
hello
```
## 注意事项

### 输入字符串时注意事项

如希望创建一个名叫`hello world`的文件夹,不能
```bash
mkdir hello world
```
这样会创建两个文件夹，Hello和world

需要加转义符号或引号
```bash
mkdir hello\ world
# 或
mkdir "hello world"
```
其他用到字符的情况同理

## 参考文章
 
[1] [菜鸟教程-shell][linux-shell]  
[2] [which](https://www.cnblogs.com/MineGi/p/12631661.html)  
[3] [shell 管道命令](https://blog.csdn.net/olizxq/article/details/81263867)  
[4] [终端主题配置](https://sspai.com/post/53008)  
<!-- 配置失败？？ -->
[5] [Shell中的通配符](https://blog.csdn.net/u010467184/article/details/106117449)    
[6] [ifconfig 中的 en0、en1、p2p是什么](https://stackoverflow.com/questions/29958143/what-are-en0-en1-p2p-and-so-on-that-are-displayed-after-executing-ifconfig)  
[7] [shellcheck github](https://github.com/koalaman/shellcheck#from-your-terminal)  
[8] [常用的终端快捷键](https://blog.csdn.net/teng_liang/article/details/108165687)  
[9] [man find](https://manned.org/find)  
[10] [阮一峰的blog: xargs 命令教程](https://www.ruanyifeng.com/blog/2019/08/xargs-tutorial.html)  
[11] [菜鸟教程：Shell 输入/输出重定向](https://www.runoob.com/linux/linux-shell-io-redirections.html)  
[12] [mkdir](https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html#mkdir-invocation)
[13] [tr的用法讲解](https://blog.csdn.net/qq_26502245/article/details/108510149)
[14] [shell 中grep命令及常用语法](https://blog.csdn.net/wyqwilliam/article/details/83831947)
[15] [阮一峰的blog: curl 的用法指南][curl]
[16] [shell之cut详解][https://www.cnblogs.com/zmc60/p/15179793.html]


[linux-shell]:https://www.runoob.com/linux/linux-shell.html
[curl]:https://www.ruanyifeng.com/blog/2019/09/curl-reference.html

## 随记

- 输入`pwd`、`date`后系统做了什么
- echo `$PATH`, `$`加后面的变量，表示什么信息?系统变量？从什么地方读取的
- 待学习的指令：sort、source、diff、convert、patch、ifconfig、awk、expr
- 标准输入、标准输出
<!-- 什么是shell -->

<!-- curl 报错：证书？ssl?
curl: (60) SSL certificate problem: unable to get local issuer certificate -->