/**
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

 

示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
示例 2：

输入：nums = [0]
输出：[[],[0]]
 

提示：

1 <= nums.length <= 10
-10 <= nums[i] <= 10
nums 中的所有元素 互不相同

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subsets
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets1 = function (nums = []) {
  if (!nums || nums.length === 0) return [];
  const result = [[]];
  hu(nums, result, [], -1);
  return result;
};

const hu = (nums = [], result, curArr, lastIndex) => {
  for (let i = lastIndex + 1; i < nums.length; i++) {
    const newArr = [...curArr];
    newArr.push(nums[i]);
    result.push(newArr);
    hu(nums, result, newArr, i);
  }
};

// 上变体

var subsets = function (nums = []) {
  if (!nums || nums.length === 0) return [];
  const result = [[]];
  const temp = [];
  const dfs = (lastIndex) => {
    for (let i = lastIndex + 1; i < nums.length; i++) {
      temp.push(nums[i]);
      result.push(temp.slice());
      dfs(i);
      temp.pop();
    }
  };

  dfs(-1);
  return result;
};

console.log(subsets([1, 2, 3]).sort((a, b) => a.length - b.length));
console.log([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]].length);
