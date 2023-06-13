// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
    3079번 : 입국심사 [ 이분 탐색 ]

    이분 탐색 문제임 ㄷㄷ
    lower_bound 혹은 upper_bound을 이용하여 최솟 값을 구하는 것이 포인트
    초기 값은 0 에서 M * min(T);
    TF 조건은 어떻게 구현해야하나??? 
*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
let output; // 출력 값

const N = (input[0].split(' ')[0]); // 입국 심사대 수
const M = BigInt(input[0].split(' ')[1]); // 친구들 수
const T = []; // 걸리는 시간

const isTure = (time) => {
    let cnt = 0n;

    for (let i = 0; i < T.length; i++) {
        cnt += time/BigInt(T[i]);
        if (cnt > M)
            break;
    }

    if (cnt >= M) {
        return true;
    }
    else return false;

} // 해당 시간 내에 모든 사람이 입국 심사대에 통과할 수 있느냐??

for (let i = 1; i <= N; i++) {
    T.push(input[i]);
}

let low = BigInt(Math.min(...T));
let high = BigInt(Math.max(...T) * Number(M));

while (low <= high) {
    let mid = (low + high) / 2n;

    if (isTure(mid)) {
        output = mid;
        high = mid - 1n;
    }
    else {
        low = mid + 1n;
    }
}

console.log(output.toString()); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ