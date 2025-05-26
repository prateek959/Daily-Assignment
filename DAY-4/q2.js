
let nums = [1,1,2];

 let left = 0;
    let right = 0;
    let N = nums.length;

    while(right < N){
        if(nums[left] == nums[right]){
            right++;
        }else{
             left++;
             nums[left] = nums[right];
             right++;
        }
    }

    console.log(left + 1);