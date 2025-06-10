// https://leetcode.com/problems/longest-consecutive-sequence/description/

let nums = [100,4,200,1,3,2];


if(nums.length == 0){
        return 0;
    }

    nums.sort((a, b) => a - b);
    let count = 1;
    let N = nums.length;
    let start = nums[0];
    let ans = 0;
    for (let i = 1; i < N; i++) {
        if(start == nums[i]){
            continue;
        }else if((start+1) == nums[i]){
            count++;
            start = nums[i];
        }else{
             ans = Math.max(ans,count);
            count = 1;
            start = nums[i];
        }
    }
    ans = Math.max(ans,count);
    console.log(ans);