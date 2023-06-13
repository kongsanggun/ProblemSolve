// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    1477번 : 휴게소 세우기 [ 이분 탐색 ]

    지으려는 휴게소를 지을 경우 휴게소가 없는 구간의 길이의 최댓값을 최소값 구하기
    
    이분탐색의 기준 세우기가 중요한 문제 -> 어디를 초점으로 기준을 세울 것인가
*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트

const N = Number(input[0].split(' ')[0]); // 현재 휴게소의 갯수
const M = Number(input[0].split(' ')[1]); // 더 지으려고 하는 휴게소의 갯수
const L = Number(input[0].split(' ')[2]); // 고속도로의 길이

const rest = []; // 현재 휴게소의 위치 
const diff = []; // 휴게소가 없는 구간

rest.push(0);
rest.push(L);
for (let i = 0; i < N; i++) {
    rest.push(Number(input[1].split(' ')[i]));
}
rest.sort((a, b) => {return a - b})

for (let i = 0; i < rest.length - 1; i++) {
    diff.push(rest[i + 1] - rest[i] - 1)
}

let low = 1;
let high = Math.max(...diff);

const istrue = (mid) => {
    let cnt = 0;
    for (let i = 0; i < diff.length; i++) {
        cnt += Math.floor(diff[i] / mid); // 각 거리 차이마다 세울 수 있는 휴게소의 수 구하기 
    }

    if (cnt > M) {
        return true;
    } else {
        return false;
    }
}

while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (istrue(mid)) {
        low = mid + 1;
    } // 간격을 넓혀야 하는 경우 => 갯수가 많은 경우
    else {
        high = mid - 1;
    } // 간격을 줄여야 하는 경우 => 갯수가 적은 경우
}

console.log(low); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ