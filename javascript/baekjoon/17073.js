// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    17073번 : 나무 위의 빗물 [트리]
    물의 양의 기댓값의 평균 구하기
*/

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
let output = 0;

const N = Number(input[0].split(' ')[0]); // 노드의 수
const W = Number(input[0].split(' ')[1]); // 고인물의 양

let tree = []; // 트리형 노드 표시

let count = 0;

for (let i = 1; i < input.length; i++) {
    const U = Number(input[i].split(' ')[0]);
    const V = Number(input[i].split(' ')[1]);

    if (tree[U] === undefined) {
        tree[U] = [];
    }
    tree[U].push(V);

    if (tree[V] === undefined) {
        tree[V] = [];
    }
    tree[V].push(U); 
} 
// tree를 생성한다.

for (let i = 2; i <= N; i++) {
    if (tree[i].length === 1) {
        count++;
    }
} // 어차피 Root인 1번 노드를 제외한 맨 자식 노드는 간선 하나 밖에 없음

console.log(W / count); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ
