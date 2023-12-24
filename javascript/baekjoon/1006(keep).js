// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1006번 : 습격자 초라기
// DP

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
let output = [];

const solution = (n, w, enemy) => {
    // 목적 : DP를 활용하여 최솟값을 구한다.

    // 1. 결합 여부가 되는 지 판단한다.
    let abled = [];

    for (let i = 0; i < n; i++) {
        const rightIndex = (i + 1) % n;
        const upIndex = i + n;

        if ((enemy[i] + enemy[rightIndex]) <= w) {
            abled.push([i, rightIndex]);
        }

        if ((enemy[i] + enemy[upIndex]) <= w) {
            abled.push([i, upIndex]);
        }
    }

    console.log(abled);
}

let t = Number(input[0]);

for (let testcase = 0; testcase < t; testcase++) {
    const inputLine = input[testcase * 3 + 1].split(' ');
    const n = Number(inputLine[0]);
    const w = Number(inputLine[1]);

    let enemy = input[testcase * 3 + 2] + ' ' + input[testcase * 3 + 3];
    enemy = enemy.split(' ').map((value) => {return Number(value)});

    solution(n, w, enemy);
}

console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ