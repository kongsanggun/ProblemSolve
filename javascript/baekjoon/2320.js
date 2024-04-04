// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 2320번
// 끝말잇기

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = 0;

const n = Number(input[0]);
let word = [];
let count = Array.from(Array(1 << n).fill(0));
let dp = Array.from(Array(n), () => Array.from(Array(5), () => Array.from(Array(1 << n).fill(false))));

const lastWord = {
  'A' : 0,
  'E' : 1,
  'I' : 2,
  'O' : 3,
  'U' : 4
}

const countLength = (bitmask) => {
  let result = 0;
  let tmp = ''
  for(let i = 0; i < n; i++) {
    if( (bitmask & (1 << i)) == (1 << i) ) {
      result = result + word[i].length;
      tmp += word[i]
    }
  }
  return result
}

for(let i = 1; i <= n; i++) {
  word.push(input[i]);
}

for(let bitmask = 1; bitmask < (1 << n); bitmask++) {
  count[bitmask] = countLength(bitmask);
}

for(let i = 0; i < n; i++) {
  const last = word[i][word[i].length - 1]
  dp[0][lastWord[last]][(1 << i)] = true
  output = Math.max(output, count[(1 << i)])
}

for(let i = 0; i < n; i++) {
  for(let end = 0; end < 5; end++) {
    for(let bit = 0; bit < (1 << n); bit++) {
      if(dp[i][end][bit]) {
        for(let next = 0; next < n; next++) {
          const nextWord = word[next][0]
          if((bit & (1 << next)) !== (1 << next) && end === lastWord[nextWord]) {
            const last = word[next][word[next].length - 1]
            dp[i + 1][lastWord[last]][bit | (1 << next)] = true;
            output = Math.max(output, count[bit | (1 << next)])
          }
        }
      }
    }
  }
}

console.log(output);