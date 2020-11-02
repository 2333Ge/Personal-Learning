# React 语法基础

## 列表

元素的 key 只有放在就近的数组上下文中才有意义。
比方说，如果你提取出一个 ListItem 组件，你应该把 key 保留在数组中的这个 <ListItem /> 元素上，而不是放在 ListItem 组件中的 <li> 元素上。
**例子：不正确的使用 key 的方式**

```jsx
function ListItem(props) {
  const value = props.value;
  return (    // 错误！你不需要在这里指定 key：    <li key={value.toString()}>      {value}    </li>
  );}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>    // 错误！元素的 key 应该在这里指定：    <ListItem value={number} />  );
  return (
    <ul>      {listItems}    </ul>
  );}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root'));
```

## Refs

高阶组件,refs 将不会透传下去。这是因为 ref 不是 prop 属性。就像 key 一样，其被 React 进行了特殊处理。如果你对 HOC 添加 ref，该 ref 将引用最外层的容器组件，而不是被包裹的组件。

==forwardRef 没太懂==

## 高阶组件

### [不要在 render 方法中使用 HOC](https://react.docschina.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method)

React 的 diff 算法（称为协调）使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从 render 返回的组件与前一个渲染中的组件相同（===），则 React 通过将子树与新子树进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树。
通常，你不需要考虑这点。但对 HOC 来说这一点很重要，因为这代表着你不应在组件的 render 方法中对一个组件应用 HOC：

```jsx
render() {
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />;}
```

这不仅仅是性能问题 - 重新挂载组件会导致该组件及其所有子组件的状态丢失。
如果在组件之外创建 HOC，这样一来组件只会创建一次。因此，每次 render 时都会是同一个组件。一般来说，这跟你的预期表现是一致的。
在极少数情况下，你需要动态调用 HOC。你可以在组件的生命周期方法或其构造函数中进行调用。

### [复制静态方法](https://react.docschina.org/docs/higher-order-components.html#static-methods-must-be-copied-over)

## JSX

注意是否用了非布尔类型、Null 以及 Undefined 类型

## Render Props

- 注意 render props 和 pure component 一起使用

```jsx
class Mouse extends React.PureComponent {
  // 与上面相同的代码......}
class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/*
          这是不好的！
          每个渲染的 `render` prop的值将会是不同的。
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }}
```

每次 `<MouseTracker> `渲染，它会生成一个新的函数作为 `<Mouse render>` 的 prop，因而在同时也抵消了继承自 `React.PureComponent` 的 `<Mouse>` 组件的效果！
为了绕过这一问题，有时你可以定义一个 prop 作为实例方法，类似这样：

```jsx
class MouseTracker extends React.Component {
  // 定义为实例方法，`this.renderTheCat`始终
  // 当我们在渲染中使用它时，它指的是相同的函数
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

## React 顶层 API

### React.lazy

React.lazy() 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。
你可以在代码分割文档中学习如何使用它。查阅此文章可以了解更多用法细节。

```jsx
// 这个组件是动态加载的
const SomeComponent = React.lazy(() => import("./SomeComponent"));
```

### React.forwardRef

React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：

- 转发 refs 到 DOM 组件
- 在高阶组件中转发 refs
  React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {" "}
    {props.children}{" "}
  </button>
));
// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

在上述的示例中，React 会将 <FancyButton ref={ref}> 元素的 ref 作为第二个参数传递给 React.forwardRef 函数中的渲染函数。该渲染函数会将 ref 传递给 `<button ref={ref}>` 元素。
因此，当 React 附加了 ref 属性之后，ref.current 将直接指向 `<button>` DOM 元素实例。
欲了解更多相关信息，请参阅 refs 转发。

### React.Children.toArray

```jsx
React.Children.toArray(children);
```

将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。

### React.Suspense

React.Suspense 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件。目前，懒加载组件是 <React.Suspense> 支持的唯一用例：

```jsx
// 该组件是动态加载的 const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

它已被收录在了我们的代码分割指南中。请注意，lazy 组件可以位于 Suspense 组件树的深处——它不必包装树中的每一个延迟加载组件。最佳实践是将 <Suspense> 置于你想展示加载指示器（loading indicator）的位置，而 lazy() 则可被放置于任何你想要做代码分割的地方。

## React 术语

https://react.docschina.org/docs/glossary.html

## Hook

### useState

### useEffect

- 产生副作用
  ```jsx
  import React, { useState, useEffect } from "react";
  function Example() {
    const [count, setCount] = useState(0);
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });
    return (
      <div>
        {" "}
        <p>You clicked {count} times</p> <button
          onClick={() => setCount(count + 1)}
        >
          {" "}
          Click me{" "}
        </button>{" "}
      </div>
    );
  }
  ```
  useEffect 做了什么？ 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。在这个 effect 中，我们设置了 document 的 title 属性，不过我们也可以执行数据获取或调用其他命令式的 API。
- 清除时的调用
  如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它

```jsx
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

- 跳过 Effect 进行优化

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

### 自定义 Hook

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。 例如，下面的 useFriendStatus

- 定义

```jsx
import { useState, useEffect } from "react";
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

- 使用

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);
  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);
  const color = isOnline ? "green" : "black";
  return <li style={{ color }}> {props.friend.name} </li>;
}
```

## Hook API

### useEffect

#### effect 的执行时机

与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

### useLayoutEffect

会在所有的 DOM 变更之后同步调用 effect

### useRef

useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式。
这是因为它创建的是一个普通 Javascript 对象。而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。

### [Hook 常见问题](https://react.docschina.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate)
