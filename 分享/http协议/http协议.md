# 读懂HTTP协议，有这篇文章就够了
- 概念
HyperText Transfer Protocol 超文本传输协议
什么是超文本???
互联网早期，我们保存的信息通常都以文本即简单字符的形式存在，后面人们不满足只传输文字，比如要传输图片，音频，视频等，所以叫超文本

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

### Server Push
在 HTTP/2 规范中，有一节引入了一种新技术——Server Push。
解决了什么问题???
HTTP keep-alive 允许客户端和服务端用同一个 TCP 连接发送/接收多个请求/响应，减少了昂贵的 TCP 建立连接和断开连接的过程；HTTP pipelining 允许客户端在收到响应之前继续发送幂等方法（GET 和 HEAD）的请求，提升在高延迟连接下页面的加载速度；HTTP/2 更是定义了帧（frame）和流（stream），真正地复用了 TCP 连接，从而解决了 pipelining 不能解决的问题（例如「快」的响应被「慢」的响应阻塞的问题）。

简单解释： 提前推送响应
推什么和怎么推？



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
 

### ISO（国际标准化组织）提出来计算机网络应该按照7层来组织

<img src="./011.png">

### 浏览器
我们在地址栏输入URL（即网址），浏览器会向DNS（域名服务器，后面会说）提供网址，由它来完成 URL 到 IP 地址的映射。然后将请求你的请求提交给具体的服务器，在由服务器返回我们要的结果（以HTML编码格式返回给浏览器），浏览器执行HTML编码，将结果显示在浏览器的正文。这就是一个浏览器发起请求和接受响应的过程。

<img src="./012.png">

### Web 服务器
目前最主流的三个Web服务器是Apache、 Nginx 、IIS

### WAF
WAF 是一种 Web 应用程序防护系统（Web Application Firewall，简称 WAF），它是一种通过执行一系列针对HTTP / HTTPS的安全策略来专门为Web应用提供保护的一款产品，它是应用层面的防火墙，专门检测 HTTP 流量，是防护 Web 应用的安全技术。

### DNS
域名系统

### URI / URL

### HTTP 请求响应过程

1. DNS服务器会首先进行域名的映射，找到访问www.someSchool.edu所在的地址，然后HTTP 客户端进程在 80 端口发起一个到服务器 www.someSchool.edu 的 TCP 连接（80 端口是 HTTP 的默认端口）。在客户和服务器进程中都会有一个套接字与其相连。
2. HTTP 客户端通过它的套接字向服务器发送一个 HTTP 请求报文。该报文中包含了路径 someDepartment/home.index 的资源，我们后面会详细讨论 HTTP 请求报文。
3. HTTP 服务器通过它的套接字接受该报文，进行请求的解析工作，并从其存储器(RAM 或磁盘)中检索出对象 www.someSchool.edu/someDepartment/home.index，然后把检索出来的对象进行封装，封装到 HTTP 响应报文中，并通过套接字向客户进行发送。
4. HTTP 服务器随即通知 TCP 断开 TCP 连接，实际上是需要等到客户接受完响应报文后才会断开 TCP 连接。
5. HTTP 客户端接受完响应报文后，TCP 连接会关闭。HTTP 客户端从响应中提取出报文中是一个 HTML 响应文件，并检查该 HTML 文件，然后循环检查报文中其他内部对象。
6. 检查完成后，HTTP 客户端会把对应的资源通过显示器呈现给用户。

HTTP 请求特征


## 分析异步请求
<img src="./013.png" />

Referrer-Policy  
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy


Sec-Fetch-Mode  
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Sec-Fetch-Mode


### 通过HTTP的HEADER完成各种骚操作
1. 多语言（Accept-Language）
2. 防盗链（Referer、Referered）
3. gzip（Accept-Encoding，Content-Encoding）

### 九个问题从入门到熟悉HTTPS
https://juejin.cn/post/6844903521272201223
https://juejin.cn/post/6844903592965439501#heading-19
https://juejin.cn/post/6844903615249776654


参考文档：  
https://juejin.cn/post/6844903844216832007  
https://zhuanlan.zhihu.com/p/26757514  
https://juejin.cn/post/6844903842773991431  













