import { Problem } from "../types";

export const PROBLEMS: Problem[] = [
  {
    id: "p1",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    tags: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    acceptanceRate: 51.8,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    starterCode: {
      python: `def twoSum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
      javascript: `function twoSum(nums, target) {
    // Write your solution here
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) {
            return [map.get(comp), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
`,
      cpp: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int comp = target - nums[i];
        if (seen.find(comp) != seen.end()) return {seen[comp], i};
        seen[nums[i]] = i;
    }
    return {};
}
`,
      java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) return new int[]{map.get(comp), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}
`
    },
    testCases: [
      {
        id: "tc-1",
        input: "[2,7,11,15]\n9",
        expectedOutput: "[0,1]",
        isSample: true,
        explanation: "2 + 7 = 9"
      },
      {
        id: "tc-2",
        input: "[3,2,4]\n6",
        expectedOutput: "[1,2]",
        isSample: true
      },
      {
        id: "tc-3",
        input: "[3,3]\n6",
        expectedOutput: "[0,1]",
        isSample: true
      },
      {
        id: "tc-4",
        input: "[1,5,7,12,19]\n20",
        expectedOutput: "[0,4]",
        isSample: false
      },
      {
        id: "tc-5",
        input: "[-3,4,3,90]\n0",
        expectedOutput: "[0,2]",
        isSample: false
      }
    ],
    editorial: {
      approach: "Using a Hash Map allows us to look up the required complement (target - nums[i]) in O(1) time while iterating through the array in a single pass.",
      timeComplexity: "O(n) - Single pass through the array.",
      spaceComplexity: "O(n) - Extra space for the hash map.",
      solutions: {
        python: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) {
            return [map.get(comp), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
      }
    }
  },
  {
    id: "p2",
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    tags: ["Two Pointers", "String"],
    companies: ["Meta", "Microsoft", "Amazon"],
    acceptanceRate: 46.2,
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` *if it is a **palindrome**, or* \`false\` *otherwise*.`,
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.'
      },
      {
        input: 's = " "',
        output: "true",
        explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.'
      }
    ],
    starterCode: {
      python: `def isPalindrome(s: str) -> bool:
    # Write your solution here
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]
`,
      javascript: `function isPalindrome(s) {
    // Write your solution here
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}
`,
      cpp: `#include <string>
#include <cctype>

bool isPalindrome(std::string s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        while (l < r && !isalnum(s[l])) l++;
        while (l < r && !isalnum(s[r])) r--;
        if (tolower(s[l]) != tolower(s[r])) return false;
        l++; r--;
    }
    return true;
}
`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
            l++; r--;
        }
        return true;
    }
}
`
    },
    testCases: [
      {
        id: "vp-1",
        input: '"A man, a plan, a canal: Panama"',
        expectedOutput: "true",
        isSample: true
      },
      {
        id: "vp-2",
        input: '"race a car"',
        expectedOutput: "false",
        isSample: true
      },
      {
        id: "vp-3",
        input: '" "',
        expectedOutput: "true",
        isSample: true
      },
      {
        id: "vp-4",
        input: '"0P"',
        expectedOutput: "false",
        isSample: false
      },
      {
        id: "vp-5",
        input: '"ab_a"',
        expectedOutput: "true",
        isSample: false
      }
    ],
    editorial: {
      approach: "Using two pointers moving from outside inward, skip non-alphanumeric characters and compare lowercase equivalents.",
      timeComplexity: "O(n) - Traverse the string once.",
      spaceComplexity: "O(1) - Constant auxiliary space when using two pointers in place.",
      solutions: {
        python: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True`,
        javascript: `function isPalindrome(s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;
        while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++;
        r--;
    }
    return true;
}`
      }
    }
  },
  {
    id: "p3",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    tags: ["Sliding Window", "Hash Table", "String"],
    companies: ["Amazon", "Microsoft", "Google", "Bloomberg"],
    acceptanceRate: 34.6,
    description: `Given a string \`s\`, find the length of the **longest substring** without duplicate characters.`,
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    starterCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    # Write your solution here
    char_map = {}
    left = 0
    max_len = 0
    for right, c in enumerate(s):
        if c in char_map and char_map[c] >= left:
            left = char_map[c] + 1
        char_map[c] = right
        max_len = max(max_len, right - left + 1)
    return max_len
`,
      javascript: `function lengthOfLongestSubstring(s) {
    // Write your solution here
    const map = new Map();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right]) && map.get(s[right]) >= left) {
            left = map.get(s[right]) + 1;
        }
        map.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>

int lengthOfLongestSubstring(std::string s) {
    std::unordered_map<char, int> map;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.size(); ++right) {
        if (map.count(s[right]) && map[s[right]] >= left) {
            left = map[s[right]] + 1;
        }
        map[s[right]] = right;
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}
`,
      java: `import java.util.HashMap;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
`
    },
    testCases: [
      {
        id: "lswrc-1",
        input: '"abcabcbb"',
        expectedOutput: "3",
        isSample: true
      },
      {
        id: "lswrc-2",
        input: '"bbbbb"',
        expectedOutput: "1",
        isSample: true
      },
      {
        id: "lswrc-3",
        input: '"pwwkew"',
        expectedOutput: "3",
        isSample: true
      },
      {
        id: "lswrc-4",
        input: '""',
        expectedOutput: "0",
        isSample: false
      },
      {
        id: "lswrc-5",
        input: '"tmmzuxt"',
        expectedOutput: "5",
        isSample: false
      }
    ],
    editorial: {
      approach: "Sliding window with a hash table recording the last seen index of each character. When a duplicate is detected, shift the left pointer past its previous index.",
      timeComplexity: "O(n) - Each character is visited at most twice.",
      spaceComplexity: "O(min(m, n)) - Where m is the character set size.",
      solutions: {
        python: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, c in enumerate(s):
        if c in char_map and char_map[c] >= left:
            left = char_map[c] + 1
        char_map[c] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
        javascript: `function lengthOfLongestSubstring(s) {
    const map = new Map();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right]) && map.get(s[right]) >= left) {
            left = map.get(s[right]) + 1;
        }
        map.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
      }
    }
  },
  {
    id: "p4",
    slug: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    tags: ["Dynamic Programming", "Array", "BFS"],
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
    acceptanceRate: 43.1,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1"
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1"
      },
      {
        input: "coins = [1], amount = 0",
        output: "0"
      }
    ],
    starterCode: {
      python: `def coinChange(coins, amount):
    # Write your solution here
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for c in coins:
        for i in range(c, amount + 1):
            dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
`,
      javascript: `function coinChange(coins, amount) {
    // Write your solution here
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const c of coins) {
        for (let i = c; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}
`,
      cpp: `#include <vector>
#include <algorithm>

int coinChange(std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int c : coins) {
        for (int i = c; i <= amount; ++i) {
            dp[i] = std::min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
`,
      java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int c : coins) {
            for (int i = c; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
`
    },
    testCases: [
      {
        id: "cc-1",
        input: "[1,2,5]\n11",
        expectedOutput: "3",
        isSample: true
      },
      {
        id: "cc-2",
        input: "[2]\n3",
        expectedOutput: "-1",
        isSample: true
      },
      {
        id: "cc-3",
        input: "[1]\n0",
        expectedOutput: "0",
        isSample: true
      },
      {
        id: "cc-4",
        input: "[186,419,83,408]\n6249",
        expectedOutput: "20",
        isSample: false
      }
    ],
    editorial: {
      approach: "Bottom-up Dynamic Programming. Define dp[i] as the minimum coins needed to make amount i. For each coin c, dp[i] = min(dp[i], dp[i - c] + 1).",
      timeComplexity: "O(amount * n) - Where n is the number of coins.",
      spaceComplexity: "O(amount) - For the dp array.",
      solutions: {
        python: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for c in coins:
        for i in range(c, amount + 1):
            dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
        javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const c of coins) {
        for (let i = c; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`
      }
    }
  },
  {
    id: "p5",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    tags: ["Two Pointers", "Dynamic Programming", "Stack"],
    companies: ["Google", "Amazon", "Apple", "Goldman Sachs"],
    acceptanceRate: 60.5,
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped."
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9"
      }
    ],
    starterCode: {
      python: `def trap(height: list[int]) -> int:
    # Write your solution here
    if not height: return 0
    l, r = 0, len(height) - 1
    left_max, right_max = height[l], height[r]
    water = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, height[l])
            water += left_max - height[l]
        else:
            r -= 1
            right_max = max(right_max, height[r])
            water += right_max - height[r]
    return water
`,
      javascript: `function trap(height) {
    // Write your solution here
    if (!height.length) return 0;
    let l = 0, r = height.length - 1;
    let leftMax = height[l], rightMax = height[r];
    let water = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            water += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            water += rightMax - height[r];
        }
    }
    return water;
}
`,
      cpp: `#include <vector>
#include <algorithm>

int trap(std::vector<int>& height) {
    if (height.empty()) return 0;
    int l = 0, r = height.size() - 1;
    int leftMax = height[l], rightMax = height[r];
    int water = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = std::max(leftMax, height[l]);
            water += leftMax - height[l];
        } else {
            r--;
            rightMax = std::max(rightMax, height[r]);
            water += rightMax - height[r];
        }
    }
    return water;
}
`,
      java: `class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) return 0;
        int l = 0, r = height.length - 1;
        int leftMax = height[l], rightMax = height[r];
        int water = 0;
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, height[l]);
                water += leftMax - height[l];
            } else {
                r--;
                rightMax = Math.max(rightMax, height[r]);
                water += rightMax - height[r];
            }
        }
        return water;
    }
}
`
    },
    testCases: [
      {
        id: "trw-1",
        input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
        expectedOutput: "6",
        isSample: true
      },
      {
        id: "trw-2",
        input: "[4,2,0,3,2,5]",
        expectedOutput: "9",
        isSample: true
      },
      {
        id: "trw-3",
        input: "[3,0,0,2,0,4]",
        expectedOutput: "10",
        isSample: false
      }
    ],
    editorial: {
      approach: "Using Two Pointers. The amount of water trapped at index i is determined by min(max_left, max_right) - height[i]. Moving the smaller boundary inward ensures the limiting height is always known.",
      timeComplexity: "O(n) - Single pass with two pointers.",
      spaceComplexity: "O(1) - Constant extra space.",
      solutions: {
        python: `def trap(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    left_max, right_max = height[l], height[r]
    water = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, height[l])
            water += left_max - height[l]
        else:
            r -= 1
            right_max = max(right_max, height[r])
            water += right_max - height[r]
    return water`,
        javascript: `function trap(height) {
    let l = 0, r = height.length - 1;
    let leftMax = height[l], rightMax = height[r];
    let water = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            water += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            water += rightMax - height[r];
        }
    }
    return water;
}`
      }
    }
  }
];

