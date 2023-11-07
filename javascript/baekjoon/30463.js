// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    30463 K-문자열
    [ 조합론 / 비트마스킹 ]
*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
let output = 0n;

const N = Number(input[0].trim().split(' ')[0]);  // N의 갯수
const M = Number(input[0].trim().split(' ')[1]);  // M의 갯수

const combineList = {};

const bitCount = (param) => {
  if (param == 0) {
    return 0;
  }

  const next = param - (param % 2);
  return (param % 2) + bitCount(next / 2);
}

// 비트 마스킹 이용
for (let index = 0; index < N; index++) {
    const numberString = input[1 + index];
    let bitmask = 0;
    for (let jndex = 0; jndex < numberString.length; jndex++) {
        const numberChar = Number(numberString[jndex]);
        bitmask = bitmask | (1 << numberChar);
    }

    if (combineList[bitmask] === undefined) {
        combineList[bitmask] = 1n;
    } else {
        combineList[bitmask]++;
    }
}

// 조합론
for (let aris in combineList) {
    for (let key in combineList) {
        if (Number(aris) <= Number(key)) {
            if ( bitCount(Number(aris) | Number(key)) === M ) {
                if (Number(aris) === Number(key)) {
                    output += combineList[aris] * (combineList[aris] - 1n) / 2n;
                }
                else {
                    output += combineList[aris] * combineList[key];
                }
            }
        }
    }
}

console.log(output.toString()); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ