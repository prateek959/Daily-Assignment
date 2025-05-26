
let s = "42";

let N = s.length;
    let ans = '0';
    s = s.trim();
    s = s.split('')
    console.log(s);
    for (let i = 0; i < N; i++) {
        let add = '';
        if (i == 0 && (s[i] == '-' || s[i] == '+')) {
            continue;
        }
        if (ans == 0 && s[i] == 0 && s[i] !== ' ') {
            continue
        }
        if (s[i] >= '0' && s[i] <= '9') {
            add += s[i];
        } else {
            break;
        }

        if (add !== '') {
            ans += add
        }
    }
    let lowerBound = Math.pow(-2, 31);
    let upperBound = Math.pow(2, 31) - 1;
    if (s[0] == '-') {
        let n = -Number(ans);
        if (n >= lowerBound) {
           console.log(n);
        } else {
            console.log(lowerBound)
        }
    } else {
        let n = Number(ans);
        if (n > upperBound) {
           console.log(upperBound) ;
        } else {
            console.log(n);
        }
    }