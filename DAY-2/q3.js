let str = 'babad';

function palindrome(str) {
    let left = 0;
    let right = str.length - 1;

    while (left <= right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

function fun(str) {
    let N = str.length;
    let max = 0;
    let ans = '';
    for (let i = 0; i < N; i++) {
        let s = '';
        for (let j = i; j < N; j++) {
             s += str[j];
             if(max < s.length && palindrome(s)){
                max = s.length;
                ans = s;
             }
        }
    }

    return ans;
}

let ans = fun(str);
console.log(ans);