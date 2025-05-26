
let columnNumber = 1;
 let obj = {};

    for (let i = 0; i < 26; i++) {
        let char = String.fromCharCode(65 + i);
        obj[i + 1] = char;
    };

    if (columnNumber.length == 1) {
        return obj[columnNumber];
    }
    let sum = 0;
    sum += 26 * obj[columnNumber[0]];
    sum += obj[columnNumber[1]];

    console.log(sum);