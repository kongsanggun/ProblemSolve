// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

/* 
2493번 탑 [자료구조]
*/

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
let output = '';

const input2 = input[1].split(' ');
const tower = [];
const stack = []; // 스택

input2.forEach((element) => {
    tower.push(Number(element))
}); // 타워

tower.forEach((element, index) => {
    if (stack.length === 0) {
        output += '0';
    } 
    else {
        let top = stack[stack.length - 1];
        while (stack.length !== 0 && element > tower[top]) {
            top = stack.pop();
        }
        
        if (stack.length === 0) {
            output += '0';
        } 
        else {
            output += top + 1;
            stack.push(top);
        }
    }

    stack.push(index);
    if (index !== tower.length - 1) {
        output += ' ';
    }
}); 

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ

