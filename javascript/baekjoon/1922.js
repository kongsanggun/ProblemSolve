// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    1922번 [최소 스패닝 트리] : 네트워크 연결
*/

let input = require('fs').readFileSync('input.txt',"utf8").toString().trim().split('\n'); // 테스트
let output = 0;

let N; // 컴퓨터의 수
let M; // 연결할 수 있는 선의 수

const network = []; // 네트워크
let count = 0; // 연결 갯수

input.forEach((value, index) => {
    if (index === 0) {
        N = Number(value);
    }
    if (index === 1) {
        M = Number(value);
    }
    if (index > 1) {
        const tmp = value.trim().split(' ').map((value) => {return Number(value)});
        network.push(tmp);
    }
})

const group = new Array(N).fill(null); // 그룹
network.sort((a, b) => {return a[2] - b[2]});

while (count < N - 1) {
    const shortNetwork = network.shift();
    
    if (shortNetwork[0] - 1 !== shortNetwork[1] - 1) {
        if (group[shortNetwork[0] - 1] === group[shortNetwork[1] - 1] && group[shortNetwork[0] - 1] === null) {
            output = output + shortNetwork[2];
            group[shortNetwork[0] - 1] = count;
            group[shortNetwork[1] - 1] = count;
            count = count + 1;
        }
        else if (group[shortNetwork[0] - 1] !== group[shortNetwork[1] - 1]) {
            output = output + shortNetwork[2];
            if (group[shortNetwork[0] - 1] === null) {
                group[shortNetwork[0] - 1] = group[shortNetwork[1] - 1];
            }
            else if(group[shortNetwork[1] - 1] === null) {
                group[shortNetwork[1] - 1] = group[shortNetwork[0] - 1];
            }
            else {
                const from = group[shortNetwork[0] - 1];
                for (let index = 0; index < N; index++) {
                    if (group[index] === from) {
                        group[index] = group[shortNetwork[1] - 1];
                    }
                }
            }
            count = count + 1;
        }
    }
    
}


console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ
