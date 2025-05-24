let arr = [2, 2, 2, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 5, 3, 2];


function fun(arr) {
    let N = arr.length;
    let max = 1;
    let prev = arr[0];
    let count = 1;
    for (let i = 1; i < N; i++) {
        if(prev == arr[i]){
            count++;
        }else{
            if(max < count){
                max = count;
            }
            count = 1;
            prev = arr[i];
        }
    }
    return max;
};

let ans = fun(arr);
console.log(ans);