#JavaScript中this指向问题

####函数调用模式

> this是JavaScript的关键字之一。它是自动生成的一个内部对象，只能在对象内部使用，随着函数使用的场合不同，this的指向会发生变化
1. 普通函数
```
 var name = 'window';
 function  foo (){
    var name = 'zz';
    console.log(this.name)
  }
  var obj  = {
      name:'obj',
      foo:foo
  }
 foo();  //window
 obj.foo() //obj
```
2. html内联写法
```
<button onclick="a(this)">确 定</button>

function a() {
	console.log(arguments[0])
}
//这个 this指向 button
```
#### 对象调用模式

1. 狭义对象
```
var obj = {
	name: 'zz',
	child: {
		sayName() {
			console.log(this.name)
		}
	},
	getName() {
		console.log(this.name)
		return function() {
			console.log(this.name)
		}
	}
}
obj.child.sayName()  //undefined  this指向child
obj.getName()   //zz
obj.getName()()   //zz window 
var t = obj.child.sayName  
t()  //window    window 调用的函数t
var m = obj.getName
m()  //window
```
2. 广义对象
```
document.getElementById("div").onclick = function(){
    this.style.backgroundColor = "red"      
} //this指向id=div元素
```
#### 构造函数调用模式

	function Fn() {
		this.name = 'zz'
	}
	var a = new Fn()
	console.log(a.name)  //zz

#### #当this碰到return
###### 改写1
```
function Fn() {
	this.name = 'zz'
	return null
}
var a = new Fn()
console.log(a.name)  //zz 当函数有返回值为空是 不会影响this的指向
````
###### 改写2
```
function Fn() {
	this.name = 'zz'
	return []
}
var a = new Fn()
console.log(a.name)  //undefined
```  
#### call和apply调用模式
```
var name = 'zz'
var obj = {
	name: 'hh'
}
function sayName() {
    console.log(this.name)
}
sayName() //zz
sayName.call(obj) //hh
sayName.apply(obj) //hh
sayName.call() //zz
sayName.apply() //zz
```

#### tips

1. 使用new操作符来调用一个构造函数的时候，发生了什么 ( var obj = new Fn() )
```
var obj  ={} // 创建一个空对象
obj.__proto__ = Fn.prototype // 将这个空对象obj的proto成员指向了构造函数Fn对象的prototype成员对象
Fn.call(obj) // 将构造函数Fn的作用域赋给新对象obj，因此Fn函数中的this指向新对象obj
return obj // 返回新对象obj
```
2. 使用new Function创建函数
```
语法：
    1. 一个参数都不传的情况  创建的就是一个空的函数
       var 函数名 = new Function()

    2. 只传一个参数的情况 这个参数就是函数体
       var 函数名 = new Function("函数体")

    3. 传多个参数的情况，最后一个参数为函数体，前面的参数都是该函数的形参名
       var sum = new Function("a", "b", "return a + b;")
	   console.log(sum(1, 10)) // 11

	   相当于
	   function sum(a, b) {
	   		return a + b
	   }
	   console.log(sum(1, 10))
```
3. 对象方法中return function中this指向问题
```
1. 使用函数的call/apply/bind方法，绑定当前this
   var name = "window.name"
   var obj = {
       name : "obj.name",
       getName:function(){
           console.log(this.name)
           return function(){
               console.log(this.name)
           }.bind(this)
       }
   }
   obj.getName()()  //  "obj.name"  "obj.name"

2. 当前作用域this赋值给另一个变量
   var name = "window.name"
   var that = null
   var obj = {
       name : "obj.name",
       getName:function(){
		   that = this
           console.log(this.name)
           return function(){
               console.log(that.name)
           }
       }
   }
   obj.getName()();  //  "obj.name"  "obj.name"

3. 利用es6箭头函数
   var name = "window.name"
   var obj = {
       name : "obj.name",
       getName:function(){
           console.log(this.name)
           return () => {
               console.log(this.name)
           }
       }
   }
   obj.getName()()  //  "obj.name"  "obj.name"
```