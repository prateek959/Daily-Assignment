
// https://leetcode.com/problems/minimum-size-subarray-sum/description/

let target = 7
let nums = [2,3,1,2,4,3]

let N = nums.length;
let sum = nums.reduce((accu, i) => accu + i, 0);

if (sum < target) {
    return 0;
}

let left = 0;
let right = 0;
sum = 0;
let ans = nums.length;
while (right <= N) {
    if (sum >= target) {
        ans = Math.min(ans, right - left);
        sum -= nums[left];
        left++;
    }
    else if (sum < target) {
        sum += nums[right];
        right++;
    }
}

console.log(ans);