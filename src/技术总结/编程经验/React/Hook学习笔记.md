# 前言

学习过程中需要注意

1. Hook 原理
2. 和 class 区别
3. class => hook 转变注意事项
4. 对应 Hook 的使用场景
5. 相比 class 的优点

# 什么是 Hook

Hook 是一些可以让你在**函数组件**里“钩入” **React state 及生命周期**等特性的**函数**

# [为什么使用 Hook](https://zh-hans.reactjs.org/docs/hooks-intro.html#motivation)

- 组件间复用状态逻辑困难：在无需修改组件结构的情况下复用状态逻辑，详见[自定义 Hook](https://react.docschina.org/docs/hooks-custom.html)
- 复杂组件变得难以理解 ：Hook 将组件中相互关联的部分拆分成更小的函数
- class 难以理解： Hook 使你在非 class 的情况下可以使用更多的 React 特性：React 组件一直更像是函数。而 Hook 则拥抱了函数

# 不使用 Hook 影响

Hook 没有破坏性改动,使用 Hook 不会对已有程序造成影响，[详见](https://react.docschina.org/docs/hooks-intro.html#no-breaking-changes)

# useState

- 数组解构语法使调用 useState 可以给 state 取不同的名字

## 常见问题

1.  props 更新时需要更新 state 的情况
2.  函数式写法：更新后的 state 通过先前的 state 计算得出
3.  class 中 setState 回调怎么写

```js
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
}
```

# useEffect

effect 优化注意事项：确保数组中包含了所有**外部作用域**中会**随时间变化**并且在 **effect 中使用的变量**

React 会等待浏览器完成画面渲染之后才会延迟调用

## 无需清除的 effect

- 在 React 更新 DOM 之后运行一些额外的代码。

- 使用场景 eg：发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作

- useEffect 做了什么: 告诉 React 组件需要在渲染后执行某些操作

- useEffect 会在每次渲染后都执行吗： 它在第一次渲染之后和每次更新之后都会执行。

- 为什么在组件内部调用 useEffect：可以在 effect 中直接访问 state(作用域) 变量

## 需要清除的 effect

如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它

- React 何时清除 effect: React 会在组件卸载的时候执行清除操作

### 常见问题

1. class 组件中在 componentDidMount 中取 props 中的数据，若 props 更新的话（[示例][why-update-effect]）

```js
componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

2. useEffect 中使用延时函数时

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // 这个 effect 依赖于 `count` state
      // setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` 没有被指定为依赖

  return <h1>{count}</h1>;
}
```

在 setInterval 的回调中，count 的值不会发生变化。因为当 effect 执行时，我们会创建一个闭包，并将 count 的值被保存在该闭包当中，且初值为 0。每隔一秒，回调就会执行 setCount(0 + 1)，因此，count 永远不会超过 1。

# useRef

类比 class 组件中的变量

<!-- toast reload 栗子 -->

## 问题

### 和普通声明一个 let 变量有啥区别

- 普通变量在每次渲染都会创建一个新的实例，useRef 在组件生命周期中保持唯一

相关资料：[闭包][closure]
「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包

### 和 useState 异同点

- 相同点：都能保证组件多次渲染是值不变
- 不同点：useState 变量改变会导致重新渲染

### 为什么 useRef 能够直接塞给组件的 ref

```ts
interface RefObject<T> {
  readonly current: T | null;
}
```

# [useImperativeHandle][useimperativehandle]

自定义暴露给父组件的实例值,配合 forwardRef 使用,类比 class 组件中的 public 属性

[useimperativehandle]: https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
[closure]: https://zhuanlan.zhihu.com/p/22486908
[why-update-effect]: https://zh-hans.reactjs.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update
