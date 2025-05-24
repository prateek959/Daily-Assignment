
let arr = [10, 5, 2, 7, 1, -10]
let k = 15

function fun(arr,k){

    let N = arr.length;
    let max = 0;
    for (let i = 0; i < N; i++) {
        let sum = 0;
        for (let j = i; j < N; j++) {
            sum += arr[j];
            if (sum == k && max < (j - i + 1)) {
                max = j - i + 1;
            }
        }
    }
  return max;
};

let ans = fun(arr, k);
console.log(ans);