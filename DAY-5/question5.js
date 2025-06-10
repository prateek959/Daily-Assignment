// https://leetcode.com/problems/valid-parentheses/description/


let s = "()[]{}";

s = s.split('');
    let N = s.length;
    let stk = [];

    for (let i = 0; i < N; i++) {
        if (s[i] == '(' || s[i] == '{' || s[i] == '[') {
            stk.push(s[i]);
        } else {
            if (s[i] == ')' && stk[stk.length - 1] !== '(') {
                return false;
            } else if (s[i] == '}' && stk[stk.length - 1] !== '{') {
                return false;
            } else if (s[i] == ']' && stk[stk.length - 1] !== '[') {
                return false;
            }
            stk.pop();
        }
    }

    if(stk.length !== 0){
        return console.log(false);
    }

     console.log(true);