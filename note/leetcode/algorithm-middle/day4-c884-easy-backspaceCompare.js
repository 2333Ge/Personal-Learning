/**
 * 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，请你判断二者是否相等。# 代表退格字符。

如果相等，返回 true ；否则，返回 false 。

注意：如果对空文本输入退格字符，文本继续为空。

 

示例 1：

输入：s = "ab#c", t = "ad#c"
输出：true
解释：S 和 T 都会变成 “ac”。
示例 2：

输入：s = "ab##", t = "c#d#"
输出：true
解释：s 和 t 都会变成 “”。
示例 3：

输入：s = "a##c", t = "#a#c"
输出：true
解释：s 和 t 都会变成 “c”。
示例 4：

输入：s = "a#c", t = "b"
输出：false
解释：s 会变成 “c”，但 t 仍然是 “b”。
 

提示：

1 <= s.length, t.length <= 200
s 和 t 只含有小写字母以及字符 '#'
 

进阶：

你可以用 O(N) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/backspace-string-compare
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare1 = function (s, t) {
  const stack1 = [],
    stack2 = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "#") {
      stack1.pop();
    } else {
      stack1.push(s[i]);
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (t[i] === "#") {
      stack2.pop();
    } else {
      stack2.push(t[i]);
    }
  }
  if (stack1.length !== stack2.length) return false;
  for (let i = 0; i < stack1.length; i++) {
    if (stack1[i] !== stack2[i]) {
      return false;
    }
  }
  return true;
};

// 双指针，倒序比较
var backspaceCompare = function (s, t) {
  let i = s.length - 1,
    j = t.length - 1;
  let skipI = 0,
    skipJ = 0;
  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (s[i] === "#") {
        skipI++;
        i--;
      } else if (skipI > 0) {
        i--;
        skipI--;
      } else {
        break;
      }
    }
    while (j >= 0) {
      if (t[j] === "#") {
        skipJ++;
        j--;
      } else if (skipJ > 0) {
        j--;
        skipJ--;
      } else {
        break;
      }
    }
    if (i < 0 && j < 0) {
      return true;
    }
    if (s[i] !== t[j]) {
      return false;
    }
    i--;
    j--;
  }
  if (i < 0 && j < 0) {
    return true;
  }
  return false;
};

console.log(backspaceCompare("ab##", "c#d#")); // true
console.log(backspaceCompare("a#c", "b")); // false
console.log(backspaceCompare("ab#c", "ad#c")); // true
