/**
 * 给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出（不要求按特定顺序）

二维数组的第 i 个数组中的单元都表示有向图中 i 号节点所能到达的下一些节点，空就是没有下一个结点了。

译者注：有向图是有方向的，即规定了 a→b 你就不能从 b→a 。

 

示例 1：



输入：graph = [[1,2],[3],[3],[]]
输出：[[0,1,3],[0,2,3]]
解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3
示例 2：



输入：graph = [[4,3,1],[3,2,4],[3],[4],[]]
输出：[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
示例 3：

输入：graph = [[1],[]]
输出：[[0,1]]
示例 4：

输入：graph = [[1,2,3],[2],[3],[]]
输出：[[0,1,2,3],[0,2,3],[0,3]]
示例 5：

输入：graph = [[1,3],[2],[3],[]]
输出：[[0,1,2,3],[0,3]]
 

提示：

n == graph.length
2 <= n <= 15
0 <= graph[i][j] < n
graph[i][j] != i（即，不存在自环）
graph[i] 中的所有元素 互不相同
保证输入为 有向无环图（DAG）

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/all-paths-from-source-to-target
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget1 = function (graph) {
  const result = [];
  function markGraph(i, stack = []) {
    if (i === graph.length - 1) {
      result.push(stack);
      return;
    }
    if (!graph[i]) return;
    for (let next of graph[i]) {
      const nextStack = [...stack];
      nextStack.push(next);
      markGraph(next, nextStack);
    }
  }
  markGraph(0, [0]);
  return result;
};

/**
 * 参考https://leetcode-cn.com/problems/all-paths-from-source-to-target/solution/suo-you-ke-neng-de-lu-jing-by-leetcode-s-iyoh/
 * 深度优先，到最后一个记录前面的结果
 * @param {*} graph 
 * @returns 
 */
var allPathsSourceTarget = function (graph) {
  const result = [],
    stack = [0];
  function dfs(i) {
    if (i === graph.length - 1) {
      result.push([...stack]);
      return;
    }
    if (!graph[i]) return;
    for (let next of graph[i]) {
      stack.push(next);
      dfs(next);
      stack.pop();
    }
  }
  dfs(0);
  return result;
};

console.log(allPathsSourceTarget([[1, 2], [3], [3], []]));
