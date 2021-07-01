# 读懂HTTP协议，有这篇文章就够了
- 概念
HyperText Transfer Protocol 超文本传输协议

## http协议特点
1. 无状态协议
  双方如何认证对方？？？
  前端cookie(后端叫session)

说到http协议，不得不说TCP/IP，因为http协议是TCP/IP的子集（上层协议）

## TCP/IP协议族
如下图：
<img src="./001.png">


### 应用层
向用户提供应用服务时通信的协议,如FTP(文件传输),DNS(域名解析),HTTP协议

### 传输层
连接网络中两台计算机之间数据传输所使用的协议
TCP（Transmission Control Protocol，传输控制协议）和UDP（User Data Protocol，用户数据报协议
TCP发送和接收数据同步进行(例：打电话),三次握手和四次挥手
UDP协议，面向无连接，不保证有序且不丢失的传递到对方,UDP比TCP高效

### 网络层
数据传输路线（如ip协议）


### 链路层
处理网络硬件部分，包括操作系统，硬件驱动，网卡等物理传输媒介

## http协议版本
### （1）http/1.0
有点串行连接，短连接，短轮询，每次HTTP通讯后都要断开TCP连接
缺点：每个新的HTTP请求都需要建立一个新的连接（三次握手，四次挥手），极大的增加了通讯开销

### （2）http/1.1
优点：
    (1) 持久连接，减少了握手时间造成的浪费
    (2) 引入的更多的缓存策略，If-Unmodified-Since, If-Match,If-None-Match等
   （3）请求头加入Range,请求和相应必须包含Host
缺点：阻塞模式，下次请求必须等到上次响应返回后才能发起
管道化持久连接

### （3）http/2.0
优点：支持并发多个请求，服务端按照序列标识符重新排序报文。客服端接收服务端响应报文也类似
介绍：帧和流
帧代表数据传输的最小的单位，每个帧都有序列标识表明该帧属于哪个流，流也就是多个帧组成的数据流，每个流表示一个请求.
chrome扩展：HTTP/2 and SPDY indicator，可查看协议
缺点：

### websocket
WebSocket是HTML5提出的一种客户端和服务端通讯的全双工协议，由客户端发起请求，建立连接之后不仅客户端可以主动向服务端发送请求，服务端可以主动向客户端推送信息。

<img src="./002.png">

### http/1.x和http/2.x
http/1.x基于文本协议解析
http/2.x支持多路复用，所以改成了流的方式

### 头部压缩
http/1.x请求和响应头每次请求重复发送
http/2.x有头部压缩，通讯双发的cache保存了一份头部fields

### http/3.x
HTTP/2.0 使用了多路复用, 但当这个连接中出现了丢包的情况，那就会导致整个 TCP 都要开始等待重传（比如切换网络），也就导致了后面的所有数据都被阻塞了。
Google 基于 UDP 协议推出了一个的 QUIC 协议，并且使用在了 HTTP/3 上。新增了比如多路复用、0-RTT、使用 TLS1.3 加密、流量控制、有序交付、重传等等功能

优点：
（1）避免包阻塞（数据流相互独立互不干扰）
（2）快速重启会话（网络切换）

## HTTP报文
<img src="./003.png">
<img src="./004.png">

### 请求方法
GET/POST/PUT/DELETE/HEAD/OPTIONS

### 状态码
<img src="./005.png">

### 首部字段
<img src="./006.png">
<img src="./007.png">
<img src="./008.png">
<img src="./009.png">

### 浏览器常用字段
<img src="./010.png">

### 两种请求
1. 简单请求
  （1）请求的方法只能为HEAD、GET、POST
  （2）无自定义请求头
  （3）Content-Type只能是这几种：
    text/plain multipart/form-data application/x-www-form-urlencoded

2. 复杂请求
（1）PUT, Delete 方法的 ajax 请求
（2）发送 JSON 格式的 ajax 请求(比如post数据)
（3）带自定义头的 ajax 请求
跨域请求会先发一个预检请求

## WEB服务器
虚拟主机：HTTP/1.1强制要求携带HOST
 

















