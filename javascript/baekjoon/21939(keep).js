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
let output = [];

const n = Number(input[0]);
const m = Number(input[n + 1]);

const problemList = Array.from({length : 100001}, () => []); // 문제 정보 리스트
const maxHip = [null]; // 최대 힙
const minHip = [null]; // 최소 힙

const addMaxHip = (newProblem) => {
    let index = maxHip.length;
    maxHip.push(newProblem);

    while ( index > 1 ) {
        const compareIndex = Math.round(index / 2);
        const compare = maxHip[compareIndex];
        
        const indA = compare.level > newProblem.level;
        const indB = compare.level === newProblem.level && compare.problem > newProblem.problem;

        if (!(indA) && !(indB)) {
            return;
        }

        // swap
        const tmp = maxHip[compareIndex];

        maxHip[compareIndex] = maxHip[index];
        maxHip[index] = tmp;

        maxHip[compareIndex].maxHipIndex = index;
        maxHip[index].maxHipIndex = compareIndex;

        index = compareIndex;
    }

    return;
};

const addMinHip = (newProblem) => {
    let index = minHip.length;
    minHip.push(newProblem);

    while ( index > 1 ) {
        const compareIndex = Math.round(index / 2);
        const compare = minHip[compareIndex];
        
        const indA = compare.level < newProblem.level;
        const indB = compare.level === newProblem.level && compare.problem < newProblem.problem;

        if (!(indA) && !(indB)) {
            return;
        }

        // swap
        const tmp = minHip[compareIndex];

        minHip[compareIndex] = minHip[index];
        minHip[index] = tmp;

        minHip[compareIndex].minHipIndex = index;
        minHip[index].minHipIndex = compareIndex;

        index = compareIndex;
    }

    return;
};

const removeMaxHip = (index) => {
    // swap
    const last = maxHip.length - 1;
    const tmp = maxHip[last];

    maxHip[last] = maxHip[index];
    maxHip[index] = tmp;
    
    if (index !== 1 || maxHip.length === 1) {
        maxHip[index].maxHipIndex = index;
        maxHip.pop();
        return ;
    }
    maxHip.pop();

    const newIndex = 1;

    while ( newIndex < maxHip.length() ) {
        let left = newIndex * 2;
        let right = newIndex * 2 + 1;
        let compare;

        let indA = maxHip[left].level > maxHip[right].level;
        let indB = maxHip[left].level === maxHip[right].level && maxHip[left].problem > maxHip[right].problem;

        if (!(indA) && !(indB)) {
            compare = right;
        } else {
            compare = left;
        }

        indA = maxHip[compare].level > maxHip[newIndex].level;
        indB = maxHip[compare].level === maxHip[newIndex].level && maxHip[compare].problem > maxHip[newIndex].problem;

        if (!(indA) && !(indB)) {
            return;
        }

        // swap
        const tmp = maxHip[compareIndex];

        maxHip[compare] = maxHip[newIndex];
        maxHip[newIndex] = tmp;

        maxHip[compare].maxHipIndex = newIndex;
        maxHip[newIndex].maxHipIndex = compare;

        newIndex = compare;
    }

    return ;
};

const removeMinHip = (index) => {
    // swap
    const last = minHip.length - 1;
    const tmp = minHip[last];

    minHip[last] = minHip[index];
    minHip[index] = tmp;
    
    if (index !== 1 || minHip.length === 1) {
        minHip[index].minHipIndex = index;
        minHip.pop();
        return ;
    }
    minHip.pop();

    const newIndex = 1;

    while ( newIndex < minHip.length() ) {
        let left = newIndex * 2;
        let right = newIndex * 2 + 1;
        let compare;

        let indA = minHip[left].level < minHip[right].level;
        let indB = minHip[left].level === minHip[right].level && minHip[left].problem < minHip[right].problem;

        if (!(indA) && !(indB)) {
            compare = right;
        } else {
            compare = left;
        }

        indA = minHip[compare].level < minHip[newIndex].level;
        indB = minHip[compare].level === minHip[newIndex].level && minHip[compare].problem < minHip[newIndex].problem;

        if (!(indA) && !(indB)) {
            return;
        }

        // swap
        const tmp = minHip[compareIndex];

        minHip[compare] = minHip[newIndex];
        minHip[newIndex] = tmp;

        minHip[compare].minHipIndex = newIndex;
        minHip[newIndex].minHipIndex = compare;

        newIndex = compare;
    }

    return ;

};

const addProblem = (p, l) => {
    let newProblem = new problem(p, l);

    addMaxHip(newProblem);
    addMinHip(newProblem);

    problemList.push(newProblem);
};

const removeProblem = (p) => {
    const problems = problemList[p];
    
    for (let problem of problems) {
        removeMaxHip(problem.maxHipIndex);
        removeMinHip(problem.minHipIndex);
    }

    problemList[p] = [];
}

// 1. 초기 문제 추가 
for (let idx = 1; idx <= n; idx++) {
    const inputLine = input[idx].split(' ');

    const p = Number(inputLine[0]);
    const l = Number(inputLine[1]);

    addProblem(p, l);
}

// 2. 명령어에 따라서 문제 실행
for (let idx = 1; idx <= m; idx++) {
    const inputLine = input[idx + n + 1].split(' ');

    switch(inputLine[0]) {
        case 'recommend':
            if (Number(inputLine[1]) === -1) {
                output.push(minHip[1].problem);
            } else {
                output.push(maxHip[1].problem);
            }
            break;
        case 'add':
            addProblem(Number(inputLine[1]), Number(inputLine[2]));
            break;
        case 'solved':
            removeProblem(Number(inputLine[1]));
            console.log(minHip);
            console.log(maxHip);
            break;
        default :
            break;
    }
}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ