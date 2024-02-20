// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1956번
// 운동

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = -1;
const V = Number(input[0][0]);
let costs = Array.from(Array(V), () => Array(V).fill(987654321));

for(let index = 1; index < input.length; index++) {
    const nodeInput = input[index].split(' ');
    const a = Number(nodeInput[0]) - 1;
    const b = Number(nodeInput[1]) - 1;
    const cost = Number(nodeInput[2]);

    costs[a][b] = cost;
}

for(let i = 0; i < V; i++) {
    for(let j = 0; j < V; j++) {
        for(let k = 0; k < V; k++) {
            if(costs[i][j] > costs[i][k] + costs[k][j]) {
                costs[i][j] = costs[i][k] + costs[k][j];
            }
        }
    }
}

for(let i = 0; i < V; i++) {
    if(costs[i][i] !== 987654321) {
        if(output === -1) {
            output = costs[i][i];
        } else {
            output = Math.min(costs[i][i], output);
        }
    }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ