# Activity 生命周期和启动模式

## 生命周期

- 注意 restart
- 新 activity 采用透明主题，当前 activity 不会调用 onstop
- 启动新 activity，新的 onResume 和旧的 onPause 那个先执行
  - 旧的 onPause 先执行
  - 尽量在 onStop 中做操作，从而使得 Activity 尽快显示并切换到前台
- onSaveInstance 在 onStop 之前和 onPause 没必然联系
- onRestoretore 在 onStart 之后
- 保存和恢复 view 的层次结构 p10

  - activity 意外终结时调用 onsaveInstance 保存数据，委托 window，window 委托顶层容器（通常 DecorView）保存数据。顶层容器一一通知子元素保存数据

- 内存不足时资源回收顺序

1. 空进程（没和应用程序组件绑定）
2. 后台 activity
3. service
4. 可见非前台 activity
5. 前台 activity

## 启动模式

- standard 模式

  - standard 模式默认进入启动他的 activity 的任务栈中
  - 非 activity 类型的 context 无任务栈，故用此类 context 启动 standard activity 会出错
  - 解决上述问题的办法，为待启动 activity 制定 FLAG_ACTIVITY_NEW_TASK 标志位，相当于 singleTask

- singleTop
  - 栈顶复用，栈顶已经存在调用 onNewIntent 方法
- singleTask
  - 栈内复用，先查找只当任务栈，栈内已存在调用 onNewIntent 方法
- singleInstance
  - singleTask+只能单独存在于一任务栈中
  - ✳ 注意后台任务栈多后台任务切换到前台的情况 p18
- TaskAffinity 属性

  - 指定任务栈
  - 主要和 singleTask 和 allowTaskReparenting 属性搭配（与 allowTaskReparenting 搭配的情况见 p20）

- 如何给 activity 指定启动模式
  - menifest
  - intent 添加 flag(addFlags 方法)，两种方法均有时，以第二种方法为准
  - 第一种方法无法指定 FLAG_CLEAR_TOP 属性，第二种方法无法指定 singleInstance
  - 各种各样的标志位及其使用（可用于启动模式的转换）p27
- intent 隐式调用和显式调用时以显示为主
- intent 的匹配模式 p29
  - action，其中一个，不区分大小写（必须有）
  - category，intent 中所有 category 必须和其中一个 category 匹配（可以没，默认加上 default category）
  - data,mimeType+URI
    - intent 指定完整的 data 必须调用 setDataAndType 方法，因为 setData 和 setType 方法会清空彼此的值。
- 隐式启动时的判断方法 activity 是否能够匹配 intent 的两种方法 p34
  - PackageManager 的 resolveActivity（最佳匹配）,queryActivitys（所有成功匹配项）
  - 或者 Intent 的 resolveActivity
  - 匹配失败均返回 null

# IPC

- 可以通过多进程获取多分内存空间
- 组件指定 process 属性使用多进程
  - ：+进程名=包名+当前进程名，是当前应用私有进程，其他组件不能和它跑在一个进程里面
  - 完整名字，全局进程，其他应用通过 shareUID 可以和它跑在同一进程里面
    - shareUID:每个应用唯一，UID 相同才能共享数据
- Android 为每一个应用或进程分配了一个独立的虚拟机，导致不同虚拟机中访问同一对象会产生多个副本。
- 多进程造成的问题 p40
  - 静态成员/单例无效。不是一块内存，不是一个对象
  - 线程同步机制失效，同上
  - sharedPreference 可靠性下降，读写 XML 文件
  - Applicetion 多次创建。分配虚拟机即创建新的 application
- 实现进程间通信方式 p42
  - intent、共享文件、sharedPrefrence、基于 Binder 的 Messenger 和 AIDL、socket、contentProvider
- 序列化
  - serializable 接口
    - id 作用 p42
    - static、transient 关键字标记的成员变量不参与序列化
  - parcelable 接口
  - 两种方式取舍 p47

## Binder

- 各种方法的意义 p53
- RPC 远程过程调用

## Messenger 的使用 p65

## AIDL P73

- 自定义的 Parcelable 对象，必须显示的 import 进来，不管是否和当前 AIDL 文件处于一个文件夹
- AIDL 用到自定义的 Parcelable 对象，必须新建一个同名 AIDL 文件，并在其中声明它为 Parcelable 类型
- aidl 除基本类型的参数，需要标上方向
- RemoteBackListener p84
- Binder 是可能意外死亡的，两种重连服务的方式 P89
  - onServiceDisconnected，UI 线程
  - DeathRecipient 监听，Binder 线程池
- 权限认证 p90

# View

- 位置
  - Left、right...都是相对父布局（原始）
  - x、y (真实)
  - translationX(偏移)
- TouchSlop 系统能被识别出的被认为是滑动的最小距离
  - ViewConfiguration.get(getContext()).getScaledTouchSlop();
- Velocity 速度 p126
  - 在 onTouchEvent 中追踪
  - 不使用时 clear 方法重置、recycle 方法回收
- GestureDetector 手势监听 p127
- Scroller 弹性滑动对象 p128、p137

  - startScroll 本身没有做绘制操作，所以后面常接 computeScroll 方法
  - computeScroll 方法是 view 中的一个空实现，需要自己实现。view 在重绘后会在 draw 方法中调用 couputeScroll 方法，couputeScroll 方法又会去向 Scroller 获取当前的 scrollX 和 scrollY，然后通过 srcollTo 方法实现滑动，通过 postInvalidate 方法实现二次重绘，和一次重绘一样会导致 computeScroll 方法被调用，如此反复，直至滑动结束。

- 实现滑动的三种方式
  scrollTo、scrollBy 内容
  - 改变 layoutParams 使重新布局
  - 施加平移效果（动画）
- View 的事件分发机制 P140
  - 事件序列
    - 手指接触屏幕到手指离开屏幕
  - dispatch...
    - 分发，事件能传递到当前 view,则一定会被调用，返回结果表示是否消耗，受 onTouch...和下级 View 的 dispatch 影响
  - onIntercept...(注意读法)
    - 返回结果表示是否拦截，如果拦截，同一事件序列此方法不会再次调用
  - onTouch...
    - 处理点击，返回结果表示是否消耗，不消耗，同一事件序列中，当前 View 无法再次接受到事件。
- 伪码表示 P141
- onTouchListener 先于 onTouchEvent 调用
- 相关结论 p142

  - 正常情况下一个事件序列之只能被一个 view 消耗
  - 如果拦截，同一事件序列此方法不会再次调用，均交给该 view 处理
  - view 不消耗 ACTION_DOWN,同一事件序列交给父元素处理
  - viewGroup 默认不拦截
  - view 默认消耗，除非不可点击（click、longClick 同时 false）
  - onclick 前提可点击、收到 on、up 事件

# View 的工作原理

- measure 过程
  - 子元素 measureSpec 由父容器 measureSpec 和子元素 layoutParams
  - 重写 view 需要注意处理 wrap_content 和 padding
  - 获取宽高 p190
    - view 的 measure 过程和 activity 的生命周期并不是同步的，故生命周期中获取宽高可能为 0，故获取宽高应该采取下面的方法
    - onWindowFoucusChanged.
      - 获取、失去焦点时调用
    - view.post(runnable)
      - 投递到消息队列尾，Looperd 调用 runnable 时，View 已经初始话好
    - viewTreeObserver 的回调方法
      - view 树的状态发生改变或内部 view 可见性发生改变时，onClobalLayout 方法将会回调，是获取 view 宽高的好机会
    - 手动调用 measure 方法
- layout 过程
  - layout 方法确定 view 位置（里面主要 setFrame 方法设置 4 个定点），onLayout 方法（里面主要通过 setChildFrame 调用子元素的 layout 方法）确定子元素位置
  - 测量宽高在 measure 过程、最终宽高在 layout 过程，通常相等
- draw 过程
  - 画背景 background.draw(canvas)
  - 画自己 onDraw
  - 画 children dispatchDraw
  - 画装饰 onDrawScrollBars
- 自定义 view 须知 P201
  - 注意处理 wrap_content\padding 情况
  - 尽量不要使用 handler，没必要，view 提供了 post 方法
  - view 有线程或动画的时候需要及时停止 p201
  - 参考 onDetachFromWindow
  - 处理滑动冲突
