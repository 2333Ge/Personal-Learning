/**
 * 《React进阶指南》-第八章demo
 */
import React, { useState } from "react";
import { getRandomRgbaColor } from "../../utils/random";

const ThemeContext = React.createContext(null);

ThemeContext.displayName = "ThemeC";

/**
 * consumer-contextType写法
 */
class ContextTypeDemo extends React.Component {
  render() {
    console.log("contextType---->render");
    const { color, background } = this.context;
    return <div style={{ color, background }}>contextType消费者</div>;
  }
}
ContextTypeDemo.contextType = ThemeContext;

class Other extends React.Component {
  render() {
    console.log("other---->render");
    return <div>other</div>;
  }
}

class ConsumerFuncDemo extends React.Component {
  render() {
    console.log("func---->render");
    return (
      <div>
        <Other />
        <ThemeContext.Consumer>
          {({ color, background }) => {
            return <div style={{ color, background }}>func消费者</div>;
          }}
        </ThemeContext.Consumer>
      </div>
    );
  }
}
// 在 Provider 里 value 的改变，会使引用contextType,useContext 消费该 context 的组件重新 render ，同样会使 Consumer 的 children 函数重新执行，与前两种方式不同的是 Consumer 方式，当 context 内容改变的时候，不会让引用 Consumer 的父组件重新更新。
// !注意此时React.memo的作用

const MemoContextDemo = React.memo(() => <ContextTypeDemo />);
const MemoFucDemo = React.memo(() => <ConsumerFuncDemo />);

const Provider = () => {
  const [value, changeValue] = useState({ color: "#f0f", background: "#ff0" });
  return (
    <ThemeContext.Provider value={value}>
      <h1>《React进阶指南》-第八章demo</h1>
      {/* <ContextTypeDemo />
      <ConsumerFuncDemo /> */}
      <MemoContextDemo />
      <MemoFucDemo />
      <button
        onClick={() => {
          changeValue({
            color: getRandomRgbaColor(),
            background: getRandomRgbaColor(),
          });
        }}
      >
        test
      </button>
    </ThemeContext.Provider>
  );
};

export default Provider;
