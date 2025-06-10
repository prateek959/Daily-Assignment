// https://leetcode.com/problems/sliding-window-maximum/description/


let nums = [1,3,-1,-3,5,3,6,7], k = 3;

    let N = nums.length;

    let max = -Infinity;
    let ans = [];

    for (let i = 0; i < k; i++) {
        max = Math.max(max, nums[i]);
    };

    ans.push(max);
    for (let i = k; i < N; i++) {
        max = -Infinity;
        let left = i - k + 1;
        while (left <= i) {
            max = Math.max(max, nums[left]);
            left++;
        }
        ans.push(max);
    }

console.log(ans);