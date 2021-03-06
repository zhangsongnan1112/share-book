> 全名超文本传输协议
#### HTTP协议的主要特点
- 简单快速：每个资源的url是固定的，想访问某个资源，浏览器里输入url就可以了
- 灵活：可以传输不同类型的数据
- 无连接：每次连接只处理一个请求、处理完请求后连接就会断掉，不会保持链接
- 无状态：协议指对事物处理没有记忆能力，发送完不会记录任何信息
#### HTTP报文的组成部分
1. 请求报文
    - 请求行
    - 请求头
    - 请求体
    - 空行
2. 响应报文
    - 状态行
    - 响应头
    - 空行
    - 响应体

#### HTTP方法
- GET : 请求资源
- POST :传输资源
- PUT :更新资源
- DELET :删除资源
- HEAD :获取报文首部

#### POST和GET的区别
- GET在浏览器回退是无害的，而POST会再次提交请求
- GET产生的URL地址可以被收藏，而POST不可以
- GET请求会被浏览器主动缓存，而POST不可以
- GET请求只能进行url编码，而POST支持多种编码方式
- GET 请求参数会被完成的保存在浏览器历史里，而POST的参数不会被保留
- GET请求在URL中传送的参数是有限制的（2kb）,而POST没有限制
- GET比POST更不安全，因为参数直接暴露在URL上，是可见的，所以不安全，不能发送敏感信息
- GET参数通过URL传递，POST放在Request body 中

#### HTTP状态码
- 1xx:服务器收到请求，需要继续执行此操作
- 2XX：成功，操作被成功接收
   - 200：请求成功
   - 201：已经创建
   - 202:已接收
   - 206：服务器成功处理了部分get请求
- 3XX:重定向，需要进一步操作以完成请求
    - 301：所请求的页面资源已经永久转移至新的url
    - 302 ：所请求的页面资源已临时转移至新的地址
- 4xx:客户端错误，请求包含语法错误或无法完成请求
    - 400 :  客户端请求有语法错误，不能被服务器所理解
    - 401 :请求未经授权，请求要求用户的身份认证
    - 403 :拒绝请求
    - 404 ：资源不存在
 - 5xx :服务器错误
    - 500 ：服务器发生不可预期的错误
    - 502 ：无效请求
    - 503 : 请求未完成，服务器临时过载或当机，一段时间后可能恢复正常
#### 什么是持久连接（HTTP1.1版本支持）
- HTTP协议采用‘请求-应答’模式，当使用普通模式，即非Keep-Alive模式时，每个请求／应答客户和服务器都要新建一个连接，完成之后立即断开连接（HTTP协议为无协议的连接）
- 当使用Keep-Alive模式（又称持久连接、连接重用）时，Keep-Alive功能使客户端到服务端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接
#### 什么是管线化（原理：将请求／响应打包回来）
-  在使用持久化连接的情况下，某个连接上消息的传递类似于 请求1->响应1 -> 请求2 -> 响应2 -> 请求3 -> 响应3
- 某个连接上的消息变成了类似这样： 请求1 -> 请求2 -> 请求3 -> 响应1 -> 响应2 -> 响应3

##### 特点：
 - 管线化机制通过持久连接完成，仅HTTP／1.1支持此技术
- 只有GET和HEAD可以进行管线化，而POST有所限制
- 初次创建连接时不应启动管线机制，因为服务器不一定HTTP／1.1版本
- 管线化不会影响响应到来的顺序
- HTTP／1.1要求服务器端支持管线化，但并不要求服务端也对响应进行管线化处理，只要求对于管线化的请求不失败即可
- 由于上述提到的服务器端问题，开启管线化并不会带来大幅度的性能提升，而且很多服务器端和代理程序对管线化的支持并不好，因此现代浏览器Chrome和Firefox默认并未开启管线化支持