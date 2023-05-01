// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
const N = Number(input[0]);
const timequery = [[]]; // 타임라인 쿼리
const output = []; // 결과 출력용 

function deepCopy(object) {
    if (object === null || typeof object !== "object") {
        return object;
      }
      // 객체인지 배열인지 판단
      const copy = Array.isArray(object) ? [] : {};
     
      for (let key of Object.keys(object)) {
        copy[key] = deepCopy(object[key]);
      }
     
      return copy;
} // 깊은 복사 (이 문제의 핵심이다.)

for (let i = 1; i <= N; i++) {
    const time = input[i].split(' ');

    if (time[0] === 'a') {
        const k = Number(time[1]);
        const now = deepCopy(timequery[i - 1]);
        
        now.push(k);
        timequery.push(now);
        output.push(k);
    } // 문제 번호가 K인 문제를 풀고 문제 목록에 기록 한다.
    else if (time[0] === 's') {
        const now = deepCopy(timequery[i - 1]);

        now.pop();
        timequery.push(now);
        now.length === 0 ? (output.push(-1)) : (output.push(now[now.length - 1]));
    } // 가장 최근에 작성한 문제 목록을 삭제한다.
    else if (time[0] === 't') {
        const k = Number(time[1]) - 1;
        const now = deepCopy(timequery[k]);

        timequery.push(now); 
        now.length === 0 ? (output.push(-1)) : (output.push(now[now.length - 1]));
    } // K번째 쿼리 직전까지 시간을 거슬러 올러간다.
}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ

