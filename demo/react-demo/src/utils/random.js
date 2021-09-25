/**
 * 生成随机数
 */
export const getRandomNum = (max) => {
  return  Math.floor(Math.random()*max)
};

/**
 * 生成随机颜色
 */
export const getRandomRgbaColor = () => {
  const red = getRandomNum(255);
  const green = getRandomNum(255);
  const blue = getRandomNum(255);
  return `rgba(${red},${green},${blue},1)`;
};
