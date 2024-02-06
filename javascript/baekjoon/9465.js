// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 9465번 스티커 

let inputs = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
let output = '';
let t = Number(inputs[0]);

const solution = (n, sticker) => {
    let result = 0;
    let dp = [[sticker[0][0], sticker[1][0], 0]]; // [위 선택, 아래 선택, 안 선택]

    for(let index = 1; index < n; index++) {
        let tmpDp = [];
        const top = index - 1;

        tmpDp.push(Math.max(dp[top][1], dp[top][2]) + sticker[0][index]);
        tmpDp.push(Math.max(dp[top][0], dp[top][2]) + sticker[1][index]);
        tmpDp.push(Math.max(dp[top][0], dp[top][1], dp[top][2]));

        dp.push(tmpDp);
    }

    result = Math.max(dp[dp.length - 1][0], dp[dp.length - 1][1], dp[dp.length - 1][2]);

    return result;
}

for(let testcase = 0; testcase < t; testcase++) {
    const n = Number(inputs[testcase * 3 + 1]);

    let sticker = [];
    sticker.push(inputs[testcase * 3 + 2].split(' ').map((v) => {return Number(v)}));
    sticker.push(inputs[testcase * 3 + 3].split(' ').map((v) => {return Number(v)}));

    output += solution(n, sticker);

    if(testcase !== t - 1) {
        output += '\n';
    }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ