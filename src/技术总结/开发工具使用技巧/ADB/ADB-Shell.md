# 调用 Activity 管理器 (am)

在 adb shell 中，您可以使用 Activity 管理器 (am) 工具发出命令以执行各种系统操作，如启动 Activity、强行停止进程、广播 intent、修改设备屏幕属性，等等。在 shell 中，语法如下：

```
am command
```

您也可以直接从 adb 发出 Activity 管理器命令，无需进入远程 shell。例如：

```
adb shell am start -a android.intent.action.VIEW
```

# 启动 activity

```
adb shell am start -S -W 包名/启动类的全限定名
```

eg:

```
adb shell am start -S -W com.spruce.crm/com.spruce.crm.ui.activity.SplashActivity
```

# 选择不同设备

```
zhouliquan@zhouliquan:~$ adb devices
List of devices attached
7330cc21        device
0123456789ABCDEF        device

zhouliquan@zhouliquan:~$ adb -s 7330cc21 shell
msm8953_64:/ #
```
