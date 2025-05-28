
// https://leetcode.com/problems/fruit-into-baskets/description/

let fruits = [1,2,1];

let N = fruits.length;

let left = 0;
let right = 0;
let obj = {};
let count = 0;
let ans = 0;
while (right < N) {
    if (obj[fruits[right]]) {
        obj[fruits[right]]++;
        right++;
    } else {
        obj[fruits[right]] = 1;
        right++;
        count++;
    }

    if (count <= 2) {
        ans = Math.max(ans, right - left);
    }

    while (count > 2 && left <= right) {
        obj[fruits[left]]--;
        if (obj[fruits[left]] == 0) {
            count--;
            delete obj[fruits[left]];
        }
        left++;
    }

}
console.log(ans);