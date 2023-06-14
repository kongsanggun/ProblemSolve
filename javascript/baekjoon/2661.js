// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 

    2661번 : 좋은 수열 [벡트레킹] 
    길이가 N인 좋은 수열들을 N자리의 정수로 보아 그중 가장 작은 수를 나타내는 수열을 구하는 프로그램을 작성
    
    단, 수열은 숫자 1,2,3으로만 이루어져있다.
    좋은 수열은 인접한 두 개의 부분 수열이 동일한 것이 없는 수열이다.

*/

let input = require('fs').readFileSync('input.txt',"utf8").trim().split('\n'); // 테스트
let output = '';

const N = Number(input[0]);

const isGood = (sequence) => {
    for (let i = 0; i < sequence.length - 1; i++) {
        let mid = Math.floor((i + sequence.length + 1) / 2);
        if (sequence.substring(i, mid) === sequence.substring(mid))
        return false;
    }

    return true;
}

const find = (sequence) => {
    if (output !== ''){
        return;
    }
    else if(isGood(sequence)) {
        if (sequence.length === N) {
            output = sequence;
            return;
        }
        find(sequence + '1')
        find(sequence + '2')
        find(sequence + '3')
    }
}

find('')

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ