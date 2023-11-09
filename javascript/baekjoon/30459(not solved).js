// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    30459 - 현수막 걸기
    주어진 말뚝과 깃대를 활용해서 현수막을 걸고자 할 때, 쿠가 구매해서 걸 수 있는 현수막 넓이의 최댓값을 구해주자!
    [투포인터 > 이분탐색]
*/

let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); // 테스트

const N = Number(input[0].trim().split(' ')[0]);    // 말뚝의 갯수
const M = Number(input[0].trim().split(' ')[1]);    // 깃대의 갯수
const R = Number(input[0].trim().split(' ')[2]);    // 구입 할 수 있는 최대 현수막 넓이

const A = []; // 말뚝의 위치
const B = []; // 깃대의 길이

let output = -1;
const distance = [];

for (let index = 0; index < N; index++) {
    A.push(Number(input[1].trim().split(' ')[index]));
}

for (let index = 0; index < M; index++) {
    B.push(Number(input[2].trim().split(' ')[index]));
}

// 1. 두 개의 말뚝의 위치의 거리를 전부 구한다.
for (let index = 0; index < N; index++) {
    for (let jndex = index + 1; jndex < N; jndex++) {
        distance.push(Math.abs(A[index] - A[jndex]));
    }
}

// 2. 깃대의 길이를 정렬한다.
B.sort((a, b) => {
    return a - b;
});

// 3. 밑변 고정
for (let index = 0; index < distance.length; index++) {
    // 3-1. 이분탐색
    let left = -1;
    let right = B.length;

    while (left + 1 < right) {
        let mid = Math.round((left + right) / 2);
        let area = Math.round(B[mid] * distance[index] / 2 * 10) / 10;
        if (area <= R) {
            left = mid;
        }
        else {
            right = mid;
        }
    }

    if (left !== -1) {
        let area = Math.round(B[left] * distance[index] / 2 * 10) / 10;
        output = (output <= area) ? area : output;
    }
}

output = (output === -1) ? -1 : (output * 10 / 10)

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ