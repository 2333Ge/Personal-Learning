/**
 * 
 * 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标。

 

示例 1：

输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
示例 2：

输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 

提示：

1 <= nums.length <= 3 * 10^4
0 <= nums[i] <= 10^5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/jump-game
 * @param {number[]} nums
 * @return {number}
 */
/**
 *
 * 个人初解，回溯
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump1 = function (nums) {
  const chantArriveMap = {};
  const dfs = (curIndex) => {
    if (curIndex === nums.length - 1) return true;
    if (
      curIndex >= nums.length ||
      nums[curIndex] === 0 ||
      chantArriveMap[curIndex]
    )
      return false;
    for (let i = 1; i <= nums[curIndex]; i++) {
      const nextIndex = i + curIndex;
      if (dfs(nextIndex)) {
        return true;
      }
      chantArriveMap[nextIndex] = true;
    }
    chantArriveMap[curIndex] = true;
    return false;
  };
  return dfs(0);
};

var canJump = function (nums) {
  let maxCanArrive = 0;
  const lastIndex = nums.length - 1;
  for (let i = 0; i < nums.length - 1; i++) {
    if (maxCanArrive < i) return false;
    maxCanArrive = Math.max(maxCanArrive, i + nums[i]);
  }
  if (maxCanArrive >= lastIndex) {
    return true;
  }
  return false;
};

console.log(canJump([2, 3, 1, 1, 4]));
console.log(canJump([3, 2, 1, 0, 4]));

console.log(canJump([0, 2, 3]));

console.log(canJump([0]));
