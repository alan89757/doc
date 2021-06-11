# 深入对比defineProperty和Proxy
## 如何实现数据绑定 ?  
```js
  // 监听文件更新
  npm install -g browser-sync
  // browser-sync start --server --files "./*.html"
```

## 介绍defineProperty
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。  
MDN文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty  

- 语法
```js
Object.defineProperty(obj, prop, descriptor)
```
- 参数
```js
obj: 要在其上定义属性的对象。
prop:  要定义或修改的属性的名称。
descriptor: 将被定义或修改的属性的描述符。
```

## 属性描述符分两种：数据描述符和存取描述符
### 数据描述符
```js
Object.defineProperty({}, "num", {
    value: 1,
    writable: true,    // 该对象属性是否可写
    enumerable: true,  // 该对象属性是否枚举，**举例**
    configurable: true  // 该对象属性描述符(value/writable/enumerable/configurable)是否可修改 **举例**
});
```
- 举例
```js
// 演示writable使用
var obj = {};
Object.defineProperty(obj, "num", {
    value: 1,
    writable: false
});
obj.num = 2;
console.log(obj.num);  // 1
```

```js
// 演示enumerable使用，是否可枚举（用于for in和Object.keys）
// ps: 不影响for of使用
  var obj = {
    food: "melon"
  };
  Object.defineProperty(obj, "num", {
      value: 1,
      enumerable: false
  });
  // for in
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log(obj[key]);
    }
  }
  // Object.keys
  var obj = {
    name: "Tom",
    num: 1,
  }
  Object.defineProperty(obj, "num", {
    enumerable: false
  });
  console.log(Object.keys(obj)); // ["name"] 
```

```js
// 演示configurable使用
  var obj = {};
  Object.defineProperty(obj, "num", {
    configurable: false
  });
  // 修改属性描述符
  Object.defineProperty(obj, "num", {
    value: 2,  // 属性描述符不允许修改
  });
```

### 存取描述符(get/set)
```js
  var obj = {};
  var value = 1;
  Object.defineProperty(obj, "num", {
    get : function(){
      console.log("执行了get操作");
      // return 2;
      return value;
    },
    set : function(newValue){
      console.log("执行了set操作");
      value = newValue;
    },
    enumerable : true,
    configurable : true
  });
  obj.num = 1;  // "执行了set操作"
  console.log(obj.num);  // "执行了get操作"
```

- defineProperty应用场景
```js
  <span id="container">1</span>
  <button id="button">点击加 1</button>
  var obj = {};
  (function(){
    var value = 1;
    Object.defineProperty(obj, "value", {
      get : function(){
        console.log("执行了get操作");
        return value;
      },
      set : function(newValue){
        console.log("执行了set操作");
        value = newValue;
        document.getElementById('container').innerHTML = newValue;
      }
    });
  })();
  // obj.value自增一
  document.getElementById('button').addEventListener("click", function() {
    obj.value += 1;
  });
```

## Proxy
Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。  
MDN文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
- 语法
```js
var proxy = new Proxy(target, handler);
```
- 参数
```js
//target 要拦截的对象
// handler 定制拦截行为
var a = 1;
```
### handler拦截行为如下：  
handler.get  
handler.set  
handler.has  
handler.apply  
handler.construct  
handler.ownKeys  
handler.deleteProperty  
handler.defineProperty  
handler.isExtensible  
handler.preventExtensions  
handler.getPrototypeOf  
handler.setPrototypeOf  
handler.getOwnPropertyDescriptor   

![alt 属性文本](./proxy_handle.png)

### get/set应用
```js
var proxy = new Proxy({}, {
  get: function(obj, prop) {
    console.log('执行了get操作')
    return obj[prop];
  },
  set: function(obj, prop, value) {
    console.log('执行了set操作')
    obj[prop] = value;
  }
});
proxy.time = 10; // 执行了set操作
console.log(proxy.time); // 执行了get操作 10
```
### 拦截行为demo
```js
// get/set
var proxy = new Proxy({}, {
  get: function(obj, prop) {
    console.log('执行了get操作')
    return obj[prop];
  },
  set: function(obj, prop, value) {
    console.log('执行了set操作')
    obj[prop] = value;
  }
});
proxy.time = 10; // 执行了set操作
console.log(proxy.time); // 执行了get操作 10

```
```js
// get/set
var proxy = new Proxy({}, {
  get: function(obj, prop) {
    console.log('执行了get操作')
    return obj[prop];
  },
  set: function(obj, prop, value) {
    console.log('执行了set操作')
    obj[prop] = value;
  }
});
proxy.time = 10; // 执行了set操作
console.log(proxy.time); // 执行了get操作 10

```
```js
// get/set
var proxy = new Proxy({}, {
  get: function(obj, prop) {
    console.log('执行了get操作')
    return obj[prop];
  },
  set: function(obj, prop, value) {
    console.log('执行了set操作')
    obj[prop] = value;
  }
});
proxy.time = 10; // 执行了set操作
console.log(proxy.time); // 执行了get操作 10

```
```js
// has
var obj = {
  start: 1,
  end: 10
}
var proxy = new Proxy(obj, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  }
});
console.log(3 in proxy);  // true
console.log(12 in proxy); // false

```
```js
// **需求：不允许删除私有属性**
// deleteProperty
var user = {
  name: "alan",
  _password: "****"
}
var proxy = new Proxy(user, {
  deleteProperty(target, prop) {
    if(prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  }
});
try {
  // delete user.name;
  delete proxy._password; // 私有属性不允许删除
} catch (e) {
  console.log(e.message); 
}

```
```js
// **为什么要用proxy apply**
// apply

// 普通函数
// 定义一个延迟执行的函数
function delay(f, ms) {
  return function() {
    setTimeout(() => {
      f.apply(this, arguments);
    }, ms);
  }
}
function sayHello(name) {
  alert(`hello, ${name}`);
}
alert(sayHello.length); // 1
sayHello = delay(sayHello, 2000);
// console.log(sayHello)
alert(sayHello.length); // 0 sayHello已经指向匿名函数了
sayHello("Tom");

// 使用proxy
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArgs, args) {
        setTimeout(() => {
          target.apply(thisArgs, args);
        }, ms);
    }
  });
}
function sayHello(name) {
  alert(`hello, ${name}`);
}
alert(sayHello.length); // 1
sayHello = delay(sayHello, 2000);
// console.log(sayHello)
alert(sayHello.length); // 1 始终处于sayHello上下文环境

```
```js
// construct
function Person(name){
  this.name = name;
}
var proxy = new Proxy(Person, {
  construct(target, args) {
    console.log("Person construtor called");
    return new target(...args);
  }
});
var person = new proxy("Tom");
console.log(person.name);

```
```js
// getPrototypeOf
var person = {
  eyeCount: 3  // 二郎神三只眼睛
};
var personProto = {
  eyeCount: 2  // 正常人两只眼睛
}
var proxy = new Proxy(person, {
  getPrototypeOf(target) {
    console.log("Object.getPrototypeOf方法被调用~");
    return personProto;
  }
});
console.log(Object.getPrototypeOf(proxy) === personProto);  // true
console.log(Object.getPrototypeOf(proxy).eyeCount);  // 2

```
```js
// setPrototypeof
var newProto = {};
var obj = {};
var proxy = new Proxy(obj, {
  setPrototypeOf(target, newProto){
    console.log("setPrototypeOf方法被调用~")
    // return false;
    throw new Error("custom error")
  }
});
console.log(Object.setPrototypeOf(proxy, newProto)); // custom error
// console.log(Reflect.setPrototypeOf(proxy, newProto)); // custom error

```

```js
// isExtensible/preventExtensions
var person = {
  canRun: true
};
var proxy = new Proxy(person, {
  isExtensible(target){
    console.log("isExtensible方法被调用~");
    return Reflect.isExtensible(target);
  },
  preventExtensions(target) {
    console.log("preventExtensions方法被调用~");
    target.canRun = false;
    return Reflect.preventExtensions(target);
  }
});
console.log(Object.isExtensible(proxy));  // true
console.log(person.canRun);   // true
Object.preventExtensions(proxy);  // "preventExtensions方法被调用"
console.log(Object.isExtensible(proxy)); // false
console.log(person.canRun);  // false
```

```js
// defineProperty
var p1 = new Proxy({}, {
  defineProperty(target, prop, descriptor) {
    console.log("called: " + prop);
    return true;
  }
});
var desc = { configurable: true, enumerable: true, value: 10 };
Object.defineProperty(p1, "name", desc); // "called: name"
Object.defineProperties(p1, {
  "property1": {
    value: true,
    writable: true
  },
  "property2": {
    value: "hello",
    writable: true
  }
});
```

```js
// getOwnPropertyDescriptor
// 触发场景：Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
var proxy1 = new Proxy({age: 20}, {
  getOwnPropertyDescriptor(target, prop){
    console.log("called: " + prop);
    return {
      configurable: true,
      enumerable: true,
      value: 10
    }
  }
});
// {value: 10, writable: false, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(proxy1, "age")); 
for (const key in proxy1) {
  if (proxy1.hasOwnProperty(key)) {
    console.log(proxy1[key]);
  }
}
Object.keys(proxy1);
Object.values(proxy1);
console.log(Object.entries(proxy1));
```

```js
  // ownKeys
  // 触发场景：Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object/keys/values/entries/for..of
  var proxy1 = new Proxy([1,2, 3], {
    ownKeys: function(target) {
      console.log("called~");
      // return ["a", "b", "c", Symbol("fruit")];
      return Reflect.ownKeys(target);
    }
  });
  console.log(Object.getOwnPropertyNames(proxy1));
  // console.log(Object.getOwnPropertySymbols(proxy1));
  // for (const key in proxy1) {
  //   console.log(proxy1[key]);
  // }
  // console.log(Object.keys(proxy1));
  // console.log(Object.values(proxy1));
  // console.log(Object.entries(proxy1));
  // for (const iter of proxy1) {
  //   console.log(proxy1[iter]);
  // }
```

### defineProperty不足
1. 不能监听数组
```js
var arr = {};
let value;
Object.defineProperty(arr, "nums", {
  get() {
    console.log("执行get操作~");
    return value;
  },
  set(newVal) {
    console.log("执行set操作~");
    return value = newVal;
  }
});
arr.nums = [1, 2];
arr.nums.push(3);  // 无set操作
```


### defineProperty和proxy兼容性对比
查询地址：https://caniuse.com/  

![alt 属性文本](./compare_defineProperty.png)  
--------------------------------------------
![alt 属性文本](./compare_proxy.png)

### proxy监听数组变化
```js
var arr = [1, 2];
var proxy = new Proxy(arr, {
  get(target, prop){
    console.log("执行了get操作~");
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    console.log("执行了set操作~");
    return Reflect.set(...arguments);
  }
});
// proxy[2] = 3;
proxy.push(5)
```

### proxy劫持深层对象
```js
var proxy = new Proxy({}, {
  get(target, prop){
    console.log("执行了get操作~");
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    console.log("执行了set操作~");
    return Reflect.set(...arguments)
  }
});

proxy.fruit = {};
proxy.fruit.apple = 1;  // get无法拦截
```

### defineProperty在vue2.x源码中的应用




### proxy在vue3.x源码中的应用

### proxy其他应用场景
1. 设置默认值
```js
 const withZeroValue = (target, zeroValue) => new Proxy(target, {
   get: (obj, prop) => (prop in obj) ? obj[prop] : zeroValue
 });
 let pos = {
   x: 4,
   y: 19
 }
 console.log(pos.x, pos.y, pos.z) // 4, 19, undefined
 pos = withZeroValue(pos, 0);
 console.log(pos.x, pos.y, pos.z) // 4, 19, 0
```
2. 负索引数组
```js
const negativeArray = (els) => new Proxy(els, {
  get: (target, propKey, receiver) => Reflect.get(target,
    (+propKey < 0) ? String(target.length + +propKey) : propKey, receiver)
});
const unicorn = negativeArray(['🐴', '🎂', '🌈']);
console.log(unicorn[-1]) // '🌈'
```
3. 隐藏属性  
```js
// 隐藏属性
const hide = (target, prefix = '_') => new Proxy(target, {
  has: (obj, prop) => (!prop.startsWith(prefix) && prop in obj),
  ownKeys: (obj) => Reflect.ownKeys(obj)
    .filter(prop => (typeof prop !== "string" || !prop.startsWith(prefix))),
  get: (obj, prop, rec) => (prop in rec) ? obj[prop] : undefined
});
let userData = hide({
  firstName: 'Tom',
  mediumHandle: '@tbarrasso',
  _favoriteRapper: 'Drake'
});
console.log(userData._favoriteRapper);  // undefined
console.log(('_favoriteRapper' in userData));  // false
```
4. 缓存
```js
const ephemeral = (target, ttl = 60) => {
  const CREATED_AT = Date.now();
  const isExpired = () => (Date.now() - CREATED_AT) > (ttl * 1000);
  return new Proxy(target, {
    get: (obj, prop) => isExpired() ? undefined : Reflect.get(obj, prop)
  })
}
let bankAccount = ephemeral({
  balance: 14.93
}, 10);
console.log(bankAccount.balance);  // undefined
setTimeout(() => {
  console.log(bankAccount.balance);  // undefined
}, 10 * 1000);
```
5. 枚举和只读视图
```js
// 枚举
const NOPE = () => {
  throw new Error("Can't modify read-only view");
}
const NOPE_HANDLER = {
  set: NOPE,
  defineProperty: NOPE,
  deleteProperty: NOPE,
  preventExtensions: NOPE,
  setPrototypeOf: NOPE
}
const readOnlyView = target => new Proxy(target, NOPE_HANDLER);
let fruits = {
  apple: 1,
  banana: 2
}
let p1 = readOnlyView(fruits);
// p1.melon = 3; // error "Can't modify read-only view"
// 只读视图
const createEnum = (target) => readOnlyView(new Proxy(target, {
  get: (obj, prop) => {
    if (prop in obj) {
      return Reflect.get(obj, prop)
    }
    throw new ReferenceError(`Unknown prop "${prop}"`)
  }
}));
let foods = {
  cake: 1,
  chips: 2
}
let p2 = createEnum(foods);
p2.orange  // Unknown prop "orange"
```
6. 运算符重载
```js
  const range = (min, max) => new Proxy(Object.create(null), {
    has: (_, prop) => (+prop >= min && +prop <= max)
  });
  console.log(12 in range(1, 10));
  let nums = [1,2,3,4,5];
  console.log(nums.filter(n=> n in range(1,3)));
```
7. cookie对象
```js
  const getCookieObject = () => {
    const cookies = document.cookie.split(';').reduce((cks, ck) => 
      ({[ck.substr(0, ck.indexOf('=')).trim()]: ck.substr(ck.indexOf('=') + 1), ...cks}), {});
        const setCookie = (name, val) => document.cookie = `${name}=${val}`;
        const deleteCookie = (name) => document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        return new Proxy(cookies, {
          set: (obj, prop, val) => (setCookie(prop, val), Reflect.set(obj, prop, val)),
                deleteProperty: (obj, prop) => (deleteCookie(prop), Reflect.deleteProperty(obj, prop))
        })
  }
  let docCookies = getCookieObject();
  docCookies.has_recent_activity = "2";        // "2"
  console.log(docCookies.has_recent_activity);
  delete docCookies["has_recent_activity"];   // true
  console.log(docCookies.has_recent_activity);
```

8. Polyfill
```js

```

### Vue2.x为什么不能检测数组变动?


### defineProperty和proxy区别
defineProperty劫持的是对象的属性（需要预先知道拦截的key）, 对新增属性无能为力
proxy劫持的是整个对象，劫持场景比defineProperty多


### proxy实现双向绑定


### vue对新增属性无能为力
```html
// vue 2.6.13
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <div id="app">
    <ul>
      <li>a: {{obj.a}}</li>
    </ul>
    <ul>
      <li>b: {{obj.b}}</li>
    </ul>
  </div>
<script>
  console.log(Vue.version); // 2.6.13
  var vm = new Vue({
    el: '#app',
    data() {
      return {
        obj: {
          a: 1
        }
      }
    },
    watch: {
      "obj.a"() {
        console.log("change a !")
      },
      "obj.b": function(){
        console.log("change b !")
      }
    }
  });
  vm.obj.a = 2;
  // vm.obj.b = 5;  // 不支持新增属性绑定
  // 初始化未绑定，方法一
  // vm.$set(vm.obj, "b", 3);  // 不支持设置vm.$data
  // 方法二
  // Vue.set(vm.obj, "b", 4);
</script>
```
```html
// vue  https://v3.cn.vuejs.org/
<script src="./vue.3.0.11.js"></script>
  <div id="counter">
    Counter: {{ counter }}
    Array: {{arr.join(",")}}
    Length: {{ length }}
  </div>
<script>
  // console.log(Vue.version)
  const Counter = {
    data() {
      return {
        counter: 0,
        arr: [1,2]
      }
    },
    // watchEffect(() => console.log(counter)),
    mounted() {
      setInterval(() => {
        this.counter++;
      }, 1000)
    }
  }
  const vm = Vue.createApp(Counter).mount('#counter');
  vm.length = 10;  // 支持新增属性绑定
  vm.arr[5] = 5;
</script>
```

### 




