// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    5557번 : 1학년 [DP]
    상근이가 만들 수 있는 올바른 등식의 수를 구하는 프로그램
    
    자료형에 유의!!! (중요)
*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
let output = ''; // 출력

let DP = Array.from(Array(101), () => Array(21).fill(BigInt(0))) // DP 배열

const N = Number(input[0]);
const numbers = input[1].split(' ').map((element) => {return Number(element)});

DP[1][numbers[0]] = BigInt(1);

for (let i = 1; i < N; i++) {
    const number = numbers[i];

    for (let j = 0; j < 21; j++) {
        if (j - number >= 0) {
            DP[i + 1][j - number] += DP[i][j];
        }
        if (j + number <= 20) {
            DP[i + 1][j + number] += DP[i][j];
        }
    }
}

console.log(DP[N - 1][numbers[N - 1]].toString()); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ