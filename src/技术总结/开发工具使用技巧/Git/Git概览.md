- changelog 生成

[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

- 国内访问github
```
域名https://github.com/ 换成 https://hub.fastgit.org/
```

[参考资料](https://www.kejihub.com/5833.html)

# 实用命令

- 查看对应指令帮助

```js
~-help;
```

eg:

```
git branch -help
```

- Git branch
  查看当前分支

```
git branch --show-current
```

- 新建并切换分支

```
git checkout -b + 分支
```

- 误操作后的恢复(有 commit 日志)

```
git log -g
git branch <分支> commitId // 用对应日志建立新分支
```

# 命令简写

|      完整      |  简写   |
| :------------: | :-----: |
| git commit -m  | git cm  |
| git commit -am | git acm |
