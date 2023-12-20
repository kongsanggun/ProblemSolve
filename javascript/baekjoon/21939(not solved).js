// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 우선순위 큐를 활용한다.
class problem {
    constructor (p, l) {
        this.problem = p;
        this.level = l;
        this.maxHipIndex = 0;
        this.minHipIndex = 0;
    }
}

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
const output = [];

const n = Number(input[0]);
const m = Number(input[n + 1]);

const problemList = Array.from({length : 100001}, []); // 문제 정보 리스트
const maxHip = [null]; // 최대 힙
const minHip = [null]; // 최소 힙

const addMaxHip = (newProblem) => {
    const index = maxHip.length;
    maxHip.push(newProblem);

    while ( index > 1 ) {
        const compare = maxHip[Math.round(index / 2)];

        const indA = compare.level < newProblem.level;
        const indB = compare.level === newProblem.level && compare.problem < newProblem.problem;

        if (!(indA) && !(indB)) {
            return index;
        }

        const tmp = maxHip[Math.round(index / 2)];
        maxHip[Math.round(index / 2)] = maxHip[index];
        maxHip[index] = tmp;

        index = Math.round(index / 2);
    }

    return index;
};

const addMinHip = (newProblem) => {
    const index = minHip.length;
    minHip.push(newProblem);

    while( index > 1 ) {
        const compare = maxHip[Math.round(index / 2)];

        const indA = compare.level > newProblem.level;
        const indB = compare.level === newProblem.level && compare.problem > newProblem.problem;

        if (!(indA) && !(indB)) {
            return index;
        }

        const tmp = maxHip[Math.round(index / 2)];
        maxHip[Math.round(index / 2)] = maxHip[index];
        maxHip[index] = tmp;

        index = Math.round(index / 2);
    }

    return index;
};

const removeMaxHip = (index) => {

};

const removeMinHip = (index) => {

};

const addProblem = (p, l) => {
    let newProblem = new problem(p, l);

    addMaxHip(newProblem);
    addMinHip(newProblem);

    problemList.push(newProblem);
};

const removeProblem = (p) => {
    const problems = problemList[p];
    
    for (let item of problems) {
        removeMaxHip(item[0]);
        removeMinHip(item[1]);
    }

    problemList[p] = [];
}

// 1. 초기 문제 추가 
for (let idx = 1; idx <= N; idx++) {
    const inputLine = input[idx].split(' ');

    const p = Number(inputLine[0]);
    const l = Number(inputLine[1]);

    addProblem(p, l);
}

// 2. 명령어에 따라서 문제 실행
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