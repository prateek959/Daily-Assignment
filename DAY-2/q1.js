let str = 'abcdnskskjfhfabsc';

function fun(){
    let N = str.length;
    let obj = {};
    for(let i=0; i<N; i++){
        if(obj[str[i]]){
            obj[str[i]]++;
        }else{
            obj[str[i]] = 1;
        }
    }

    for(let i=0; i<N; i++){
        if(obj[str[i]] === 1){
            return str[i];
        }
    }
    return 1;
};

let ans = fun(str);
console.log(ans);