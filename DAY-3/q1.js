let s = "MCMXCIV";

let N = s.length;
    s = s.split('');
    let ans= 0;
    let obj = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000};
    // console.log(obj);
    for(let i=0; i<N-1; i++){
      // console.log(ans)
          if(obj[s[i]] >= obj[s[i+1]]){
            ans += obj[s[i]];
          }else{
            ans -= obj[s[i]];
          }
    }
    ans += obj[s[N-1]]
    console.log(ans);