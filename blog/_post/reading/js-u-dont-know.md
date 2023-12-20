---
title: 《你不知道JavaScript》笔记
date: 2023-10-24
category: 
tags:
  - 
---

<!-- more -->

## 1. 作用域

什么是作用域？

一套用于存储变量，并且之后可以方便地找到这些变量的规则

> 这个解释有点不好理解，我们平常说的“这个变量的作用域是哪一块”=”这个变量的的XX规则是XX“？这个说法是否是站在引擎角度，站在开发人员角度是否作用域即变量的可访问范围

从编译器角度，变量的赋值操作会执行两个动作，首先编译器会在当前作用域中声明一个变量（如果之前没有声明过），然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对它赋值。

依然是从编译器角度，LHS 和RHS 的含义是“赋值操作的左侧或右侧”并不一定意味着就是“=
赋值操作符的左侧或右侧”。赋值操作还有其他几种形式，因此在概念上最好将其理解为“赋值操作的目标是谁（LHS）”以及“谁是赋值操作的源头（RHS）”

> "赋值操作的左侧或右侧" 是作者提出的概念 ，然后作者又在上面否定这个概念？是否最开始就解释清楚更好