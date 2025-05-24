let arr = [2, 3, 4, 2, 3, 1, 6, 4, 6, 3];
let k = 2;


function fun(arr, k) {
    let N = arr.length;
    let obj = {};
    for (let i = 0; i < N; i++) {
        if (obj[arr[i]]) {
            obj[arr[i]]++;
        } else {
            obj[arr[i]] = 1;
        }
    }
    let ans = [];
    // console.log('16',obj);
    for(let i=0; i<k; i++){
        let max = 0;
        let val;
        for (let key in obj) {
            if (max < +obj[key] && ans.length < k){
                max = +obj[key]
                val = key;
            }
        }
        ans.push(+val);
        delete obj[val];
        // console.log('25',obj);
    }
    return ans;
}

let ans = fun(arr,k);
console.log(ans);