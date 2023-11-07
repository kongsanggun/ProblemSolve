// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    30459 - 현수막 걸기
    주어진 말뚝과 깃대를 활용해서 현수막을 걸고자 할 때, 쿠가 구매해서 걸 수 있는 현수막 넓이의 최댓값을 구해주자!
    [투포인터 > 이분탐색]
*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트

const N = Number(input[0].trim().split(' ')[0]);    // 말뚝의 갯수
const M = Number(input[0].trim().split(' ')[1]);    // 깃대의 갯수
const R = Number(input[0].trim().split(' ')[2]) * 2;    // 구입 할 수 있는 최대 현수막 넓이

const A = []; // 말뚝의 위치
const B = []; // 깃대의 길이

for (let index = 0; index < N; index++) {
    A.push(Number(input[1].trim().split(' ')[index]));
}

A.sort((a, b) => {
    return a - b;
}); // 투 포인터용 정렬 


for (let index = 0; index < M; index++) {
    B.push(Number(input[2].trim().split(' ')[index]));
}

B.sort((a, b) => {
    return a - b;
}); // 투 포인터용 정렬 

let lo = -1;
let hi = R;

// 넓이 mid를 만들 수 있나 
const Check = (mid) => { 

}

while (lo + 1 < hi) {
    let mid = (lo + hi) / 2;
    if (Check(mid)) lo = mid;
    else hi = mid;
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ