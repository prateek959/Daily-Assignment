// https://leetcode.com/problems/find-all-anagrams-in-a-string/description/

let s = "cbaebabacd", p = "abc";
// let N = s.length;

let pobj = {};

for(let i=0; i<p.length; i++){
  if(pobj[p[i]]){
    pobj[p[i]]++;
  }else{
    pobj[p[i]] = 1;
  }
}
// console.log(pobj);
function check(arr, pobj){
  let obj = {};
  for(let i=0; i<arr.length; i++){
    if(obj[arr[i]]){
      obj[arr[i]]++
    }else{
      obj[arr[i]] = 1;
    }
  }
  
  for(let key in pobj){
    if(obj[key] !== pobj[key]){
      return false;
    }
  }
  return true;
  
}

let arr = [];

for(let i=0; i<p.length; i++){
  arr.push(s[i]);
}
// console.log(arr);
let left = p.length;
let ans = [];
while(left <= s.length){
  if(check(arr, pobj)){
    ans.push(left - p.length);
  }
  arr.shift();
  arr.push(s[left]);
  left++;
}


console.log(ans);
