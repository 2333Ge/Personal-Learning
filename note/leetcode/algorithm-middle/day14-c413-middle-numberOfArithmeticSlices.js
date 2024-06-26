/**
 * 如果一个数列 至少有三个元素 ，并且任意两个相邻元素之差相同，则称该数列为等差数列。

例如，[1,3,5,7,9]、[7,7,7,7] 和 [3,-1,-5,-9] 都是等差数列。
给你一个整数数组 nums ，返回数组 nums 中所有为等差数组的 子数组 个数。

子数组 是数组中的一个连续序列。

 

示例 1：

输入：nums = [1,2,3,4]
输出：3
解释：nums 中有三个子等差数组：[1, 2, 3]、[2, 3, 4] 和 [1,2,3,4] 自身。
示例 2：

输入：nums = [1]
输出：0

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/arithmetic-slices
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices1 = function (nums) {
  if (nums.length < 3) return 0;
  let tempLength = 0,
    result = 0,
    sub = NaN;

  for (let i = 0; i < nums.length; i++) {
    const newSub = nums[i + 1] - nums[i];
    if (newSub === sub) {
      if (tempLength === 0) {
        tempLength = 3;
        result += 1;
      } else {
        tempLength++;
        result += tempLength - 2;
      }
    } else {
      sub = newSub;
      tempLength = 0;
    }
  }

  return result;
};

/**
 * 参考官方题解：评论1
 * https://leetcode-cn.com/problems/arithmetic-slices/solution/deng-chai-shu-lie-hua-fen-by-leetcode-so-g7os/
 * @param {*} nums
 * @returns
 */
var numberOfArithmeticSlices = function (nums) {
  let l = 1,
    result = 0;
  for (let i = 1; i < nums.length; i++) {
    nums[i + 1] - nums[i] === nums[i] - nums[i - 1] ? (result += l++) : (l = 1);
  }
  return result;
};

console.log(numberOfArithmeticSlices([1, 2, 3, 4, 5]));
console.log(numberOfArithmeticSlices([1, 2, 3, 8, 9, 10]));
