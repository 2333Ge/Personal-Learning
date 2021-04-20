# changelog 生成

## 参考资料

[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

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
