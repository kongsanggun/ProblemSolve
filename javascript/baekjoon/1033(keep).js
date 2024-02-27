// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1033번
// 칵테일

let input = require('fs').readFileSync('input.txt').toString().split('\n');
let output = "";

class Node {
	constructor() {
		this.value = [1n, 1n];
		this.edge = [];
	}
}

const N = Number(input[0]);
const graph = [];

const findGCD = (p, q) => {
	const max = p > q ? p : q;
	const min = p < q ? p : q;
	let divParam = [max, min];
	let mod = divParam[0] % divParam[1];
	
	while(mod !== 0n) {
		divParam[0] = divParam[1];
		divParam[1] = mod;
		mod = divParam[0] % divParam[1];
	}
	
	return divParam[1];
}

const BFS = (n) => {
	const stack = [0];
	const visited = Array(n).fill(true);
	visited[0] = false;
	
	while(stack.length > 0) {
		const top = stack.shift();
		for(let edge of graph[top].edge) {
			const next = edge[0];
			if(visited[next]) {
				visited[next] = false;
				stack.push(next);
				graph[next].value[0] = graph[top].value[0] * edge[1][0];
				graph[next].value[1] = graph[top].value[1] * edge[1][1];
			}
		}
	}
}

for(let index = 1; index < N; index++) {
	const inputLine = input[index].split(' ');
	
	// 유클리드 호제법을 이용한다.
	const a = Number(inputLine[0]);
	const b = Number(inputLine[1]);
	const p = BigInt(inputLine[2]);
	const q = BigInt(inputLine[3]);
	const gcd = findGCD(p, q); // 최대공약수
	
	if(graph[a] === null || graph[a] === undefined) {
		graph[a] = new Node();
	}
	
	if(graph[b] === null || graph[b] === undefined) {
		graph[b]= new Node();
	}
	
	graph[a].edge.push( [b, [q / gcd, p / gcd]] );
	graph[b].edge.push( [a, [p / gcd, q / gcd]] );
	
}

// 순회하면서 값 바꾸기
BFS(N);

// 최소공배수 구하기
let lcm = 1n;

for(let node of graph){
	const gcd = findGCD(node.value[1], lcm); // 최대공약수
	lcm = lcm * node.value[1] / gcd;
}

// 출력
const result = [];
for(let node of graph){
	result.push(node.value[0] * lcm / node.value[1]);
}

for(let index in result) {
	output += result[index].toString();
	if(index < result.length - 1) {
		output += ' ';
	}
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ