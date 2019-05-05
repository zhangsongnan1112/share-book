#### DOM事件的级别
> DOM级别一共分为四个级别：DOM0、DOM1、DOM2、DOM3,而DOM事件分为三个级别：DOM0、DOM2、DOM3（一级DOM标准并没有定义事件相关的内容，所以并没有所谓的一级DOM事件模型）

**DOM0** 
```
<div onclick="xx"/></div>
element.onclick = function(){}
element.onclick = null
缺点：无法绑定多个处理函数(同一个元素同一种事件只能绑定同一个函数，否则后面的函数会覆盖之前的函数)
```
**DOM2**
> 包含3个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段
```
function show () {alert('Hello World');}
element.addEventListener('click',show ,true)
element.removeEventListener('click',show,true)(不能移除匿名函数)
接受三个参数：
1. 事件名（click,keydown）
2. 函数
3. 布尔值，指定事件是否在捕获或冒泡阶段执行
true - 事件句柄在捕获阶段执行
false- false- 默认。事件句柄在冒泡阶段执行
```
**DOM3**
```
在DOM2的基础上添加了更多的事件类型
element.addEventListener('keyup',show ,true) /
```
#### DOM事件的模型
1.  捕获（从上到下）
2.  冒泡（从下到上）
```
DOM事件捕获流程
window.addEventListener('click',function(){
    console.log('window')
},true)
document.addEventListener('click',function(){
    console.log('document')
},true)
document.documentElement.addEventListener('click',function(){
    console.log('html')
},true)
document.body.addEventListener('click',function(){
    console.log('body')
},true)
en.addEventListener('click',function(){
    console.log('en')
},true)
```

#### DOM事件流
1. 事件捕获阶段
2. 处于目标阶段
3. 事件冒泡阶段

#### event
```
event.preventDefault()
取消鼠标有右击的默认事件
window.addEventListener('contextmenu',function(event){
    event.preventDefault();
    console.log(event)
})

event.stopPropagation() 阻止事件冒泡

event.stopImmediatePropagation() 
事件响应优先级 如一个按钮两个事件a，b，希望点击a的时候，不再执行b事件，在a的函数中，加此句话，则会阻止b事件的执行
event.currentTarget (事件绑定在谁身上谁就是 currentTarget)
event.target（事件委托）（点击谁就是target）
```


