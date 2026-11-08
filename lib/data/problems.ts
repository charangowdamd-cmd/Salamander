import { Problem } from "../types";

export const PROBLEMS: Problem[] = [
  // 1. Two Sum (Easy)
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
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
      javascript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (seen.has(comp)) {
            return [seen.get(comp), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); ++i) {\n            int comp = target - nums[i];\n            if (seen.count(comp)) return {seen[comp], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (seen.containsKey(comp)) return new int[]{seen.get(comp), i};\n            seen.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`
    },
    testCases: [
      { id: "tc-1", input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isSample: true },
      { id: "tc-2", input: "[3,2,4]\n6", expectedOutput: "[1,2]", isSample: true },
      { id: "tc-3", input: "[3,3]\n6", expectedOutput: "[0,1]", isSample: true },
      { id: "tc-4", input: "[1,5,7,12,19]\n20", expectedOutput: "[0,4]", isSample: false },
      { id: "tc-5", input: "[-3,4,3,90]\n0", expectedOutput: "[0,2]", isSample: false }
    ],
    editorial: {
      approach: "Using a hash map allows us to look up the complement in O(1) average time. As we iterate through the array, we check if the complement (target - current) already exists in the map.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      solutions: {
        python: `def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`,
        javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (map.has(comp)) return [map.get(comp), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`
      }
    }
  },

  // 2. Reverse a String (Easy)
  {
    id: "p2",
    slug: "reverse-string",
    title: "Reverse a String",
    difficulty: "Easy",
    category: "Strings",
    tags: ["String", "Two Pointers"],
    companies: ["Amazon", "Microsoft", "Adobe"],
    acceptanceRate: 78.4,
    description: `Given a string \`s\`, return the string with its characters in reverse order.`,
    constraints: [
      "1 <= s.length <= 10^5",
      "s consists of printable ASCII characters."
    ],
    examples: [
      { input: 's = "hello"', output: '"olleh"', explanation: 'Reversing "hello" yields "olleh".' },
      { input: 's = "Salamander"', output: '"rednamalaS"' }
    ],
    starterCode: {
      python: `def reverseString(s):
    # Return reversed string
    return s[::-1]
`,
      javascript: `function reverseString(s) {
    return s.split('').reverse().join('');
}`,
      cpp: `string reverseString(string s) { reverse(s.begin(), s.end()); return s; }`,
      java: `String reverseString(String s) { return new StringBuilder(s).reverse().toString(); }`
    },
    testCases: [
      { id: "tc-2-1", input: '"hello"', expectedOutput: '"olleh"', isSample: true },
      { id: "tc-2-2", input: '"Salamander"', expectedOutput: '"rednamalaS"', isSample: true },
      { id: "tc-2-3", input: '"a"', expectedOutput: '"a"', isSample: false },
      { id: "tc-2-4", input: '"racecar"', expectedOutput: '"racecar"', isSample: false }
    ],
    editorial: {
      approach: "Reverse the string using two-pointer swap or native reverse methods.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      solutions: {
        python: `def reverseString(s):\n    return s[::-1]`,
        javascript: `function reverseString(s) {\n    return s.split('').reverse().join('');\n}`
      }
    }
  },

  // 3. Valid Palindrome (Easy)
  {
    id: "p3",
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    tags: ["String", "Two Pointers"],
    companies: ["Meta", "Amazon", "Microsoft"],
    acceptanceRate: 46.5,
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string \`s\`, return \`true\` *if it is a **palindrome**, or* \`false\` *otherwise*.`,
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
      { input: 's = "race a car"', output: "false" }
    ],
    starterCode: {
      python: `def isPalindrome(s):
    filtered = [c.lower() for c in s if c.isalnum()]
    return filtered == filtered[::-1]
`,
      javascript: `function isPalindrome(s) {
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}`,
      cpp: `bool isPalindrome(string s) { return true; }`,
      java: `boolean isPalindrome(String s) { return true; }`
    },
    testCases: [
      { id: "tc-3-1", input: '"A man, a plan, a canal: Panama"', expectedOutput: "true", isSample: true },
      { id: "tc-3-2", input: '"race a car"', expectedOutput: "false", isSample: true },
      { id: "tc-3-3", input: '" "', expectedOutput: "true", isSample: false },
      { id: "tc-3-4", input: '"0P"', expectedOutput: "false", isSample: false }
    ],
    editorial: {
      approach: "Sanitize the string by removing non-alphanumeric characters and converting to lowercase, then compare using two pointers.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      solutions: {
        python: `def isPalindrome(s):\n    filtered = [c.lower() for c in s if c.isalnum()]\n    return filtered == filtered[::-1]`,
        javascript: `function isPalindrome(s) {\n    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    return clean === clean.split('').reverse().join('');\n}`
      }
    }
  },

  // 4. Find the Largest Element (Easy)
  {
    id: "p4",
    slug: "find-the-largest-element",
    title: "Find the Largest Element",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    tags: ["Array"],
    companies: ["Amazon", "TCS", "Infosys"],
    acceptanceRate: 85.2,
    description: `Given an integer array \`nums\`, find and return its largest element.`,
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    examples: [
      { input: "nums = [3, 9, 2, 15, 6]", output: "15" },
      { input: "nums = [-10, -5, -20]", output: "-5" }
    ],
    starterCode: {
      python: `def findLargestElement(nums):
    return max(nums)
`,
      javascript: `function findLargestElement(nums) {
    return Math.max(...nums);
}`,
      cpp: `int findLargestElement(vector<int>& nums) { return *max_element(nums.begin(), nums.end()); }`,
      java: `int findLargestElement(int[] nums) { int m = nums[0]; for(int x: nums) m = Math.max(m,x); return m; }`
    },
    testCases: [
      { id: "tc-4-1", input: "[3,9,2,15,6]", expectedOutput: "15", isSample: true },
      { id: "tc-4-2", input: "[-10,-5,-20]", expectedOutput: "-5", isSample: true },
      { id: "tc-4-3", input: "[42]", expectedOutput: "42", isSample: false }
    ],
    editorial: {
      approach: "Iterate through the array maintaining a running maximum.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      solutions: {
        python: `def findLargestElement(nums):\n    return max(nums)`,
        javascript: `function findLargestElement(nums) {\n    return Math.max(...nums);\n}`
      }
    }
  },

  // 5. First Non-Repeating Character (Easy)
  {
    id: "p5",
    slug: "first-non-repeating-character",
    title: "First Non-Repeating Character",
    difficulty: "Easy",
    category: "Strings",
    tags: ["String", "Hash Table", "Queue"],
    companies: ["Amazon", "Google", "Bloomberg"],
    acceptanceRate: 60.1,
    description: `Given a string \`s\`, find the first non-repeating character in it and return its index. If it does not exist, return \`-1\`.`,
    constraints: [
      "1 <= s.length <= 10^5",
      "s consists of only lowercase English letters."
    ],
    examples: [
      { input: 's = "leetcode"', output: "0", explanation: 'Character "l" at index 0 is non-repeating.' },
      { input: 's = "loveleetcode"', output: "2", explanation: 'Character "v" at index 2 is the first unique.' },
      { input: 's = "aabb"', output: "-1" }
    ],
    starterCode: {
      python: `def firstUniqChar(s):
    counts = {}
    for c in s:
        counts[c] = counts.get(c, 0) + 1
    for i, c in enumerate(s):
        if counts[c] == 1:
            return i
    return -1
`,
      javascript: `function firstUniqChar(s) {
    const counts = {};
    for (const c of s) counts[c] = (counts[c] || 0) + 1;
    for (let i = 0; i < s.length; i++) {
        if (counts[s[i]] === 1) return i;
    }
    return -1;
}`,
      cpp: `int firstUniqChar(string s) { return -1; }`,
      java: `int firstUniqChar(String s) { return -1; }`
    },
    testCases: [
      { id: "tc-5-1", input: '"leetcode"', expectedOutput: "0", isSample: true },
      { id: "tc-5-2", input: '"loveleetcode"', expectedOutput: "2", isSample: true },
      { id: "tc-5-3", input: '"aabb"', expectedOutput: "-1", isSample: false }
    ],
    editorial: {
      approach: "Count character frequencies with a hash map in the first pass, then return the index of the first character with frequency 1 in the second pass.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) (at most 26 English characters)",
      solutions: {
        python: `def firstUniqChar(s):\n    counts = {}\n    for c in s: counts[c] = counts.get(c, 0) + 1\n    for i, c in enumerate(s):\n        if counts[c] == 1: return i\n    return -1`,
        javascript: `function firstUniqChar(s) {\n    const counts = {};\n    for (const c of s) counts[c] = (counts[c] || 0) + 1;\n    for (let i = 0; i < s.length; i++) {\n        if (counts[s[i]] === 1) return i;\n    }\n    return -1;\n}`
      }
    }
  },

  // 6. Longest Substring Without Repeating Characters (Medium)
  {
    id: "p6",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    tags: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Bloomberg", "Google", "Meta", "Microsoft"],
    acceptanceRate: 34.5,
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3" }
    ],
    starterCode: {
      python: `def lengthOfLongestSubstring(s):
    seen = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len
`,
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
}`,
      cpp: `int lengthOfLongestSubstring(string s) { return 0; }`,
      java: `int lengthOfLongestSubstring(String s) { return 0; }`
    },
    testCases: [
      { id: "tc-6-1", input: '"abcabcbb"', expectedOutput: "3", isSample: true },
      { id: "tc-6-2", input: '"bbbbb"', expectedOutput: "1", isSample: true },
      { id: "tc-6-3", input: '"pwwkew"', expectedOutput: "3", isSample: true },
      { id: "tc-6-4", input: '""', expectedOutput: "0", isSample: false },
      { id: "tc-6-5", input: '"dvdf"', expectedOutput: "3", isSample: false }
    ],
    editorial: {
      approach: "Use a sliding window. As the right pointer advances, if a repeated character is encountered within the current window, move the left pointer past the previous index of that character.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m, n)) where m is size of alphabet",
      solutions: {
        python: `def lengthOfLongestSubstring(s):\n    seen = {}\n    left = 0\n    max_len = 0\n    for right, char in enumerate(s):\n        if char in seen and seen[char] >= left:\n            left = seen[char] + 1\n        seen[char] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len`,
        javascript: `function lengthOfLongestSubstring(s) {\n    const map = new Map();\n    let left = 0, maxLen = 0;\n    for (let right = 0; right < s.length; right++) {\n        if (map.has(s[right]) && map.get(s[right]) >= left) {\n            left = map.get(s[right]) + 1;\n        }\n        map.set(s[right], right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`
      }
    }
  },

  // 7. Product of Array Except Self (Medium)
  {
    id: "p7",
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    tags: ["Array", "Prefix Sum"],
    companies: ["Amazon", "Apple", "Meta", "Microsoft"],
    acceptanceRate: 65.1,
    description: `Given an integer array \`nums\`, return *an array* \`answer\` *such that* \`answer[i]\` *is equal to the product of all the elements of* \`nums\` *except* \`nums[i]\`.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums fits in a 32-bit integer."
    ],
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
    ],
    starterCode: {
      python: `def productExceptSelf(nums):
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    return res
`,
      javascript: `function productExceptSelf(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let postfix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= postfix;
        postfix *= nums[i];
    }
    return res;
}`,
      cpp: `vector<int> productExceptSelf(vector<int>& nums) { return {}; }`,
      java: `int[] productExceptSelf(int[] nums) { return new int[]{}; }`
    },
    testCases: [
      { id: "tc-7-1", input: "[1,2,3,4]", expectedOutput: "[24,12,8,6]", isSample: true },
      { id: "tc-7-2", input: "[-1,1,0,-3,3]", expectedOutput: "[0,0,9,0,0]", isSample: true },
      { id: "tc-7-3", input: "[4,5]", expectedOutput: "[5,4]", isSample: false }
    ],
    editorial: {
      approach: "Calculate prefix products in a forward pass, and multiply by suffix products in a backward pass without using extra array allocations.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) extra space (excluding output)",
      solutions: {
        python: `def productExceptSelf(nums):\n    res = [1] * len(nums)\n    p = 1\n    for i in range(len(nums)):\n        res[i] = p\n        p *= nums[i]\n    post = 1\n    for i in range(len(nums)-1, -1, -1):\n        res[i] *= post\n        post *= nums[i]\n    return res`,
        javascript: `function productExceptSelf(nums) {\n    const res = new Array(nums.length).fill(1);\n    let p = 1;\n    for (let i = 0; i < nums.length; i++) {\n        res[i] = p;\n        p *= nums[i];\n    }\n    let post = 1;\n    for (let i = nums.length - 1; i >= 0; i--) {\n        res[i] *= post;\n        post *= nums[i];\n    }\n    return res;\n}`
      }
    }
  },

  // 8. Group Anagrams (Medium)
  {
    id: "p8",
    slug: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    tags: ["Array", "Hash Table", "String", "Sorting"],
    companies: ["Amazon", "Apple", "Google", "Meta"],
    acceptanceRate: 67.2,
    description: `Given an array of strings \`strs\`, group the **anagrams** together. You can return the answer in **any order**.`,
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["eat","tea","ate"],["tan","nat"],["bat"]]'
      },
      { input: 'strs = [""]', output: '[[""]]' }
    ],
    starterCode: {
      python: `def groupAnagrams(strs):
    from collections import defaultdict
    groups = defaultdict(list)
    for s in strs:
        key = ''.join(sorted(s))
        groups[key].append(s)
    return list(groups.values())
`,
      javascript: `function groupAnagrams(strs) {
    const map = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return Array.from(map.values());
}`,
      cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) { return {}; }`,
      java: `List<List<String>> groupAnagrams(String[] strs) { return new ArrayList<>(); }`
    },
    testCases: [
      { id: "tc-8-1", input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]', isSample: true },
      { id: "tc-8-2", input: '[""]', expectedOutput: '[[""]]', isSample: true },
      { id: "tc-8-3", input: '["a"]', expectedOutput: '[["a"]]', isSample: false }
    ],
    editorial: {
      approach: "Sort each string alphabetically to form a canonical key, and group original strings into a hash map indexed by this key.",
      timeComplexity: "O(n * k log k) where k is max string length",
      spaceComplexity: "O(n * k)",
      solutions: {
        python: `def groupAnagrams(strs):\n    groups = {}\n    for s in strs:\n        k = ''.join(sorted(s))\n        groups.setdefault(k, []).append(s)\n    return list(groups.values())`,
        javascript: `function groupAnagrams(strs) {\n    const map = {};\n    for (const s of strs) {\n        const k = s.split('').sort().join('');\n        (map[k] = map[k] || []).push(s);\n    }\n    return Object.values(map);\n}`
      }
    }
  },

  // 9. Search in Rotated Sorted Array (Medium)
  {
    id: "p9",
    slug: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    tags: ["Array", "Binary Search"],
    companies: ["Microsoft", "Amazon", "Apple", "Google"],
    acceptanceRate: 39.8,
    description: `Given a sorted integer array \`nums\` that was rotated at an unknown pivot, and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i], target <= 10^4",
      "All values of nums are unique."
    ],
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" }
    ],
    starterCode: {
      python: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1
`,
      javascript: `function search(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}`,
      cpp: `int search(vector<int>& nums, int target) { return -1; }`,
      java: `int search(int[] nums, int target) { return -1; }`
    },
    testCases: [
      { id: "tc-9-1", input: "[4,5,6,7,0,1,2]\n0", expectedOutput: "4", isSample: true },
      { id: "tc-9-2", input: "[4,5,6,7,0,1,2]\n3", expectedOutput: "-1", isSample: true },
      { id: "tc-9-3", input: "[1]\n0", expectedOutput: "-1", isSample: false }
    ],
    editorial: {
      approach: "Modified binary search: determine which half of the array is normally sorted, and check if target falls within that sorted half.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      solutions: {
        python: `def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if nums[m] == target: return m\n        if nums[l] <= nums[m]:\n            if nums[l] <= target < nums[m]: r = m - 1\n            else: l = m + 1\n        else:\n            if nums[m] < target <= nums[r]: l = m + 1\n            else: r = m - 1\n    return -1`,
        javascript: `function search(nums, target) {\n    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const m = Math.floor((l + r) / 2);\n        if (nums[m] === target) return m;\n        if (nums[l] <= nums[m]) {\n            if (nums[l] <= target && target < nums[m]) r = m - 1;\n            else l = m + 1;\n        } else {\n            if (nums[m] < target && target <= nums[r]) l = m + 1;\n            else r = m - 1;\n        }\n    }\n    return -1;\n}`
      }
    }
  },

  // 10. Top K Frequent Elements (Medium)
  {
    id: "p10",
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    tags: ["Array", "Hash Table", "Bucket Sort", "Heap"],
    companies: ["Amazon", "Meta", "Google"],
    acceptanceRate: 64.0,
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k\` *most frequent elements*. You may return the answer in **any order**.`,
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array]."
    ],
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" }
    ],
    starterCode: {
      python: `def topKFrequent(nums, k):
    from collections import Counter
    count = Counter(nums)
    return [item[0] for item in count.most_common(k)]
`,
      javascript: `function topKFrequent(nums, k) {
    const counts = {};
    for (const num of nums) counts[num] = (counts[num] || 0) + 1;
    return Object.keys(counts)
        .map(Number)
        .sort((a, b) => counts[b] - counts[a])
        .slice(0, k);
}`,
      cpp: `vector<int> topKFrequent(vector<int>& nums, int k) { return {}; }`,
      java: `int[] topKFrequent(int[] nums, int k) { return new int[]{}; }`
    },
    testCases: [
      { id: "tc-10-1", input: "[1,1,1,2,2,3]\n2", expectedOutput: "[1,2]", isSample: true },
      { id: "tc-10-2", input: "[1]\n1", expectedOutput: "[1]", isSample: true },
      { id: "tc-10-3", input: "[4,1,-1,2,-1,2,3]\n2", expectedOutput: "[-1,2]", isSample: false }
    ],
    editorial: {
      approach: "Count frequencies with a hash map, then use Bucket Sort or a min-heap of size k to extract the k highest frequencies.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      solutions: {
        python: `def topKFrequent(nums, k):\n    from collections import Counter\n    return [x for x, _ in Counter(nums).most_common(k)]`,
        javascript: `function topKFrequent(nums, k) {\n    const map = {};\n    for (const x of nums) map[x] = (map[x] || 0) + 1;\n    return Object.keys(map).map(Number).sort((a,b) => map[b]-map[a]).slice(0, k);\n}`
      }
    }
  },

  // 11. Median of Two Sorted Arrays (Hard)
  {
    id: "p11",
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
    acceptanceRate: 37.8,
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.`,
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000"
    ],
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0", explanation: "Merged array = [1,2,3] and median is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5", explanation: "Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5." }
    ],
    starterCode: {
      python: `def findMedianSortedArrays(nums1, nums2):
    A, B = nums1, nums2
    total = len(A) + len(B)
    half = total // 2
    if len(B) < len(A):
        A, B = B, A
    l, r = 0, len(A) - 1
    while True:
        i = (l + r) // 2
        j = half - i - 2
        Aleft = A[i] if i >= 0 else float("-infinity")
        Aright = A[i + 1] if (i + 1) < len(A) else float("infinity")
        Bleft = B[j] if j >= 0 else float("-infinity")
        Bright = B[j + 1] if (j + 1) < len(B) else float("infinity")
        if Aleft <= Bright and Bleft <= Aright:
            if total % 2:
                return float(min(Aright, Bright))
            return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
        elif Aleft > Bright:
            r = i - 1
        else:
            l = i + 1
`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const mid = Math.floor(merged.length / 2);
    if (merged.length % 2 === 1) return merged[mid];
    return (merged[mid - 1] + merged[mid]) / 2;
}`,
      cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) { return 0.0; }`,
      java: `double findMedianSortedArrays(int[] nums1, int[] nums2) { return 0.0; }`
    },
    testCases: [
      { id: "tc-11-1", input: "[1,3]\n[2]", expectedOutput: "2", isSample: true },
      { id: "tc-11-2", input: "[1,2]\n[3,4]", expectedOutput: "2.5", isSample: true },
      { id: "tc-11-3", input: "[0,0]\n[0,0]", expectedOutput: "0", isSample: false }
    ],
    editorial: {
      approach: "Perform binary search on the partition of the smaller array so that left halves contain the same number of elements as right halves.",
      timeComplexity: "O(log(min(m, n)))",
      spaceComplexity: "O(1)",
      solutions: {
        python: `def findMedianSortedArrays(nums1, nums2):\n    merged = sorted(nums1 + nums2)\n    m = len(merged)\n    return float(merged[m//2]) if m%2 else (merged[m//2 - 1] + merged[m//2]) / 2.0`,
        javascript: `function findMedianSortedArrays(nums1, nums2) {\n    const merged = [...nums1, ...nums2].sort((a,b)=>a-b);\n    const m = Math.floor(merged.length / 2);\n    return merged.length % 2 ? merged[m] : (merged[m-1] + merged[m]) / 2;\n}`
      }
    }
  },

  // 12. Trapping Rain Water (Hard)
  {
    id: "p12",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    companies: ["Google", "Amazon", "Apple", "Meta", "Bloomberg"],
    acceptanceRate: 59.2,
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" }
    ],
    starterCode: {
      python: `def trap(height):
    if not height: return 0
    l, r = 0, len(height) - 1
    left_max, right_max = height[l], height[r]
    res = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, height[l])
            res += left_max - height[l]
        else:
            r -= 1
            right_max = max(right_max, height[r])
            res += right_max - height[r]
    return res
`,
      javascript: `function trap(height) {
    if (!height.length) return 0;
    let l = 0, r = height.length - 1;
    let leftMax = height[l], rightMax = height[r];
    let res = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            res += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            res += rightMax - height[r];
        }
    }
    return res;
}`,
      cpp: `int trap(vector<int>& height) { return 0; }`,
      java: `int trap(int[] height) { return 0; }`
    },
    testCases: [
      { id: "tc-12-1", input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6", isSample: true },
      { id: "tc-12-2", input: "[4,2,0,3,2,5]", expectedOutput: "9", isSample: true },
      { id: "tc-12-3", input: "[2,0,2]", expectedOutput: "2", isSample: false }
    ],
    editorial: {
      approach: "Using two pointers, track the max height from left and right. Water trapped at each bar is determined by min(left_max, right_max) - height[i].",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      solutions: {
        python: `def trap(height):\n    l, r = 0, len(height) - 1\n    left_max, right_max = height[l], height[r]\n    res = 0\n    while l < r:\n        if left_max < right_max:\n            l += 1\n            left_max = max(left_max, height[l])\n            res += left_max - height[l]\n        else:\n            r -= 1\n            right_max = max(right_max, height[r])\n            res += right_max - height[r]\n    return res`,
        javascript: `function trap(height) {\n    let l = 0, r = height.length - 1;\n    let lMax = height[l], rMax = height[r], res = 0;\n    while (l < r) {\n        if (lMax < rMax) {\n            l++; lMax = Math.max(lMax, height[l]);\n            res += lMax - height[l];\n        } else {\n            r--; rMax = Math.max(rMax, height[r]);\n            res += rMax - height[r];\n        }\n    }\n    return res;\n}`
      }
    }
  },

  // 13. Regular Expression Matching (Hard)
  {
    id: "p13",
    slug: "regular-expression-matching",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    category: "Dynamic Programming",
    tags: ["String", "Dynamic Programming", "Recursion"],
    companies: ["Google", "Meta", "Uber"],
    acceptanceRate: 28.1,
    description: `Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` and \`'*'\` where:
- \`'.'\` Matches any single character.
- \`'*'\` Matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).`,
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'."
    ],
    examples: [
      { input: 's = "aa", p = "a*"', output: "true" },
      { input: 's = "ab", p = ".*"', output: "true" }
    ],
    starterCode: {
      python: `def isMatch(s, p):
    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
    dp[0][0] = True
    for j in range(2, len(p) + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]
    for i in range(1, len(s) + 1):
        for j in range(1, len(p) + 1):
            if p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2]
                if p[j - 2] == '.' or p[j - 2] == s[i - 1]:
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
            elif p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]
    return dp[len(s)][len(p)]
`,
      javascript: `function isMatch(s, p) {
    const dp = Array.from({ length: s.length + 1 }, () => new Array(p.length + 1).fill(false));
    dp[0][0] = true;
    for (let j = 2; j <= p.length; j++) {
        if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
    }
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= p.length; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2];
                if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    return dp[s.length][p.length];
}`,
      cpp: `bool isMatch(string s, string p) { return true; }`,
      java: `boolean isMatch(String s, String p) { return true; }`
    },
    testCases: [
      { id: "tc-13-1", input: '"aa"\n"a*"', expectedOutput: "true", isSample: true },
      { id: "tc-13-2", input: '"ab"\n".*"', expectedOutput: "true", isSample: true },
      { id: "tc-13-3", input: '"mississippi"\n"mis*is*p*."', expectedOutput: "false", isSample: false }
    ],
    editorial: {
      approach: "2D Dynamic programming table where dp[i][j] represents whether s[0..i-1] matches p[0..j-1].",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
      solutions: {
        python: `def isMatch(s, p):\n    dp = [[False]*(len(p)+1) for _ in range(len(s)+1)]\n    dp[0][0] = True\n    for j in range(2, len(p)+1):\n        if p[j-1] == '*': dp[0][j] = dp[0][j-2]\n    for i in range(1, len(s)+1):\n        for j in range(1, len(p)+1):\n            if p[j-1] == '*':\n                dp[i][j] = dp[i][j-2] or ((p[j-2] in ('.', s[i-1])) and dp[i-1][j])\n            elif p[j-1] in ('.', s[i-1]):\n                dp[i][j] = dp[i-1][j-1]\n    return dp[-1][-1]`,
        javascript: `function isMatch(s, p) {\n    const dp = Array.from({length: s.length+1}, () => Array(p.length+1).fill(false));\n    dp[0][0] = true;\n    for(let j=2; j<=p.length; j++) if(p[j-1]==='*') dp[0][j] = dp[0][j-2];\n    for(let i=1; i<=s.length; i++) {\n        for(let j=1; j<=p.length; j++) {\n            if(p[j-1]==='*') dp[i][j] = dp[i][j-2] || ((p[j-2]==='.'||p[j-2]===s[i-1]) && dp[i-1][j]);\n            else if(p[j-1]==='.'||p[j-1]===s[i-1]) dp[i][j] = dp[i-1][j-1];\n        }\n    }\n    return dp[s.length][p.length];\n}`
      }
    }
  },

  // 14. Word Ladder (Hard)
  {
    id: "p14",
    slug: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graphs",
    tags: ["Breadth-First Search", "Hash Table", "String"],
    companies: ["Amazon", "Google", "LinkedIn", "Microsoft"],
    acceptanceRate: 37.4,
    description: `A **transformation sequence** from word \`beginWord\` to word \`endWord\` using a dictionary \`wordList\` is a sequence of words \`beginWord -> s1 -> s2 -> ... -> sk\` such that:
- Every adjacent pair of words differs by a single letter.
- Every \`si\` for \`1 <= i <= k\` is in \`wordList\`.
- \`sk == endWord\`

Given two words, \`beginWord\` and \`endWord\`, and a dictionary \`wordList\`, return *the **number of words** in the **shortest transformation sequence***, or \`0\` if no such sequence exists.`,
    constraints: [
      "1 <= beginWord.length <= 10",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 5000",
      "wordList[i].length == beginWord.length"
    ],
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5", explanation: '"hit" -> "hot" -> "dot" -> "dog" -> "cog"' }
    ],
    starterCode: {
      python: `def ladderLength(beginWord, endWord, wordList):
    from collections import deque
    words = set(wordList)
    if endWord not in words: return 0
    queue = deque([(beginWord, 1)])
    visited = {beginWord}
    while queue:
        word, length = queue.popleft()
        if word == endWord: return length
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i+1:]
                if next_word in words and next_word not in visited:
                    visited.add(next_word)
                    queue.append((next_word, length + 1))
    return 0
`,
      javascript: `function ladderLength(beginWord, endWord, wordList) {
    const words = new Set(wordList);
    if (!words.has(endWord)) return 0;
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);
    while (queue.length > 0) {
        const [word, len] = queue.shift();
        if (word === endWord) return len;
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const char = String.fromCharCode(c);
                const next = word.slice(0, i) + char + word.slice(i + 1);
                if (words.has(next) && !visited.has(next)) {
                    visited.add(next);
                    queue.push([next, len + 1]);
                }
            }
        }
    }
    return 0;
}`,
      cpp: `int ladderLength(string beginWord, string endWord, vector<string>& wordList) { return 0; }`,
      java: `int ladderLength(String beginWord, String endWord, List<String> wordList) { return 0; }`
    },
    testCases: [
      { id: "tc-14-1", input: '"hit"\n"cog"\n["hot","dot","dog","lot","log","cog"]', expectedOutput: "5", isSample: true },
      { id: "tc-14-2", input: '"hit"\n"cog"\n["hot","dot","dog","lot","log"]', expectedOutput: "0", isSample: true }
    ],
    editorial: {
      approach: "Model the words as an unweighted graph where an edge connects words differing by 1 character. Shortest path is solved with Breadth-First Search (BFS).",
      timeComplexity: "O(M^2 * N) where M is length of word and N is size of dictionary",
      spaceComplexity: "O(M * N)",
      solutions: {
        python: `def ladderLength(beginWord, endWord, wordList):\n    from collections import deque\n    words = set(wordList)\n    if endWord not in words: return 0\n    q = deque([(beginWord, 1)])\n    visited = {beginWord}\n    while q:\n        w, d = q.popleft()\n        if w == endWord: return d\n        for i in range(len(w)):\n            for c in 'abcdefghijklmnopqrstuvwxyz':\n                nxt = w[:i] + c + w[i+1:]\n                if nxt in words and nxt not in visited:\n                    visited.add(nxt)\n                    q.append((nxt, d + 1))\n    return 0`,
        javascript: `function ladderLength(beginWord, endWord, wordList) {\n    const words = new Set(wordList);\n    if (!words.has(endWord)) return 0;\n    const q = [[beginWord, 1]];\n    const seen = new Set([beginWord]);\n    while (q.length) {\n        const [w, d] = q.shift();\n        if (w === endWord) return d;\n        for (let i = 0; i < w.length; i++) {\n            for (let c = 97; c <= 122; c++) {\n                const next = w.slice(0, i) + String.fromCharCode(c) + w.slice(i+1);\n                if (words.has(next) && !seen.has(next)) { seen.add(next); q.push([next, d+1]); }\n            }\n        }\n    }\n    return 0;\n}`
      }
    }
  },

  // 15. N-Queens (Hard)
  {
    id: "p15",
    slug: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    category: "Backtracking",
    tags: ["Array", "Backtracking"],
    companies: ["Amazon", "Microsoft", "Google"],
    acceptanceRate: 66.8,
    description: `The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.`,
    constraints: ["1 <= n <= 9"],
    examples: [
      { input: "n = 4", output: '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]' }
    ],
    starterCode: {
      python: `def solveNQueens(n):
    res = []
    board = [['.'] * n for _ in range(n)]
    cols = set()
    pos_diag = set()
    neg_diag = set()
    def backtrack(r):
        if r == n:
            res.append([''.join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                continue
            cols.add(c)
            pos_diag.add(r + c)
            neg_diag.add(r - c)
            board[r][c] = 'Q'
            backtrack(r + 1)
            cols.remove(c)
            pos_diag.remove(r + c)
            neg_diag.remove(r - c)
            board[r][c] = '.'
    backtrack(0)
    return res
`,
      javascript: `function solveNQueens(n) {
    const res = [];
    const cols = new Set(), pos = new Set(), neg = new Set();
    const board = Array.from({ length: n }, () => new Array(n).fill('.'));
    function backtrack(r) {
        if (r === n) {
            res.push(board.map(row => row.join('')));
            return;
        }
        for (let c = 0; c < n; c++) {
            if (cols.has(c) || pos.has(r + c) || neg.has(r - c)) continue;
            cols.add(c); pos.add(r + c); neg.add(r - c);
            board[r][c] = 'Q';
            backtrack(r + 1);
            cols.delete(c); pos.delete(r + c); neg.delete(r - c);
            board[r][c] = '.';
        }
    }
    backtrack(0);
    return res;
}`,
      cpp: `vector<vector<string>> solveNQueens(int n) { return {}; }`,
      java: `List<List<String>> solveNQueens(int n) { return new ArrayList<>(); }`
    },
    testCases: [
      { id: "tc-15-1", input: "4", expectedOutput: '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]', isSample: true },
      { id: "tc-15-2", input: "1", expectedOutput: '[[\"Q\"]]', isSample: true }
    ],
    editorial: {
      approach: "Place queens row by row with backtracking. Track invalid columns and diagonals using sets.",
      timeComplexity: "O(n!)",
      spaceComplexity: "O(n^2)",
      solutions: {
        python: `def solveNQueens(n):\n    res = []\n    cols, pos, neg = set(), set(), set()\n    board = [['.']*n for _ in range(n)]\n    def bt(r):\n        if r == n:\n            res.append([''.join(row) for row in board]); return\n        for c in range(n):\n            if c in cols or (r+c) in pos or (r-c) in neg: continue\n            cols.add(c); pos.add(r+c); neg.add(r-c); board[r][c] = 'Q'\n            bt(r+1)\n            cols.remove(c); pos.remove(r+c); neg.remove(r-c); board[r][c] = '.'\n    bt(0)\n    return res`,
        javascript: `function solveNQueens(n) {\n    const res = [], cols = new Set(), pos = new Set(), neg = new Set();\n    const board = Array.from({length: n}, () => Array(n).fill('.'));\n    function bt(r) {\n        if (r === n) { res.push(board.map(row => row.join(''))); return; }\n        for (let c = 0; c < n; c++) {\n            if (cols.has(c) || pos.has(r+c) || neg.has(r-c)) continue;\n            cols.add(c); pos.add(r+c); neg.add(r-c); board[r][c] = 'Q';\n            bt(r+1);\n            cols.delete(c); pos.delete(r+c); neg.delete(r-c); board[r][c] = '.';\n        }\n    }\n    bt(0); return res;\n}`
      }
    }
  },

  // 16. Coin Change (Medium)
  {
    id: "p16",
    slug: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
    acceptanceRate: 42.1,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.`,
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
      { input: "coins = [2], amount = 3", output: "-1" }
    ],
    starterCode: {
      python: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
`,
      javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const coin of coins) {
        for (let x = coin; x <= amount; x++) {
            dp[x] = Math.min(dp[x], dp[x - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      cpp: `int coinChange(vector<int>& coins, int amount) { return -1; }`,
      java: `int coinChange(int[] coins, int amount) { return -1; }`
    },
    testCases: [
      { id: "tc-16-1", input: "[1,2,5]\n11", expectedOutput: "3", isSample: true },
      { id: "tc-16-2", input: "[2]\n3", expectedOutput: "-1", isSample: true },
      { id: "tc-16-3", input: "[1]\n0", expectedOutput: "0", isSample: false }
    ],
    editorial: {
      approach: "Bottom-up dynamic programming. dp[x] stores minimum coins for amount x, computed via dp[x] = min(dp[x], dp[x - coin] + 1).",
      timeComplexity: "O(amount * len(coins))",
      spaceComplexity: "O(amount)",
      solutions: {
        python: `def coinChange(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for c in coins:\n        for x in range(c, amount + 1):\n            dp[x] = min(dp[x], dp[x - c] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1`,
        javascript: `function coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (const c of coins) {\n        for (let x = c; x <= amount; x++) dp[x] = Math.min(dp[x], dp[x - c] + 1);\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}`
      }
    }
  },

  // 17. Valid Parentheses (Easy)
  {
    id: "p17",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    tags: ["String", "Stack"],
    companies: ["Amazon", "Meta", "Google", "Bloomberg"],
    acceptanceRate: 40.5,
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.`,
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    starterCode: {
      python: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack
`,
      javascript: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
      cpp: `bool isValid(string s) { return true; }`,
      java: `boolean isValid(String s) { return true; }`
    },
    testCases: [
      { id: "tc-17-1", input: '"()"', expectedOutput: "true", isSample: true },
      { id: "tc-17-2", input: '"()[]{}"', expectedOutput: "true", isSample: true },
      { id: "tc-17-3", input: '"(]"', expectedOutput: "false", isSample: false }
    ],
    editorial: {
      approach: "Push opening brackets onto a stack. When a closing bracket arrives, verify that it matches the bracket popped from the stack.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      solutions: {
        python: `def isValid(s):\n    stack = []\n    m = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in m:\n            if not stack or stack.pop() != m[c]: return False\n        else: stack.append(c)\n    return len(stack) == 0`,
        javascript: `function isValid(s) {\n    const stack = [], m = {')':'(', '}':'{', ']':'['};\n    for(const c of s) {\n        if(c in m) { if(stack.pop() !== m[c]) return false; }\n        else stack.push(c);\n    }\n    return stack.length === 0;\n}`
      }
    }
  },

  // 18. Maximum Subarray (Medium)
  {
    id: "p18",
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    companies: ["Amazon", "Apple", "Microsoft", "Google"],
    acceptanceRate: 50.3,
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.`,
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" }
    ],
    starterCode: {
      python: `def maxSubArray(nums):
    max_sum = cur_sum = nums[0]
    for num in nums[1:]:
        cur_sum = max(num, cur_sum + num)
        max_sum = max(max_sum, cur_sum)
    return max_sum
`,
      javascript: `function maxSubArray(nums) {
    let maxSum = nums[0], curSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        curSum = Math.max(nums[i], curSum + nums[i]);
        maxSum = Math.max(maxSum, curSum);
    }
    return maxSum;
}`,
      cpp: `int maxSubArray(vector<int>& nums) { return 0; }`,
      java: `int maxSubArray(int[] nums) { return 0; }`
    },
    testCases: [
      { id: "tc-18-1", input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isSample: true },
      { id: "tc-18-2", input: "[1]", expectedOutput: "1", isSample: true },
      { id: "tc-18-3", input: "[5,4,-1,7,8]", expectedOutput: "23", isSample: false }
    ],
    editorial: {
      approach: "Kadane's algorithm: at each index, decide whether to append to the running subarray or start a new subarray.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      solutions: {
        python: `def maxSubArray(nums):\n    max_sum = cur = nums[0]\n    for x in nums[1:]:\n        cur = max(x, cur + x)\n        max_sum = max(max_sum, cur)\n    return max_sum`,
        javascript: `function maxSubArray(nums) {\n    let max_sum = nums[0], cur = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        cur = Math.max(nums[i], cur + nums[i]);\n        max_sum = Math.max(max_sum, cur);\n    }\n    return max_sum;\n}`
      }
    }
  },

  // 19. Climbing Stairs (Easy)
  {
    id: "p19",
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    companies: ["Amazon", "Google", "Adobe"],
    acceptanceRate: 52.4,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    constraints: ["1 <= n <= 45"],
    examples: [
      { input: "n = 2", output: "2", explanation: "1 step + 1 step, or 2 steps." },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1." }
    ],
    starterCode: {
      python: `def climbStairs(n):
    if n <= 2: return n
    first, second = 1, 2
    for _ in range(3, n + 1):
        first, second = second, first + second
    return second
`,
      javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let first = 1, second = 2;
    for (let i = 3; i <= n; i++) {
        const next = first + second;
        first = second;
        second = next;
    }
    return second;
}`,
      cpp: `int climbStairs(int n) { return n; }`,
      java: `int climbStairs(int n) { return n; }`
    },
    testCases: [
      { id: "tc-19-1", input: "2", expectedOutput: "2", isSample: true },
      { id: "tc-19-2", input: "3", expectedOutput: "3", isSample: true },
      { id: "tc-19-3", input: "5", expectedOutput: "8", isSample: false }
    ],
    editorial: {
      approach: "Fibonacci sequence: ways(n) = ways(n-1) + ways(n-2). Keep only the two previous states in variables.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      solutions: {
        python: `def climbStairs(n):\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n+1): a, b = b, a + b\n    return b`,
        javascript: `function climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) { const tmp = a + b; a = b; b = tmp; }\n    return b;\n}`
      }
    }
  },

  // 20. Reverse Linked List (Easy)
  {
    id: "p20",
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked Lists",
    tags: ["Linked List", "Recursion"],
    companies: ["Amazon", "Apple", "Google", "Meta", "Microsoft"],
    acceptanceRate: 74.5,
    description: `Given the \`head\` of a singly linked list (represented as an array of values), reverse the list, and return *the reversed list*.`,
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" }
    ],
    starterCode: {
      python: `def reverseList(head):
    return head[::-1]
`,
      javascript: `function reverseList(head) {
    return [...head].reverse();
}`,
      cpp: `vector<int> reverseList(vector<int>& head) { reverse(head.begin(), head.end()); return head; }`,
      java: `int[] reverseList(int[] head) { return head; }`
    },
    testCases: [
      { id: "tc-20-1", input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]", isSample: true },
      { id: "tc-20-2", input: "[1,2]", expectedOutput: "[2,1]", isSample: true },
      { id: "tc-20-3", input: "[]", expectedOutput: "[]", isSample: false }
    ],
    editorial: {
      approach: "Iteratively reverse pointers with prev and curr, or reverse the array sequence.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      solutions: {
        python: `def reverseList(head):\n    return head[::-1]`,
        javascript: `function reverseList(head) {\n    return [...head].reverse();\n}`
      }
    }
  }
];
