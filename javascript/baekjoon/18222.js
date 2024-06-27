// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 18222번 : 투에-모스 문자열

let input = require('fs').readFileSync('/dev/stdin').toString().split('\n')
let output = 0

let N = BigInt(input[0])

const find = (n) => {
  if (n === 1n) {
    return false
  } else if (n === 2n) {
    return true
  }

  let modNumber = 2n;
  while(n > modNumber * 2n) {
    modNumber = modNumber * 2n;
  }

  const next = (n % modNumber === 0n) ?  modNumber : n % modNumber
  return !find(next);
}

output = find(N)

console.log(output ? 1 : 0); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ