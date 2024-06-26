---
title: 前端常用单位说明
date: 2022-01-01
category: FE
tags:
  - FE
---

<!-- more -->
## 英寸

1 英寸 = 2.54 厘米

```math
1 inch = 2.54cm = 25.4mm
```

## 屏幕尺寸

如屏幕尺寸 5.2 英寸表示屏幕对角线长度 5.2 英寸

## 像素

表示计算机屏幕上能显示的最小单位，像素没有实际物理尺寸的

## （物理）分辨率

指已知屏幕上的像素块个数

如：1920\*1080：竖向 1920 个像素块，横向 1080 个像素块

硬件支持

## 逻辑分辨率(ios)

和上诉概念相似，软件使用

## 屏幕像素密度

1 英寸屏幕对角线上拥有的像素数

```math
ppi = √(横向像素²+纵向像素²)/屏幕尺寸
```

## 长度单位

- px：pixel，像素，电子屏幕上组成一幅图画或照片的最基本单元
<!-- - pt: point，点，印刷行业常用单位，等于 1/72 英寸（逻辑像素点？？） -->
- ppi: pixel per inch，每英寸像素数，该值越高，则屏幕越细腻
- dpi: dot per inch，每英寸多少点，该值越高，则图片越细腻
- dp(或：dip): dip，Density-independent pixel, 是安卓开发用的长度单位，1dp 表示在屏幕像素点密度为 160ppi 时 1px 长度
- sp: scale-independent pixel，安卓开发用的字体大小单位。
  > sp 和 dp 很类似但唯一的区别是，Android 系统允许用户自定义文字尺寸大小（小、正常、大、超大等等），当文字尺寸是“正常”时 1sp=1dp=0.00625 英寸，而当文字尺寸是“大”或“超大”时，1sp>1dp=0.00625 英寸。类似我们在 windows 里调整字体尺寸以后的效果——窗口大小不变，只有文字大小改变。
- in:英寸
- mm: 毫米

## 参考文章

[1] [屏幕尺寸，分辨率，像素，PPI 之间到底什么关系？](http://www.woshipm.com/ucd/198774.html)  
[2] [iPhone 屏幕分辨率和适配规则（基础篇）](https://www.jianshu.com/p/41a8ccdf91ed)  
[3] [逻辑分辨率和物理分辨率区别](https://www.zhihu.com/question/40506180 )  
[4] [什么是 dp、pt、sp？](https://zhuanlan.zhihu.com/p/26481853)
[5] [css的值与单位--mdn(推荐)](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)  
[6] [屏幕兼容性概览](https://developer.android.com/guide/practices/screens_support.html?hl=zh-cn)