# 小记

- 脚手架安装&初始化

```
npm install -g yo generator-code
// 工作区
yo code
```

- F5 运行
  - 失败、重新安装 15.0 以上 VSCode

# 目录解释

## package.json

- name和publisher： VS Code <publisher>.<name>用作插件的唯一 ID
- main：插件入口文件
- engines.vscode：这指定了扩展所依赖的 VS Code API 的最低版本。

```
{
  "name": "helloworld-sample",
  "displayName": "helloworld-sample",
  "description": "HelloWorld example for VS Code",
  "version": "0.0.1",
  "publisher": "vscode-samples",
  "repository": "https://github.com/microsoft/vscode-extension-samples/helloworld-sample",
  "engines": {
    "vscode": "^1.51.0"
  },
  "categories": ["Other"],
  "activationEvents": ["onCommand:extension.helloWorld"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "extension.helloWorld",
        "title": "Hello World"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./"
  },
  "devDependencies": {
    "@types/node": "^8.10.25",
    "@types/vscode": "^1.51.0",
    "tslint": "^5.16.0",
    "typescript": "^3.4.5"
  }
}

```
## 入口文件

导出两个函数、activate和deactivate。activate当您注册的激活事件发生时执行。deactivate让您有机会在您的扩展程序被停用之前进行清理。

# api

- 弹窗

```
	vscode.window.sho wInformationMessage('我的 HelloWorld');
```

# 参考资料

- [官网](https://code.visualstudio.com/api)
- [官网-api](https://code.visualstudio.com/api/references/vscode-api)
- http://blog.haoji.me/vscode-plugin-hello-world.html
