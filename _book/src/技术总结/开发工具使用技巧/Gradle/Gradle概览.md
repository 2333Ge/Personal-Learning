Gradle

# 入门

## gradle.properties

https://docs.gradle.org/current/userguide/build_environment.html
从它的名字可以看出，这个文件中定义了一系列“属性”。实际上，这个文件中定义了一系列供 build.gradle 使用的常量，比如 keystore 的存储路径、keyalias 等等。

## gradlew 与 gradlew.bat

gradlew 为 Linux 下的 shell 脚本，gradlew.bat 是 Windows 下的批处理文件。gradlew 是 gradle wrapper 的缩写，也就是说它对 gradle 的命令进行了包装，比如我们进入到指定 Module 目录并执行“gradlew.bat assemble”即可完成对当前 Module 的构建（Windows 系统下）。

## local.properties

从名字就可以看出来，这个文件中定义了一些本地属性，比如 SDK 的路径。

## settings.gradle

假如我们的项目包含了不只一个 Module 时，我们想要一次性构建所有 Module 以完成整个项目的构建，这时我们需要用到这个文件。比如我们的项目包含了 ModuleA 和 ModuleB 这两个模块，则这个文件中会包含这样的语句：include ':ModuleA', ':ModuleB'。

## 工程 build.gradle

- 用于添加子工程或模块共用的配置项。

```
buildscript {
    repositories {
        jcenter() //构建脚本中所依赖的库都在jcenter仓库下载
    }
    dependencies {
        //指定了gradle插件的版本
        classpath 'com.android.tools.build:gradle:1.5.0'
    }
}

allprojects {
    repositories {
        //当前项目所有模块所依赖的库都在jcenter仓库下载
        jcenter()
    }
}
```

## app 模块的 build.gradle

- 声明 module 模块类型：Android 应用程序还是库
  - apply plugin: 'com.android.application'：应用“com.android.application“这个插件来构建 app 模块（常在首行）
  - assemble: 构建项目的输出（apk）
  - check: 进行校验工作
  - build: 执行 assemble 任务与 check 任务
  - clean: 清除项目的输出

```
//加载用于构建Android项目的插件
apply plugin: 'com.android.application'

android { //构建Android项目使用的配置
    compileSdkVersion 23 //指定编译项目时使用的SDK版本
    buildToolsVersion "23.0.1" //指定构建工具的版本

    defaultConfig {
        applicationId "com.absfree.debugframwork" //包名
        minSdkVersion 15  //指定支持的最小SDK版本
        targetSdkVersion 23 //针对的目标SDK版本
        versionCode 1
        versionName "1.0"
    }
    buildTypes { //针对不同的构建版本进行一些设置
        release { //对release版本进行的设置
            minifyEnabled false //是否开启混淆
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'  //指定混淆文件的位置
        }
    }
}

dependencies { //指定当前模块的依赖
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.1.1'
    compile 'com.android.support:design:23.1.1'
}
```

## 常见配置

### 构建输出为 aar 文件

通常我们构建的输出目标都是 apk 文件，但如果我们的当前项目时 Android Library，我们的目标输出就是 aar 文件。要想达到这个目的也很容易，只需要把 build.gradle 的第一句改为如下：
apply plugin:'com.android.library'
这话表示我们使用的插件不再是构建 Android 应用的插件，而是构建 Android Library 的插件，这个插件定义并执行用于构建 Android Library 的一系列 Task。
自动移除不再使用的资源

```
android {
    ...
    }
    buildTypes {
        release {
            ...
            shrinkResources true
            ...
        }
    }
}
```

### 忽略 Lint 错误

在我们构建 Android 项目的过程中，有时候会由于 Lint 错误而终止。当这些错误来自第三方库中时，我们往往想要忽略这些错误从而继续构建进程。这时候，我们可以只需进行如下配置：

```
android {
    ...
    lintOptions {
        abortOnError false
    }
}
```

### 密码等信息存放

真实开发中，我们不应该把密码等信息直接写到 build.gradle 中，更好的做法是放在 gradle.properties 中设置：

```
RELEASE_STOREFILE=xxx.jks
RELEASE_STORE_PASSWORD = xxx
RELEASE_KEY_ALIAS=xxx
RELEASE_KEY_PASSWORD=xxx

 // 然后在build.gradle中直接引用即可：


signingConfigs {
    myConfig {
        storeFilefile(RELEASE_STOREFILE)
        storePassword RELEASE_STORE_PASSWORD
        keyAlias RELEASE_KEY_ALIAS
        keyPassword RELEASE_KEY_PASSWORD
    }
}
```

# 进阶

## 构建加速

[官方](https://developer.android.google.cn/studio/build/optimize-your-build#optimize)

## 开启离线模式

- Android studio 3.6 以后
  ![](../../..//image/技术总结/Gradle/gradle1.png)
- 3.6 以前
  ![](../../..//image/技术总结/Gradle/gradle2.png)

## 升级到最新的 GRADLE 和 JDK

好处不必说，不兼容的情况下采用 wrapper 的方式很好的解决了这个问题，每个项目采用独立的 GRADLE 版本。在你的项目目录下找到这个文件

```
gradle/wrapper/gradle-wrapper.properties
```

并修改

```
distributionUrl=https://services.gradle.org/distributions/gradle-2.11-all.zip
```

到你想升级的版本就可以了。

## 使用 daemon

构建初始化的很多工作是关于 java 虚拟机的启动，加载虚拟机环境，加载 class 文件等，如果这些动作交给一个单独的后台进程去做，那么，第一次初始化之后的修改代码再构建是不是可以节省很多时间呢？答案是肯定的，通过在**gradle.properties**加入这样一句来开启，如果想让修改全局所有项目都生效，那么修改这个文件**~/.gradle/gradle.properties**

```
org.gradle.daemon=true
```

## 依赖库使用固定版本

用”+”来通配一个版本族，这样有个好处是 maven 上有新库了，不用你操心升级，GRADLE 编译的时候自动升级了，但是带来了两个坏处，一是，有可能新版库的接口改了，导致编译失败，这个时候需要修改代码做升级适配；更大的坏处是，每次 GRADLE 编译完整的项目，都会去 maven 上试图拉取最新的库，这样，拖慢了编译速度，尤其在网络非常差的时候，所以，为了构建速度，建议写死依赖库的版本号。

## 减少编译脚本 I/O 操作

有时候，编译脚本中会有一些代码做动态信息的获取，比如想从 git 中获取一个数字作为版本号

```
def cmd = 'git rev-list HEAD --first-parent --count'
def gitVersion = cmd.execute().text.trim().toInteger()
android {
defaultConfig {
versionCode gitVersion
}
}
```

其实这个操作主要是为了在构建的机器上为了发布版本而做的，日常环境研发调试无需这样，所以可以优化成如下方式：

```
def gitVersion() {
if (!System.getenv('CI_BUILD')) {
// don't care
return 1
}
def cmd = 'git rev-list HEAD --first-parent --count'
cmd.execute().text.trim().toInteger()
}
android {
defaultConfig {
versionCode gitVersion() } }
```

## 并行构建模块化项目

将你的项目拆分成多个子项目并开启并行构建也是一个不错的主意，比如将相对独立的模块拆分成独立的库工程(Library projects)，主工程(Application project)依赖这些库工程，这样的话，开启并行构建才会发挥作用。并行构建开启方式是修改文件 gradle.properties，加入如下行：

```
org.gradle.parallel=true
```

## 更多

可参考

- https://www.jianshu.com/p/e45faaec1df0

# 基础配置

## 全局变量定义&引用
在顶层 build.gradle 脚本中定义一些全局变量，提供给子脚本引用
```
ext {
// global variables definition
compileSdkVersion = 'Google Inc.:Google APIs:23'
buildToolsVersion = "23.0.3"
minSdkVersion = 14
targetSdkVersion = 23
}
```
子脚本引用
```
android {
compileSdkVersion rootProject.ext.compileSdkVersion
buildToolsVersion rootProject.ext.buildToolsVersion

      defaultConfig {
          minSdkVersion rootProject.ext.minSdkVersion
          targetSdkVersion rootProject.ext.targetSdkVersion
      }

}
```
## 打包选项
有时候引用的三方库会带有一些配置文件 xxxx.properties,或者 license 信息，打包的时候想去掉这些信息，就可以这样做
```
android {
packagingOptions {
exclude 'proguard-project.txt'
exclude 'project.properties'
exclude 'META-INF/LICENSE.txt'
exclude 'META-INF/LICENSE'
exclude 'META-INF/NOTICE.txt'
exclude 'META-INF/NOTICE'
exclude 'META-INF/DEPENDENCIES.txt'
exclude 'META-INF/DEPENDENCIES'
}
}
```
## 编译配置
### bulid.gradle - dependencies
详见：https://developer.android.google.cn/studio/build/dependencies#native_dependencies
#### 本地库模块依赖项
```
implementation project(':mylibrary')
```
这声明了对一个名为“mylibrary”（此名称必须与在您的 settings.gradle 文件中使用 include: 定义的库名称相符）的 Android 库模块的依赖关系。在构建您的应用时，构建系统会编译该库模块，并将生成的编译内容打包到 APK 中。
#### 本地二进制文件依赖项
```
implementation fileTree(dir: 'libs', include: ['*.jar'])
```
Gradle 声明了对项目的 module_name/libs/ 目录中 JAR 文件的依赖关系（因为 Gradle 会读取 build.gradle 文件的相对路径）。
或者，您也可以按如下方式指定各个文件：
```
implementation files('libs/foo.jar', 'libs/bar.jar')
```
#### 远程二进制文件依赖项
```
implementation 'com.example.android:app-magic:12.3'
```
这实际上是以下代码的简写形式：
```
implementation group: 'com.example.android', name: 'app-magic', version: '12.3'
```
### 依赖项配置
#### 集成项目时可能出现的问题

- compileOnly：解决依赖冲突，如版本不统一
- 与变体匹配相关的构建错误：https://developer.android.google.cn/studio/build/dependencies#resolve_matching_errors
  排除传递依赖项
  随着应用的范围不断扩大，它可能会包含许多依赖项，包括直接依赖项和传递依赖项（应用中导入的库所依赖的库）。如需排除不再需要的传递依赖项，您可以使用 exclude 关键字，如下所示：
```
  dependencies {
  implementation('some-library') {
  exclude group: 'com.example.imgtools', module: 'native'
  }
  }
```
### 远程代码库
```
allprojects {
repositories {
google()
jcenter()
}
}
```
### 合并 manifest
APK 文件只能包含一个 AndroidManifest.xml 文件，但 Android Studio 项目可以包含多个清单文件，这些清单文件由主源代码集、构建变体和导入的库提供。因此，在构建应用时，Gradle 构建系统会将所有清单文件合并到一个打包在 APK 中的清单文件中。
查看模块依赖项
一些直接依赖项可能具有自己的依赖项。此类依赖项称为“传递依赖项”。
下列方法可用来列出 Gradle 为给定模块解析的依赖项
|
|
修复依赖项解析错误

- 检查哪些依赖导致了错误，通过上述方法检查依赖树。
- 如果无法轻松识别重复的依赖项，请尝试使用 Android Studio 的界面搜索包含重复类的依赖项，具体操作步骤如下

1. 从菜单栏中依次选择 Navigate > Class。
2. 在弹出式搜索对话框中，确保已勾选 Include non-project items 旁边的框。
3. 输入出现在构建错误中的类的名称。
4. 检查结果以查找包含该类的依赖项。
   修复重复类错误
   Program type already present com.example.MyClass
   此错误通常是下列其中一种情况所致：

- 二进制文件依赖项包含一个库，该库也作为直接依赖项包含在您的应用中。例如，您的应用声明直接依赖于库 A 和库 B，但库 A 已在其二进制文件中包含库 B。
  - 如需解决此问题，请取消将库 B 作为直接依赖项。
- 您的应用的本地二进制文件依赖项和远程二进制文件依赖项是同一个库。
  - 如需解决此问题，请移除其中一个二进制文件依赖项。
    修复类路径冲突
    Conflict with dependency 'com.example.library:some-lib:2.0' in project 'my-library'.
    Resolved versions for runtime classpath (1.0) and compile classpath (2.0) differ.
- 将所需版本的依赖项作为 api 依赖项添加到库模块。也就是说，只有库模块声明相应依赖项，但应用模块也能以传递方式访问其 API。
- 或者，您也可以同时在两个模块中声明相应依赖项，但应确保每个模块使用的版本相同。不妨考虑配置项目全局属性，以确保每个依赖项的版本在整个项目中保持一致。
  自定义依赖项解析策略
  android {
  applicationVariants.all { variant ->
  // Return compile configuration objects of a variant.
  variant.getCompileConfiguration().resolutionStrategy {
  // Use Gradle's ResolutionStrategy API
  // to customize how this variant resolves dependencies.
  ...
  }
  // Return runtime configuration objects of a variant.
  variant.getRuntimeConfiguration().resolutionStrategy {
  ...
  }
  // Return annotation processor configuration of a variant.
  variant.getAnnotationProcessorConfiguration().resolutionStrategy {
  ...
  }
  }
  }
  Gradle 提示与技巧

名词解释
api & implementation
https://www.jianshu.com/p/8962d6ba936e
https://developer.android.google.cn/studio/build/dependencies?hl=zh_cn#dependency_configurations
implementation 依赖和本地依赖略有不同，远程在第二层进行隔离

附 1 参考文献
[1] 十分钟理解 Gradle
[2] GRADLE 构建最佳实践
[3] 深入理解 Android 之 Gradle
[4] https://gradle.org/
[5] https://developer.android.google.cn/studio/build/gradle-tips?hl=zh_cn
[6] https://developer.android.google.cn/studio/build?hl=zh_cn
