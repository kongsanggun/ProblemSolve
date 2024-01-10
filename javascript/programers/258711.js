// 2024 KAKAO WINTER INTERNSHIP
// 도넛과 막대 그래프 (lv.2)

// node 클래스
class node {
    constructor() {
        this.fromList = []; // 받는 인덱스 리스트
        this.toList = []; // 나오는 인덱스 리스트
    }    
}

function solution(edges) {
    var answer = [0, 0, 0, 0]; // 생성한 정점의 번호, 도넛 모양 그래프의 수, 막대 모양 그래프의 수, 8자 모양 그래프의 수
    let graph = []; // 그래프 상태
    let visited = []; // 방문 상태 확인
    let queue = []; // 탐색을 위한 큐 (메모리로 인한 컴파일 에러 방지)

    // node 클래스 초기화
    const checkNode = (index) => {
        if(graph[index] === null || graph[index] === undefined) {
            graph[index] = new node();
        }
    }

    // 방문 여부 확인
    const checkVisited = (index) => {
        if(visited[index] === null || visited[index] === undefined) {
            return false;
        }
        return true;
    }

    // 탐색
    const searchGraph = (start) => {
        let size = 0; // 정점
        let line = 0; // 간선

        queue = [];
        queue.push(start);
        visited[start] = true;

        while(queue.length > 0) {
            const top = queue.pop();
            size++;

            for (let edge of graph[top].toList) {
                if(!(checkVisited(edge))) {
                    queue.push(edge);
                    visited[edge] = true;
                }
                line++;
            }
        }

        return {size : size, line : line}
    }

    // 1. 그래프 작성하기
    for(let edge of edges) {
       const from = Number(edge[0]);
       const to = Number(edge[1]);

       checkNode(from);
       checkNode(to);

       graph[from].toList.push(to);
       graph[to].fromList.push(from);
    }

    // 2. 루트 노드 구하기 
    for(let index = 1; index <= graph.length - 1; index++) {
        const item = graph[index];
        const toListLen = item.toList.length;
        const fromListLen = item.fromList.length;

        if(toListLen > 1 && fromListLen === 0) {
            answer[0] = index;
            break;
        }
    }

    // 3. 그래프 탐색 전 루트 노드 제거 
    for(let list of graph[answer[0]].toList) {
        graph[list].fromList = graph[list].fromList.filter((item) => item !== answer[0]);
    }

    // 4. 막대 모양 그래프 갯수 구하기
    for(let index = 1; index <= graph.length - 1; index++) {
        if(graph[index].fromList.length > 0) {
            continue;
        }

        if(index === answer[0] || checkVisited(index)) {
            continue;
        }

        searchGraph(index);
        answer[2]++;
    }

    // 5. 나머지 그래프 갯수 구하기
    for(let index = 1; index <= graph.length - 1; index++) {
        if (index === answer[0] || checkVisited(index)) {
            continue;
        }

        const searchResult = searchGraph(index);
        if(searchResult.size + 1 === searchResult.line) {
            answer[3]++;
        } else {
            answer[1]++;
        }
    }

    return answer;
}

console.log(solution([[2, 3], [4, 3], [1, 1], [2, 1]]));
console.log(solution([[4, 11], [1, 12], [8, 3], [12, 7], [4, 2], [7, 11], [4, 8], [9, 6], [10, 11], [6, 10], [3, 5], [11, 1], [5, 3], [11, 9], [3, 8]]));