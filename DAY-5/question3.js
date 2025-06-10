// https://leetcode.com/problems/first-unique-character-in-a-string/description/


let s = "leetcode";


let N = s.length;
    let obj = {};
    for(let i=0; i<N; i++){
        if(obj[s[i]] === undefined){
            obj[s[i]] = 1;
        }
        else{
            obj[s[i]]++;
        }
    }

    for(let i=0; i<N; i++){
        if(obj[s[i]] == 1){
            return console.log(i);
        }
    }


    return console.log(-1);