/**
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器。

 

示例 1：



输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
示例 2：

输入：height = [1,1]
输出：1
示例 3：

输入：height = [4,3,2,1,4]
输出：16
示例 4：

输入：height = [1,2,1]
输出：2

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
 */
/**
 * 初版，个人，考虑了不用计算的情况
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height = []) {
  let previousL = 0,
    l = 0,
    previousR = height.length - 1,
    r = height.length - 1;
  const getArea = () => {
    return Math.min(height[r], height[l]) * (r - l);
  };
  let max = getArea();
  let moveLeft = height[l] < height[r];
  while (l < r) {
    if (moveLeft && height[l] <= height[previousL]) {
      l++;
      continue;
    }
    if (!moveLeft && height[r] <= height[previousR]) {
      r--;
      continue;
    }
    max = Math.max(getArea(), max);
    moveLeft = height[l] < height[r];
    previousL = l;
    previousR = r;
  }
  return max;
};
/**
 * 每次移动都计算，简洁
 */
var maxArea2 = function (height = []) {
  let l = 0,
    r = height.length - 1,
    max = 0;
  while (l < r) {
    max = Math.max(Math.min(height[r], height[l]) * (r - l), max);
    if (height[l] <= height[r]) {
      l++;
    } else {
      r--;
    }
  }
  return max;
};

// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
// console.log(maxArea([1, 2, 4, 3]));
console.log(maxArea([2, 3, 10, 5, 7, 8, 9]));

const getArea2 = (l, r, height) => {
  return Math.min(height[i], height[l]) * (r - l);
};
