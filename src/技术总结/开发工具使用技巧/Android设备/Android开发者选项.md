# Android 开发者选项

概览可参考：http://www.oneplusbbs.com/thread-3968678-1.html

## 快捷设置开发者图块

将部分调试开关设置到通知栏

## 显示布局边界

显示剪辑边界、边距等

## HWUI 显示模式分析

https://developer.android.google.cn//studio/profile/inspect-gpu-rendering?hl=zh-cn

## 强制使用从右到左的布局

## 窗口动画缩放

慢放原生动画

## Winscope 跟踪

https://source.android.google.cn/devices/graphics/tracing-win-transitions

## 传感器已关闭

https://source.android.google.cn/devices/sensors/sensors-off

## 显示点按操作反馈

显示点按操作视觉反馈

## 指针位置

显示触摸坐标和轨迹

## 调试 GPU 过度绘制

当使用 GPU 绘图时，在屏幕上绘制不同的颜色来表明过度绘制的情况。过度绘制情况的好坏通过颜色来表示，从蓝色、绿色、淡红色到红色 ，分别代表从好到坏的渐变(1x 过度绘制、2x 过度绘制、3x 过度绘制和超过 4x 过度绘制)。界面上存在少量的淡红色可以接受，但如果存在较多的大红色就代表过度绘制有点严重了。畅玩总的来说还好，以正常色和蓝绿色居多，说明 GPU 很智能。突然发现“全部设置”和“常用设置”两个标题是深红色，过度绘制。。。

## 刘海屏

模拟刘海屏

## 功耗检测

显示帧率、刷新率等

# 参考资料

[1] https://source.android.google.cn/devices
