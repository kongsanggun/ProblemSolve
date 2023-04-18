// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
const first_array = input[0].split(' ');
const array = [];
let result = 0; // 먹을 수 있는 초밥의 종류 최댓값

const N = Number(first_array[0]); // 접시의 수
const d = Number(first_array[1]); // 초밥의 가짓 수 
const k = Number(first_array[2]); // 연속해서 먹은 접시 수 
const c = Number(first_array[3]); // 쿠폰 번호

for (let index = 1; index < input.length; index++) {
    array[index - 1] = (Number(input[index]));
}

const sushi = [];
let sushi_count = 0; // 현재 초밥 종류

for (let x = 0; x < k; x++) {
    if (sushi[array[x]]) {
        sushi[array[x]]++;
    }
    else {
        sushi[array[x]] = 1;
        sushi_count++;
    }
}

result = sushi_count;

let start = 0;
let end = k - 1;

for (let x = 0; x < N; x++) {

    if (sushi[array[start]] === 1) {
        sushi_count--;
    }
    sushi[array[start]]--;

    start = (start + 1) % N;
    end = (end + 1) % N ;

    if (sushi[array[end]]) {
        sushi[array[end]]++;
    }
    else {
        sushi[array[end]] = 1;
        sushi_count++;
    }

    result = Math.max(result, sushi_count + !sushi[c]);
}

console.log(result);



