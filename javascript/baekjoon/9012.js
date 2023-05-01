// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
const N = input[0];
const output = [];

for (let i = 1; i <= N; i++) {
    const stack = [];
    const inputLine = input[i];

    for (const char of inputLine) {
        if (char === ')' && stack[stack.length - 1] === '(') {
            stack.pop();
        }
        else {
            stack.push(char);
        }
    }

    (stack.length === 0) ? (output.push("YES")) : (output.push("NO")); 
}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ
