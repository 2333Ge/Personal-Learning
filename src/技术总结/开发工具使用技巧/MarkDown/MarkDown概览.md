# MARKDown 概览

[中文官网](http://markdown.p2hp.com/basic-syntax/#links)

## 实现锚点

### [方案一](#方案1)

```md
[方案一](#方案1)
<a id="方案1">测试</a>
```

### <a href="#方案二">测试 2</a>

```md
### <a href="#测试2">测试 2</a>

h
t
m
l
<a id="测试2">测试 2</a>
```

<a href="#方案二">方案</a>

h
t
m
l
<a id="测试2">测试 2</a>

### 锚点设置失败原因

- 必须全小写
- 空格用’-'代替
- ‘\_’ '()'需要去掉

# 参考文章

- [锚点设置](https://blog.csdn.net/wangzhibo666/article/details/88731227)
- [锚点失败原因](https://blog.csdn.net/u014563989/article/details/103056836)
