# Hooks 使用笔记

## 触发式动画

- useState 触发 reRender
- useRef 设置生命周期中动画变化值常量
- useEffect 触发设置 reRender 后的动画(可不要，主要为了减少其他 props 改变时导致 reRender 然后导致重复的动画)

```jsx


const [isOpen, open] = useState(isOpenDefault);

const animateItemsHeight = useRef(new Animated.Value(isOpen ? ItemsHeight : 0)).current;

  useEffect(() => {
    Animated.timing(animateItemsHeight, { toValue: isOpen ? ItemsHeight : 0, duration: 500 }).start();
  }, [isOpen]);

 <Animated.View style={{ height: animateItemsHeight }}>

```

## 复用和组件生命周期相关逻辑

如：class 写法，在 componentDidMount 设置监听器、在 componentWillUnmount 取消监听器，在各个组件都需重写逻辑，不便复用
