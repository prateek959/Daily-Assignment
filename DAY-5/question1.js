// https://leetcode.com/problems/find-all-duplicates-in-an-array/description/

let nums = [4,3,2,7,8,2,3,1];


  let ans = [];
    let N = nums.length;
    let obj = {};
    for (let i = 0; i < N; i++) {
        if (obj[nums[i]]) {
            ans.push(nums[i]);
        } else {
            obj[nums[i]] = 1;
        }
    }

    console.log(ans);