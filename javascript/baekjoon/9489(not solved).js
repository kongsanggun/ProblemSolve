// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    9489번 : 사촌 [트리]
    사촌의 수를 구하는 프로그램
    사촌 : 두 노드의 부모는 다르지만, 두 부모가 형제(sibling)일 때 두 노드
*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
let output = ''; // 출력

const solution = (num) => {
    let result = 0; // 사촌의 수

    const K = Number(input[num * 2].trim().split(' ')[1]); // Target
    const numberList = input[num * 2 + 1].trim().split(' ').map((element) => {return Number(element)}); // 수열

    let sibling = []; // 형제 노드 표시
    let parent = [-1]; // 부모
    let child = []; // 자식
    
    child[0] = [numberList[0]];
    parent[numberList[0]] = [0];
    
    for (let i = 1; i < numberList.length; i++) {
        const top = sibling.length - 1;
        if (top >= 0 && sibling[top][sibling[top].length - 1] + 1 === numberList[i]) {
            sibling[top].push(numberList[i]);
        } else {
            sibling.push([numberList[i]]);
        }
    } // 형제 노드 기록
    
    for (let i = 0; i < sibling.length; i++) {
        child[numberList[i]] = sibling[i];
        sibling[i].forEach((element) => {
            parent[element] = numberList[i];
        })
    } // 자식 노드 및 부모노드 기록
    
    const par = parent[K] // Target의 부모
    const list = child[parent[par]];
    
    for (let i = 0; i < list.length; i++) {
        if (list[i] != par) {
            result += child[list[i]].length;
        }
    } 

    return result;
}

for (let testCase = 0; testCase < (input.length - 1) / 2; testCase++) {
    output += solution(testCase);
    if (testCase + 1 < (input.length - 1) / 2) {
        output += '\n';
    }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ