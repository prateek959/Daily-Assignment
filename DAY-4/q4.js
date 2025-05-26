
let s = "A man, a plan, a canal: Panama";

let alpha = 'qwertyuiopasdfghjklzxcvbnm1234567890';

    let N = s.length;
    let str = '';
    for (let i = 0; i < N; i++) {
        if (alpha.includes(s[i].toLowerCase())) {
            str += s[i].toLowerCase()
        }
    }

    let left = 0;
    let right = str.length-1;

    while(left <= right){
        if(str[left] !== str[right]){
            return false;
        }
        left++;
        right--;
    }

    console.log(true);