#### let和const命令
- var声明全局变量，容易造成全局的污染
- let  块级作用域，不允许重复声明，不存在变量提升
- const 块级作用域,声明常量，一旦声明，常量的值就不能改变，声明就必须初始化
###### let不存在变量提升
```
console.log(a) //undefined
var a = 11;
console.log(b)  //报错
let b = 22
```
#### 变量的解构赋值
> 从数组和对象中提取值，对变量进行赋值，这被称为解构
- 数组的解构赋值
> 这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值
```
 let [a,b] = [1,2]  
 a // 1  
 b // 2
 let [c,[d,[e]],f] = [1,[2,[]],3]
 c // 1
 d // 2
 e // undefined
 f // 3
 可以设置默认值
 let [x,y=11] = [10]
 x // 10 
 y // 11 
 let [x,y=11] = [10,12]
 x // 10 
 y // 12 
```
- 对象的解构赋值
> 变量必须与属性同名，才能取到正确的值。
```
let {name,age,honey} = {name:'zsn',age:18}
name //zsn
age  // 18
honey //undefined
当变量与属性不同名时
let {name:sex} = {name : 'girls'}
sex //girls
默认值
let {xx , yy =33} = {xx :22} 
xx //22 
yy //33
let {xx , yy =33} = {xx :22 , yy : 11}
xx //22
yy //11
```
- 字符串的解构赋值
```
const [a, b, c, d, e] = 'hello';
```
- 对象的函数解构
```
var obj = {
    name: 'zsn',
    age: 18
}
function foo ({name,age}) {
  document.write(`我叫${name},今年${age}岁`)
}
foo (obj)
```
- 数组的函数解构
```
var arr = [1,2,3]
function bar (a,b,c) {
  document.write(`你好${a},你好${b},你好${c}`)
}
bar(...arr)

```
#### 字符串的扩展
##### 字符串的拼接
```
let  name  ="zsn";
document.write(`我叫${name}`);
嵌入html标签:let blog=`<b>很高兴认识你</b><br/>我叫${zsn}`
对运算的支持：let a = 1 ;b = 2; c = `${a+b}`;
```
##### 字符串新增的方法
- includes()返回布尔值，表示是否找到了参数字符串。
- startsWith() 返回布尔值，表示参数字符串是否在原字符串的头部
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
```
let s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
这三个方法都支持第二个参数，表示开始搜索的位置。
let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
```
- repeat() 方法返回一个新字符串，表示将原字符串重复n次。
```
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
'na'.repeat(2.9) // "nana" 
参数如果是小数，会被取整,参数是负数或者Infinity，会报错
```
#### 数值的扩展
- 声明二进制数： let number  = 0B010101;
- 声明八进制数：  let number1 =  0O060606;
- 判断是不是数字： Number.isFinite(number);
- 判断是不是整数： Number.isInteger(number);
- 判断是不是NaN:  Number.isNaN(NaN);
- 转换为整数：Number.parseInt(number);
- 转换为浮点数：Number.parsefloat(number);
- 最大数字 ：Math.pow(2,53)-1;
- 最大安全数：Number.MAX_SAFE_INTEGER;
- 最小安全数：Number.MIN_SAFE_INTEGER;
- 判断是不是安全数：Number.isSafeInteger(a);
- Math.sign() 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
```
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
参数为正数，返回+1；
参数为负数，返回-1；
参数为 0，返回0；
参数为-0，返回-0;
其他值，返回NaN
```
#### 扩展运算符 rest 
> rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
###### Rest参数和arguments对象的区别：
- rest参数只包括那些没有给出名称的参数，arguments包含所有参数
- arguments 对象不是真正的数组，而rest 参数是数组实例，可以直接应用sort, map, forEach, pop等方法
##### rest参数作用  
- 将多余的逗号分隔的参数序列转换为数组参数
- rest参数必须是最后一个参数，否则报错
##### rest 用途
```
// 将字符串装换为数组
var str = 'zsn';
console.log([...str])  // ["z", "s", "n"]
// 两个数组的合并
var ar1 = ['zsn','11']
var ar2 = ['gt','sb']
console.log([...ar1,...ar2]) //["zsn", "11", "gt", "sb"]
// 合并两个对象
var obj3 =  {
a: 1,
b: 2
}
var obj4 = {
...obj3,
b: 3,
d: 4
}
console.log(obj4)  // {a: 1, b: 3, d: 4}
// 用于解构
var [arg1,...arg2] = [1,2,3,4]
console.log(arg2) // [2, 3, 4]
// 在函数中，用来代替arguments参数
function f (x,...y){
console.log(x) //a
console.log(y) //["b", "a", "b"]
}
f('a','b','a','b')
```
#### 数组的扩展
- Array.from() 将类数组对象和可遍历（iterable）转换成数组对象
```
 let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2' : 'c',
    length: 3
  }; 
  let arr2 = Array.from(arrayLike,function(val) {
    return val +1 
  })
  console.log(arr2) // ["a1", "b1", "c1"]
```
-  Array.of()  定义：  方法用于将一组值，转换为数组 
```
 let arr1 = Array.of(3, 11, 8)
 console.log(arr1) // [3, 11, 8]
```
- copyWithin(target, start , end) 将指定位置的成员复制到其他位置  target:从该位置开始替换数据  start:从该位置开始读取数据  end: 从该位置前停止读书数据
```
console.log([1, 2, 3, 4, 5,4,9,4].copyWithin(0, 3, 5)) //[4, 2, 3, 4, 5, 4, 9, 4]
```
- find() 用于找出第一个符合条件的数组成员
```
let arr3 = [1, 5, 10, 15].find(function(value, index, arr)     {
    return value > 9;
  }) 
  console.log(arr3) //10
```
- findIndex() 用于找出第一个符合条件的数组索引
```
let arr4 = [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
  }) 
  console.log(arr4) //2
```
- fill() 就是把数组进行填充，接受三个参数，第一个参数是填充的变流量，第二个是开始填充的位置， 第二个是结束填充的位置
```
let arr5 = [1,2,3,4].fill('anme',1,3) 
console.log(arr5) //[1, "anme", "anme", 4]
```
- 数据实例 entries(), keys(), values()
```
 for (let index of ['a', 'b'].keys()) {
     console.log(index);
  }  // 0   // 1
  for (let elem of ['a', 'b'].values()) {
      console.log(elem);
  }  // 'a'// 'b'
  for (let [index, elem] of ['a', 'b'].entries()) {
      console.log(index, elem);
  } // 0 "a" // 1 "b"
```
- includes()  返回一个布尔值，表示某个数组是否包含给定的值
```
 console.log([1, 2, 3].includes(2))   // true
 console.log([1, 2, 3].includes(4)  ) //false
```
- in 的用法  判断数组对象里面是否有某个值 
  　当为数组时，“变量”指的是数组的“索引”；
　　当为对象是，“变量”指的是对象的“属性”。
```
var arr = ["a","b","2","3","str"];  
  var result = ("b" in arr);   //false
  var result1 = (4 in arr);   //true
  var objqq={  
         w:"wen",  
         j:"jian",  
         b:"bao"  
           
    }       
  var result2=(2 in objqq);       // false
  var result3=("j" in objqq);      // true

```
#### 对象的扩展
##### 对象属性的遍历
- for in 遍历
```
let age = Symbol('sex')
var obj = {
  name: 'zsn',
  sex: 'boy',
  [age] : 18,
}
for (let i  in obj) {
  console.log(i) // name sex 
}
```
- object.keys() 
```
Object.keys(obj) // ["name", "sex"]
```
- Object.getOwnPropertyNames()
```
Object.getOwnPropertyNames(obj) // ["name", "sex"]
```
-   Object.getOwnPropertySymbols() 获取symbol属性
```
Object.getOwnPropertySymbols(obj)  // [Symbol(sex)]
```
- Reflect.ownKeys() 
```
console.log(Reflect.ownKeys(obj))  // ["name", "sex", Symbol(sex)]
```
###### Object.is() 判断两个值是否是相同的值
```
let obj1 = {
  name: 'zz',
  sex: 'boy'
}
console.log(Object.is(obj.name,obj1.name)) // false
console.log(Object.is(obj.sex,obj1.sex)) // true
console.log(Object.is(11,'11')) // false
```
##### Object.assign 对象的合并  浅拷贝
```
obj2 = {
  honey: 'ball'
}
let obj3 = Object.assign(obj1,obj2,{a: 'aa'})
// {name: "zz", sex: "boy", honey: "ball", a: "aa"}
```
#####  Object.values()方法返回一个数组，成员是参数对象自身的
```
let aaa = {name: "zz", sex: "boy", honey: "ball", a: "aa"}
Object.values(aaa)  // ["zz", "boy", "ball", "aa"]
```
#### 箭头函数
> es6 提供了一种简洁的函数写法,称作“箭头函数”。箭头函数相当于匿名函数，并且简化了函数定义。箭头函数中的this始终指向箭头函数定义时的离this最近的一个函数，如果没有最近的函数就指向window。
- 箭头函数不能用于构造函数
- 箭头函数没有prototype属性
- 箭头函数不能绑定 arguments
- 箭头函数不绑定this
- 箭头函数无法使用 call（）或 apply（）来改变其运行的作用域。
#### Symbol
> Symbol 是由ES6规范引入的一项新特性，它的功能类似于一种标识唯一性的ID。们可以通过调用Symbol()函数来创建一个Symbol实例：
```
let s1 = Symbol()
typeof s1  // 'symbol'
```
可以在调用Symbol()函数时传入一个可选的字符串参数，相当于给你创建的Symbol实例一个描述信息：
```
let s2 = Symbol('another symbol')
```
使用Symbol来作为对象属性名(key)
```
let age = Symbol()
let obj1 = {
    name:'zsn',
    [age]:18
} 
//  {name: "zsn", Symbol(): 18}
```
#### Set
> set对象是值的集合,元素只会出现一次,即Set中的元素是唯一的.
- set与数组之间的转换
```
var arr = [1,1,2,3,4,5,6,7,8]
数组转换成set
var set1 = new Set(arr) // {1, 2, 3, 4, 5, 6,7,8}
set转换成数组
Array.from(set1) // [1, 2, 3, 4, 5, 6, 7, 8]
console.log([...set1]) // [1, 2, 3, 4, 5, 6, 7, 8]
```
- 字符串转换成set
```
var str = 'siiva';
new Set(str)    // {"s", "i", "v", "a"}
```
- set 的属性
1. size 数据的长度
2. add() 添加某个值，返回 Set 结构本身。
3. delete() 删除某个值，返回一个布尔值，表示删除是否成功。
4. has() 查找某条数据，返回一个布尔值。
5. clear() 清除所有成员，没有返回值。
```
console.log(set1.size) // 8
console.log(set1.add(10).add(9))  // {1, 2, 3, 4, 5, 6,7,8,10,9}
console.log(set1.has(10)) // true
console.log(set1.delete(9)) // true
console.log(set1) // {1, 2, 3, 4, 5, 6,7,8,10}
set1.clear()
console.log(set1) // {}
```
- 数组的去重合并
```
var arr1 = [1,2,3]
var arr2 = [2,3,4]
[...new Set([...arr2,...arr1])] //  [2, 3, 4, 1]
```
- 数组的去重交集
```
var arr1 = [1,1,2,3]
var arr2 = [1,1,2,3,4]
var arr3 = [...new Set(arr1)].filter(element => arr2.indexOf(element) >= 0)
// [1, 2, 3]
```
- 数组的去重
```
let arr2 = [1,2,1,3,4]
let yy = arr2.filter(function(ele,index,self){
  return self.indexOf(ele) === index
})
console.log(yy)  // [1, 2, 3, 4]
```
#### Map
> Map集合的键名和值支持任意类型的数据
- map 基本语法
```
// 创建map对象
let map = new Map(); 
// set() 设置键值对
map.set('title', 'map title');
// get() 获取键对应的值, 不存在则返回undefined
map.get('title'); // map title
```
- map的key支持任意数据类型
```
var obj = {
  name: 'zsn',
  age: 18
}
var map = new Map()
map.set(obj,'kjfl')
console.log(map.get(obj)) //kjfl

```
- 其他方法
```
let map = new Map();
// has(key): 检测键名是否存在
map.has('title');
// delete(key): 删除指定的键名和其值
map.delete('title');
// clear(): //清空所有键值对
map.clear();
```
#### class类的使用
```
// es5

function person (name,age) {
      this.name = name;
      this.age = age;
      
}
person.prototype.say = function () {
  return "我的名字叫" + this.name+"今年"+this.age+"岁了";
}
var obj=new person("laotie",18);
console.log(obj.say())

// es6 改写成

class person1 {
  constructor(name,age) {
    this.name = name ;
    this.age = age ; 
  }
  say () {
    return "我的名字叫" + this.name+"今年"+this.age+"岁了";
  }
}
var obj = new person1("laotie",18)
console.log(obj.say())
// 类自身指向的就是构造函数。所以可以认为ES6中的类其实就是构造函数的另外一种写法！
```
- 注意项 
1. 在类中声明方法的时候，千万不要给该方法加上function关键字
2. 方法之间不要用逗号分隔，否则会报错

# 后续还在学习中