// https://leetcode.com/problems/majority-element/description/


let nums = [2,2,1,1,1,2,2];


  nums = nums.sort((a, b) => a - b);
    let N = nums.length;
    let left = 0;
    let right = 0;
    let count = 0;
    let ans = nums[0];
    
    while(right < N){
      if(nums[left] == nums[right]){
        count++;
      }
      else{
        count = 1;
        left = right;
      }
      
      if(count > N/2){
        ans = Math.max(ans, nums[left]);
        
      }
      right++;
      
    }

    return console.log(ans);
