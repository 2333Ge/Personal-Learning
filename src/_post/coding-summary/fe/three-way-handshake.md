
# 3次握手4次挥手

## 3次握手

握手目的，确认双方的发送能力、接收能力是否正常。

每个阶段各确认了什么：

第一次握手：客 => 服，客户端发送能力正常，服务端接收能力正常（客户端不知道）

第二次握手：服 => 客，+ 服务端接收能力（知道了）、服务端发送能力，客户端接收能力（服务端不知道）

第三次握手：客 => 服，+ 客户端接收能力（现在服务端知道了）


## 4次挥手

目标：断开连接，不需要接受和发送

假定两端分别为 A B 

第一次： A => B, A关闭发送

第二次：B => A, B表示收到

第三次：B => A, B 想要关闭，（二三不融合是因为，B不一定想立即关闭，可能还有在等待所有报文发送完毕）

第四次，A => B, A 收到，等2MSL 关闭 （等2MSL是因为防止这次请求B没收到，B可重复第三次）

> MSL：最长报文段寿命”，它是任何报文在网络上存在的最长时间，超过这个时间报文将被丢弃。


## 随记

charles抓包是http维度，用WireShark

第三次握手成功与否客户端似乎不知道？何时发送数据给服务端？

第三次握手可以携带数据

发送数据阶段丢包、超时怎么判断？