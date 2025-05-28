const fs = require('fs');

let data = fs.readFileSync('file.log', 'utf-8');
data = data.trim().split('\n');
// console.log(data);

let obj = [];
let four = 0;
let five = 0;
for (let i = 0; i < data.length; i++) {
    let arr = data[i].split(' ');
    let index = obj.findIndex(item => item.url == arr[1]);
    if (index !== -1) {
        obj[index].count++;
    } else {
        obj.push({ url: arr[1], count: 1 });
    }

    if (+arr[2] >= 400 && +arr[2] <= 499) {
        four++;
    }

    if (+arr[2] >= 500 && +arr[2] <= 599) {
        five++;
    }

}
obj.sort((a, b)=>b.count - a.count);
let top = obj.slice(0,3);

let newStats = {
    "totalRequests": data.length,
    "error4xx": four,
    "error5xx": five,
    "top3Urls": top
};

fs.writeFileSync('stats.json', JSON.stringify(newStats, null, 2), 'utf-8');
console.log('Log analysis success');