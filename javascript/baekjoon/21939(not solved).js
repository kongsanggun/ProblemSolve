// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
const output = [];

const N = Number(input[0]);
const M = Number(input[N + 1]);

let problem = [];

for (let idx = 1; idx <= N; idx++) {
    const inputLine = input[idx].split(' '); 
    const pro = {
        num : Number(inputLine[0]),
        level : Number(inputLine[1]),
    }

    problem.push(pro);
}

for (let idx = 1; idx <= M; idx++) {
    const inputLine = input[idx + N + 1].split(' '); 

    if (inputLine[0] === 'recommend' && Number(inputLine[1]) === -1) {
        output.push(problem[0].num);
    } // 가장 쉬운 문제, 중복 시 문제번호가 작은 문제를 추천한다. 
    else if (inputLine[0] === 'recommend' && Number(inputLine[1]) === 1) {
        output.push(problem[problem.length - 1].num);
    } // 가장 쉬운 문제, 중복 시 문제번호가 작은 문제를 추천한다. 
    else if (inputLine[0] === 'add') {
        const pro = {
            num : Number(inputLine[1]),
            level : Number(inputLine[2]),
        }

        problem.push(pro);
    } // 문제 추가
    else if (inputLine[0] === 'solved') {
        problem = problem.filter((element) => element.num !== Number(inputLine[1]));
    } // 문제 삭제
}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ