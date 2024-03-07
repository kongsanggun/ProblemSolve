// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 13422번
// 도둑
// 도둑이 자동 방범장치에 붙잡히지 않도록 연속된 M개의 집에서 돈을 훔치는 방법의 가짓수

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = "";

const solution = (N, M, K, moneyList) => {
  let result = 0;
  let sumList = [0];   // 누적합

  for(let index = 0; index < N * 2; index++) {
    const money = moneyList[index % N];
    const top = sumList[sumList.length - 1];
    sumList.push(top + money);
  }

  if(N === M) {
    return (sumList[M] - sumList[0] < K) ? 1 : 0;
  } 

  for(let index = 0; index < N; index++) {
    const sum = sumList[index + M] - sumList[index];
    if(sum < K) {
      result++;
    }
  }

  return result;
}

const T = Number(input[0]);
for(let test = 0; test < T; test++) {
  const testInput = input[test * 2 + 1].split(' ').map(v => Number(v));
  const moneyList = input[test * 2 + 2].split(' ').map(v => Number(v));

  const N = testInput[0]; // 집의 갯수
  const M = testInput[1]; // 연속된 집
  const K = testInput[2]; // 이상 넘어가면 안 됨

  output += (test !== T - 1) ? solution(N, M, K, moneyList) + '\n': solution(N, M, K, moneyList); 
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ