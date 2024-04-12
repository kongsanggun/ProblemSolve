// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 6594번
// 방정식 풀이

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];

const cal = (Expression) => {
  const result = [0, 0]
  const stack = [[0, 0, '+']]

  for(let char of Expression) {
    const top = stack.length - 1
    if(char === '(') {

    }
    else if(char === '+' || char === '-') {
      stack.push([0, 0, char])
    }
    else if (char === '*') {

    } else if (char === 'x') {
      
    } else {

    }
    
  }


  return result
}

for(let i = 0 ; i < input.length; i++) {
  output.push("Equation #" + (i + 1));

  const calInput = input[i].split('=');
  const calResult = [[0, 0], [0, 0]] // [x의 계수, 상수] = [x의 계수, 상수]

  calResult[0] = cal(calInput[0]);
  calResult[1] = cal(calInput[1]);

  const resultX = calResult[0][0] - calResult[1][0]
  const result = calResult[0][1] - calResult[1][1]

  if(resultX === 0 && result === 0) {
    output.push("Infinitely many solutions.");
  } else if(resultX === 0) {
    output.push("No solution.");
  } else {
    output.push("x = " + (result / resultX).toFixed(6))
  }

  if(i < input.length - 1) {
    output.push('')
  }
}

console.log(output.join('\n'));