# 【RN-插件 2】原生视图插件

# 1 目标

结合上一次【RN-插件 1】原生插件-初始化、发布 npm&使用 的联系，结合之前学 RN 利用原生组件知识，创建一个简单的原生视图插件

# 2 流程概述

## (1) 原生部分

### A 实现 ViewManager

- 在插件项目中 src 目录下创建一个类继承 ViewManager

```java
...
class AndButton extends SimpleViewManager<Button> {
...
    @Override
    public String getName() {
        return "AndBtn";
    }

    @Override
    protected Button createViewInstance(ThemedReactContext reactContext) {
        Button b = new Button(reactContext);
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        b.setLayoutParams(params);
        b.setText("按钮");
        return b;
    }
    @ReactProp(name = "text")
    public void setText(Button btn, @Nullable String str) {
        btn.setText(str);
    }
}
```

### B 注册组件

在上一个 package 中注册 ViewManager

```java
...
class RNYchTestPackage implements ReactPackage {
  ...
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new AndButton(reactContext));
}
```

## (2) RN 部分

### A 导出定义的组件

在 index 文件下添加下面的代码

```js
import { requireNativeComponent } from "react-native";
const AndBtn = requireNativeComponent("AndBtn");
export { AndBtn };
```

### (3) 上传

- 上传 GitHub
- 改版本号上传 npm

```
npm version 1.0.1
npm publish
```

### (4) 使用

- 更新版本 1.0.1

```jsx
import { AndBtn } from 'react-native-ych-test';
 ...
<AndBtn text='原生视图插件'  />
...
```

# 4 总结

- 总体流程和上章差不多，只是增加了视图部分代码，和插件的利用关系不大
- 分别在两个项目中进行插件的编写和自测十分不合理，在下次练习中将把 demo 集成在插件项目中

# 参考文献

[1] [原生 UI 组件](https://reactnative.cn/docs/native-components-android/)

# 附录

- 插件 git 地址：https://github.com/2333Ge/npmTest2.git
- 测试项目地址：https://github.com/2333Ge/RNLearning2.git
- 上一章：[【RN-插件 1】原生插件-初始化、发布 npm&使用](./【RN-插件1】原生插件-初始化、发布npm&使用.md)
