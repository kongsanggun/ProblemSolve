// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 12865번 평범한 배낭

let inputs = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
let output = -1;

let firstInput = inputs[0].split(' ');
let n = Number(firstInput[0]); // 물품의 갯수
let k = Number(firstInput[1]); // 배낭의 무게
let goods = [];

let dp = Array.from(Array(n + 1), () => Array(k + 1).fill(0));

for(let index = 1; index <= n; index++) {
    const tmpInput = inputs[index].split(' ');
    const w = Number(tmpInput[0]);
    const v = Number(tmpInput[1]);

    goods.push([w, v]);
}

for(let good = 1; good <= n; good++) {
    for(let wight = 1; wight <= k; wight++) {
        const goodWight = goods[good - 1][0];
        const value = goods[good - 1][1];
        dp[good][wight] = Math.max(dp[good - 1][wight], dp[good][wight - 1]);
        if(wight - goodWight >= 0) {
            const sum = dp[good - 1][wight - goodWight] + value;
            dp[good][wight] = Math.max(dp[good][wight], sum);
        }
    }
}

output = dp[n][k];

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ