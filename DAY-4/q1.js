
let nums = [-1,0,1,2,-1,-4];
let N = nums.length;
let ans = [];

for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
        for (let k = j + 1; k < N; k++) {
            let sum = nums[i] + nums[j] + nums[k];
            if (sum === 0) {
                ans.push([nums[i], nums[j], nums[k]]);
            }
        }
    }
}

console.log(ans);