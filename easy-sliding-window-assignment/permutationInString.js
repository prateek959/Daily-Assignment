
// https://leetcode.com/problems/permutation-in-string/


let s1 = "adc", s2 = "dcda";

function check(arr, s1) {
// console.log(arr)
    s1 = s1.split('').sort();
    arr.sort();
    let left = 0;
    while (left < s1.length) {
        if (arr[left] !== s1[left]) {
            return false;
        }
        left++;
    }
    return true;

}


let str = [];
    for (let i = 0; i < s1.length; i++) {
        str.push(s2[i]);
    }
    let left = s1.length;
    while (left <= s2.length) {
      let arr = [...str];
        if (check(arr, s1)) {
            return console.log(true);
        }
  console.log(str)
        str.shift();
        str.push(s2[left]);
        left++;
    }
console.log(false);
