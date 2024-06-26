/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

 

示例 1：


输入：m = 3, n = 7
输出：28
示例 2：

输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下
示例 3：

输入：m = 7, n = 3
输出：28
示例 4：

输入：m = 3, n = 3
输出：6
 

提示：

1 <= m, n <= 100
题目数据保证答案小于等于 2 * 10^9

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/unique-paths
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

// 排列组合
var uniquePaths1 = function (m, n) {
  const bigger = Math.max(m, n);
  const smaller = Math.min(m, n);
  return Cmn(smaller + bigger - 2, m - 1);
};

// m > n
const Cmn = (m, n) => {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result = (result * (m - i)) / (n - i);
  }
  return result;
};

/**
 * 参考题解：动态规划
 * f(i,j)=f(i−1,j)+f(i,j−1)
 * https://leetcode-cn.com/problems/unique-paths/solution/bu-tong-lu-jing-by-leetcode-solution-hzjf/
 */
var uniquePaths = function (m, n) {
  let f = {};
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      f[`${i}_${j}`] = (f[`${i - 1}_${j}`] || 1) + (f[`${i}_${j - 1}`] || 1);
    }
  }
  return f[`${m - 1}_${n - 1}`] || 1;
};

console.log(uniquePaths(3, 7));
// console.log(uniquePaths(3, 3));
