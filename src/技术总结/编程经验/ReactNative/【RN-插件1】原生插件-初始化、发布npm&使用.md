#【RN-插件 1】原生插件-初始化、发布 npm&使用

## 1 目标

发布自己的原生-RN 插件，实现能通过 npm i 装上并使用

## 2 利用工具

react-native-create-library

## 3 流程概述

### （1）安装 react-native-create-library

```
npm install -g react-native-create-library
```

### （2）初始化项目

```
react-native-create-library ychTest
```

### （3）编写原生代码

简单写个原生 toast

- 打开初始化的项目内的 android 目录
- 编写 module 文件（供 RN 调用的方法）如下
- 其余文件不需要更改、包括 RN 端
  ![](../../../image/技术总结/RN/PlugIn/plugIn1-1.png)

```java
public class RNYchTestModule extends ReactContextBaseJavaModule {
private final String DURATION_SHORT_KEY = "SHORT";
private final String DURATION_LONG_KEY = "LONG";
...
@Override
public String getName() {
return "RNYchTest";
}
@Override
/*
    可选方法，用于返回了需要导出给 JavaScript 使用的常量
  \*/
  public Map<String, Object> getConstants() {
  final Map<String, Object> constants = new HashMap<>();
  constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
  constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
  return constants;
  }
  @ReactMethod
  public void show(String message, int duration) {
  Toast.makeText(getReactApplicationContext(), message, duration).show();
  }
  ...
  }
```

### （4）上传项目到 github

### （5）发布到 npm

#### A 切换 npm 源到https://registry.npmjs.org/

#### B 创建账户

创建账户会校验各种信息是否重复等
用 npm adduser 创建时查看失败原因较不方便，建议上官网注册

### C 登录

```
npm login
```

#### D 上传

- 第一次上传
  npm publish
- 出现下面问题时登录邮箱邮箱验证注册信息
  ![](../../../image/技术总结/RN/PlugIn/plugIn1-2.png)

#### E 使用

- 在现有 RN 项目中执行

```
  npm i react-native-ych-test
```

- 链接原生库

  - react-native link

  ```
    react-native link react-native-ych-test
  ```

  - 或者 `setting.gradle` 文件中

    ```java
    include ':react-native-ych-test'
    project(':react-native-ych-test').projectDir = new File(rootProject.projectDir,         '../node_modules/react-native-ych-test/android')
    ```

- Android 原生重新编译运行
- import & 调用

```jsx
  import T from 'react-native-ych-test';
  ...
  <Text
    onPress={() => {T.show("自定义原生插件", T.SHORT);}}
  >
  自定义插件
</Text>
```

#### F 结果

弹窗成功
![](../../../image/技术总结/RN/PlugIn/plugIn1-3.png)

# 参考文献

[1] [开发自己的 react-native 组件并发布到 npm](https://www.jianshu.com/p/091a68ea1ca7)  
[2] [链接原生库](https://reactnative.cn/docs/linking-libraries-ios.html)

# 附录

- 插件 git 地址：https://github.com/2333Ge/npmTest2.git
- 测试项目地址：https://github.com/2333Ge/RNLearning2.git
- 下一章：[【RN-插件 2】原生视图](./【RN-插件2】原生视图插件.md)
