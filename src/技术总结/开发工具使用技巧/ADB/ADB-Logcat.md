# 官方链接

https://developer.android.google.cn/studio/command-line/logcat?hl=zh_cn

# 使用

## -b + 缓冲区

```
adb logcat -b all | grep "am_on_create.*{...activity}"
```

加载可供查看的备用日志缓冲区
请参阅[查看备用日志缓冲区](https://developer.android.google.cn/studio/command-line/logcat#alternativeBuffers)。

## grep 过滤

- Grep 过滤条件https://blog.csdn.net/f2006116/article/details/89077030

## -c

清除（清空）所选的缓冲区并退出。要清除所有缓冲区，请使用 -b all -c。

## -f <filename>

将日志消息输出写入 <filename>。默认值为 stdout。

该命令不起作用建议使用

```
Adb logcat >test
```

## 输出自指定时间以来的最新行。

```
adb logcat -t '01-26 20:52:41.820'
```

过滤日志输出

> 通过过滤器表达式，您可以向系统指明您感兴趣的标记/优先级组合，系统会针对指定的标记抑制其他消息。

- 过滤器表达式采用 `tag:priority ...` 格式
  - 其中 tag 指示您感兴趣的标记，
  - priority 指示可针对该标记报告的最低优先级。不低于指定优先级的标记的消息会写入日志。您可以在一个过滤器表达式中提供任意数量的 tag:priority 规范。一系列规范使用空格分隔。
