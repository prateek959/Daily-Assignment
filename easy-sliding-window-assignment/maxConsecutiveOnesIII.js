
// https://leetcode.com/problems/max-consecutive-ones-iii/description/


let nums = [1,1,1,0,0,0,1,1,1,1,0];
let k = 2;

let N = nums.length;

    let left = 0;
    let right = 0;
    let count = 0;
    let ans = 0;
    while (right < N) {
        if (nums[right] == 0) {
            count++;
        }
         right++;
        if (count <= k) {
            ans = Math.max(ans, right - left);
        }

        while (count > k && left <= right) {
            if (nums[left] == 0) {
                count--;
            }
            left++;
        }

    }
    console.log(ans);