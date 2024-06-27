// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 30155번 : Crazy Malvika discovers Crazy Fibonacci function
// f(0) = A, f(1) = B
// x ≥ 2, f(x) = f(x - 1) + f(x + 1) => f(x + 1) = f(x) - f(x - 1)

let input = require('fs').readFileSync("input.txt").toString().split('\n')
let output = [];

const T = Number(input[0]);

for(let i = 1; i <= T; i++) {
  const [A, B, N] = input[i].split(' ').map((v) => {return Number(v);})
  const mod = [A, B, B - A, -A, -B, A - B]

  let result = mod[(N - 1) % 6] % 1000000007
  result = result < 0 ? result + 1000000007 : result;

  output.push(result)
}

console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ