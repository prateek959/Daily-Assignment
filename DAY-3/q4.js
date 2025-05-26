let columnTitle = "A";

 let obj = {};

    for (let i = 0; i < 26; i++) {
        let char = String.fromCharCode(65 + i);
        obj[char] = i + 1;
    };

    if (columnTitle.length == 1) {
        return obj[columnTitle];
    }

    let N = columnTitle.length;

    let sum = columnTitle[0];
    for (let i = 0; i < N - 1; i++) {
        sum *= 26;
    }

    sum += obj[columnTitle[N - 1]];
    if (sum > 2147483647) {
        console.log(2147483647) ;
    } else {
        console.log(sum) ;
    }