//  백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    9489번 : 사촌 [트리]
    사촌의 수를 구하는 프로그램
    사촌 : 두 노드의 부모는 다르지만, 두 부모가 형제(sibling)일 때 두 노드
*/

let input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
let output = ''; // 출력

// 트리 노드
class node {
    constructor(name, parent, index) {
        this.parent = parent;
        this.name = name;
        this.index = index;
        this.child = [];
    }
}

// 트리 내 사촌 갯수 찾는 함수
const solution = (numList, n, k) => {

    // 사촌의 수
    let result = 0; 

    // 입력 된 수열
    const numberList = numList.trim().split(' ').map((element) => {return Number(element)});

    // 2-1. 트리 생성하기
    let tree = [];
    let parentIndex = 0;

    tree.push(new node( numberList[0], null, 0));

    for (let i = 1; i < numberList.length; i++) {
        let newNode = new node( numberList[i], tree[parentIndex], tree.length);

        tree.push(newNode);
        tree[parentIndex].child.push(newNode);

        if (i + 1 < numberList.length) {
            if (numberList[i + 1] !== numberList[i] + 1) {
                parentIndex = parentIndex + 1;
            }
        }
    }

    // 2-2. 친척의 수 구하기
    const targetIndex = tree.findIndex((value, index) => {
        return value.name === k;
    })
    const targetParent = tree[targetIndex].parent;

    if (targetParent === null) {
        return 0;
    } else if (tree[targetIndex].parent.parent === null) {
        return 0;
    }

    const grandparentIndex = tree[targetIndex].parent.parent.index;

    for (let child of tree[grandparentIndex].child) {
        if (child.name !== targetParent.name) {
            result = result + child.child.length;
        }
    }

    return result;
}

let lineIndex = 0;
let firstLine = input[lineIndex].split(' ');

let n = Number(firstLine[0]);
let k = Number(firstLine[1]);

// 1. 각 테스트 케이스마다 결과물을 추가
while (n !== 0 || k !== 0) {
    output += solution(input[lineIndex + 1], n, k);

    lineIndex = lineIndex + 2
    let line = input[lineIndex].split(' ');

    n = Number(line[0]);
    k = Number(line[1]);

    if (n !== 0 || k !== 0) {
        output += '\n';
    }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ