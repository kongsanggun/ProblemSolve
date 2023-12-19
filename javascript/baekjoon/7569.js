//  백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// BFS 이용 구현은 큐를 활용
// 큐 같은 경우 배열이 아닌 링크드를 활용해야 한다.

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    enqueue(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
          } else {
            this.tail.next = newNode;
            this.tail = newNode;
          }
      
          this.size++;
    }

    dequeue() {
        if (!this.head) {
            return;
        }
        
        const removeNode = this.head;
        this.head = this.head.next;
        if (!this.head) {
          this.tail = null;
        }
    
        this.size--;
    
        return removeNode.data;
    }

    isEmpty() {
        return this.size === 0;
    }
}

let input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
let output = 0;

const inputLine = input[0].split(' ');

let M = Number(inputLine[0]); // 가로
let N = Number(inputLine[1]); // 세로
let H = Number(inputLine[2]); // 높이

let queue = new Queue(); // 순회용 큐

let tomato = [];
let remain = 0;

// 1. 배열 저장
for (let h  = 0; h < H; h++) {
    tomato[h] = [];
    for (let n = 0; n < N; n++) {
        const index = h * N + n + 1;
        const tomatoLine = input[index].split(' ');

        tomato[h][n] = [];
        for (let m = 0; m < M; m++) {
            const status = Number(tomatoLine[m]);

            if (status === 0) {
               remain = remain + 1; 
            } else if (status === 1) {
                const queueInput = [0, [h, n, m]];
                queue.enqueue(queueInput);
            }

            tomato[h][n][m] = status;
        }
    }
}

// 2. 큐를 이용한 BFS 구하기

const moveM = [1, -1, 0, 0, 0, 0]; // 가로
const moveN = [0, 0, 1, -1, 0, 0]; // 세로
const moveH = [0, 0, 0, 0, 1, -1]; // 높이

while (!queue.isEmpty()) {
    const node = queue.dequeue();

    if ( remain > 0 ) {
        for (let index = 0; index < 6; index++) {
            const nextM = node[1][2] + moveM[index];
            const nextN = node[1][1] + moveN[index];
            const nextH = node[1][0] + moveH[index];
    
            if (nextM < 0 || nextM >= M) {
                continue;
            }
    
            if (nextN < 0 || nextN >= N) {
                continue;
            }
    
            if (nextH < 0 || nextH >= H) {
                continue;
            }
    
            const next = tomato[nextH][nextN][nextM];
            if (next === 0) {
                tomato[nextH][nextN][nextM] = 1;
                remain = remain - 1;
    
                const queueInput = [node[0] + 1, [nextH, nextN, nextM]];
                queue.enqueue(queueInput);
            }
        }
    }

    output = node[0];
}

// 3. 전부 익는지 판단하기
output = (remain > 0) ? -1 : output; 

console.log(output);