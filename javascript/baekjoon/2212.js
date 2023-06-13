// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    각 집중국의 수신 가능 영역의 길이의 합을 최소화
    2212번 : 센서 [ 그리디 알고리즘 ]
*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
let output = 0; // 출력

const N = Number(input[0]); // 센서의 갯수
const K = Number(input[1]); // 집중국의 갯수
const road = input[2].split(' ').map((element) => {return Number(element);}).sort((a, b) => a - b)
const diff = []; // 각 길이의 차이

for (let i = 0; i < N - 1; i++) {
    diff[i] = road[i + 1] - road[i];
    output += diff[i];
}

diff.sort((a, b) => a - b); // 차이 정렬 

for (let i = 0; i < K - 1; i++) {
    output -= diff.pop();
}

if (N <= K) {
    output = 0;
} // 집중국이 센서보다 갯수가 많은 경우 

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ