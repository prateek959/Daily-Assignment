
// https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1

let  s = "aabacbebebe";
let k = 3

 let N = s.length;
       let obj = {};
       
       let left = 0;
       let right = 0;
       let ans = -1;
       let count = 0;
       while(right < N){
           if(obj[s[right]]){
               obj[s[right]]++
               right++;
           }else{
                   obj[s[right]] = 1;
                   right++;
                   count++;
           }
           
            if(count == k){
                       ans = Math.max(ans, right - left);
                   }
                    if(count > k){
                   while(count > k && left <= right){
                       obj[s[left]]--;
                       if(obj[s[left]] == 0){
                       delete obj[s[left]];
                           count--;
                       }
                       left++;
                   }
               }
           
       }
     console.log(ans);