// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    1922번 [최소 스패닝 트리] : 네트워크 연결
*/

/*
아래에 solution 작성
*/

let input = require('fs').readFileSync('input.txt',"utf8").toString().trim().split('\n'); // 테스트
let output = 0;

const N = Number(input[0]); // 컴퓨터의 수
const M = Number(input[1]); // 연결할 수 있는 선의 수

let stack = []; // 연결 된 거
let lines = []; // 연결 정보
let sortLine = [];

for (let index = 0; index <= N; index++) {
    lines[index] = []
}

for (let index = 2; index < input.length; index++) {
    const tmp = input[index].split(' ');

    const a =  Number(tmp[0]);
    const b =  Number(tmp[1]);
    const c =  Number(tmp[2]);

    lines[a].push([b, c]);
    lines[b].push([a, c]);
}

stack.push(1); // start
for (let index = 0; index < lines[1].length; index++) {
    sortLine.push([1, lines[1][index][0], lines[1][index][1]]);
}
sortLine.sort((a, b) => {return a[2] - b[2]});

while (stack.length < N) {

    if (stack.find((element) => {return element === sortLine[0][1]}) === undefined) {
        output += sortLine[0][2];

        const next = sortLine[0][1];
        sortLine.shift();

        stack.push(next);
        for (let index = 0; index < lines[next].length; index++) {
            sortLine.push([next, lines[next][index][0], lines[next][index][1]]);
        }
        sortLine.sort((a, b) => {return a[2] - b[2]});

    }
    else {
        sortLine.shift();
    }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ
