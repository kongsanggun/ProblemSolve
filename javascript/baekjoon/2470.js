// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    2470번 : 두 용액 [투 포인터]
*/

/*
아래에 solution 작성
*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
const liqudList = [];
let output = []; 

input[1].split(' ').forEach((value) => {
    liqudList.push(Number(value));
}) // 리스트 추가

liqudList.sort((a, b) => {
    return a - b;
});

let front = 0;
let back = liqudList.length - 1;
let abs = 9876543210;

while (front < back) {
    const diff = Math.abs(liqudList[back] + liqudList[front]);

    if (diff < abs) {
        abs = diff;
        output[0] = liqudList[front];
        output[1] = liqudList[back];
    }

    if (liqudList[back] + liqudList[front] >= 0) {
        back = back - 1;
    }
    else {
        front = front + 1;
    }
}

console.log(output[0] +  ' ' + output[1]); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ