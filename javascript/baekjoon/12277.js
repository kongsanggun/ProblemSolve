// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 12277번 : Read Phone Number (Large)

let input = require('fs').readFileSync("input.txt").toString().split('\n')
let output = [];

const callNumber = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const callRules = ["", "", "double", "triple", "quadruple", "quintuple", "sextuple", "septuple", "octuple", "nonuple", "decuple"];

const T = Number(input[0]);
for(let i = 1; i <= T; i++) {
  let result = "Case #" + i + ":";
  let count = [];
  let sliceStart = 0;

  let [N, F] = input[i].split(' ');
  F = F.split('-');

  for(let format of F) {
    count.push(N.slice(sliceStart, sliceStart + Number(format)));
    sliceStart += Number(format)
  }

  for(let item of count) {
    let separate = 1;

    for(let index in item)
    if(item.length > Number(index) + 1 && item[index] === item[Number(index) + 1]) {
      separate += 1;
    }
    else {
      if(separate > 1 && separate <= 10) {
        result += " " + callRules[separate];
      } else if(separate > 10) {
        for(let s = 1; s < separate; s++) {
          result += " " + callNumber[item[index]];
        }
      }
      result += " " + callNumber[item[index]];
      separate = 1;
    }
  }

  output.push(result);
}

console.log(output.join('\n')); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ