// 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2294 : 동전 2


let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 
let output = -1;

let line = input[0].split(' ');

const n = Number(line[0]); 
const k = Number(line[1]); // 이상이 아님!

let coin = [];
let dp = Array.from({length : k + 1}, () => null); // DP 배열

for (let i = 1; i < 1 + n; i++) {
    coin.push(Number(input[i]));
}
coin = coin.sort((a, b) => {return a - b;})

// 1. dp init
for (let item of coin) {
    if (item <= k) {
        dp[item] = 1;
    }
}

// 2. dp 순회 돌면서 계산
for (let i = 1; i <= k; i++) {
    for (let item of coin) {
        // if((i - item) > 0) {
        //     console.log(i + " " + item);
        //     console.log(dp[i - item]);
        // }
        
        if ((i - item) > 0 && dp[i - item] !== null) {
            if (dp[i] === null) {
                dp[i] = dp[i - item] + 1;
            }
            else {
                dp[i] = Math.min(dp[i], dp[i - item] + 1);
            } 
        }
    }
}

output = (dp[k] === null) ? -1 : dp[k]; 

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ