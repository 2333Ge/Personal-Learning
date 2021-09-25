/**
 * 《React进阶指南》-第八章demo
 */
import React, { Suspense, useState } from "react";
import LazyC from "./RandomComponent";

/**
 * todo: 没看懂
 */
function UserInfo() {
  // 获取用户数据信息，然后再渲染组件。
  // const [data, changeData] = useState("初始数据");
  //  getData().then((res) => {
  //   changeData(res);
  // });
  // const user =  undefined;
  const data = getData();
  return <p>{data}</p>;
}
/**
 * 异步加载demo
 */
function AsyncDemo() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <h1>《React进阶指南》-第十二章demo</h1>
      <UserInfo />
    </Suspense>
  );
}

const LazyComponent = React.lazy(() => import("./RandomComponent"));

function LazyDemo() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// 父组件
export default function DemoList() {
  return (
    <div>
      <h1>《React进阶指南》-第十二章demo</h1>
      <AsyncDemo />
      <LazyDemo />
      <LazyC />
      <NetWordDemo /> 
    </div>
  );
}

const getData = () => {
  return "延迟数据";
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve("延迟数据");
  //   }, 10000);
  // });
};

let status = "pending";
let result;  
const data = new Promise((resolve) => setTimeout(() => resolve("结果"), 1000));

function wrapPromise(promise) {
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  if (status === "pending") {
    throw suspender;
  } else if (status === "error") {
    throw result;
  } else if (status === "success") {
    return result;
  }
}

function App() {
  const state = wrapPromise(data);

  return <div>{state}</div>;
}

class NetWordDemo extends React.Component {
  render() {
    return (
      <React.Suspense fallback={<div>loading...</div>}>
        <App />
      </React.Suspense>
    );
  }
}
