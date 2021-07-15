# react hooks
[TOC]
## 一. 什么是 Hooks
react一直提倡使用函数组件，但函数组件没有实例，没有生命周期函数。
hooks就是加了声明周期和状态管理

## 二. hooks解决了哪些问题？
1. 类组件的不足
状态逻辑难复用
逻辑负责难以维护
this 指向问题

2. Hooks 优势
能优化类组件的三大问题
能在无需修改组件结构的情况下复用状态逻辑（自定义 Hooks ）
能将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）
副作用的关注点分离
```text
副作用指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生dom 元素、
本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。以往这些副作用都
是写在类组件生命周期函数中的。而 useEffect 在全部渲染完毕后才会执行，useLayoutEffect
会在浏览器 layout 之后，painting 之前执行。
```

## 三. 注册事项
- 只能在函数内部的最外层调用 Hook，不要在循环、条件判断或者子函数中调用
- 只能在 React 的函数组件中调用 Hook，不要在其他 JavaScript 函数中调用

## 四. useState
```jsx
// 数组解构
const [state, setState] = useState(initialState);
```
每次setState都会重新渲染dom，怎么优化?
<!-- 父组件减少重渲染 -->
```git
git reset --hard bb96f5f3af255c0a88aa155c3927f1d83e11fdd0
```

## 五.

















