// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    1922번 [최소 스패닝 트리] : 네트워크 연결
*/

let input = require('fs').readFileSync('input.txt',"utf8").toString().trim().split('\n'); // 테스트
let output = 0;

const N = Number(input[0]); // 컴퓨터의 수
const M = Number(input[1]); // 연결할 수 있는 선의 수

let network = Array.from(Array(N + 1), () => Array(N + 1).fill(null)) // 네트워크
for (let index = 2; index < input.length; index++) {
    const tmp = input[index].toString().trim().split(' ');
    const a =  Number(tmp[0]);
    const b =  Number(tmp[1]);
    const c =  Number(tmp[2]);

    network[a][b] = c;
    network[b][a] = c;
}

const stack = [];
const line = [];

stack.push(1); // start
for (let index = 1; index <= N; index++) {
    if (network[1][index] !== null) {
        line.push([index, network[1][index]]);
    }
}
line.sort((a, b) => {return a[1] - b[1]});

while (stack.length < N) {

    if (stack.find((element) => {return element === line[0][0]}) === undefined) {
        var next = line[0][0];
        output += line[0][1];

        line.shift();
        stack.push(next);

        for (let index = 1; index <= N; index++) {
            if (network[next][index] !== null) {
                line.push([index, network[next][index]]);
            }
        }
        line.sort((a, b) => {return a[1] - b[1]});

    }
    else {
        line.shift();
    }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ
