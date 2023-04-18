// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

let input = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
let N = Number(input[0]);
let array_tmp = input[1].split(' ');

let result = 0;
let array = [];

for (let index in array_tmp) {
    array[index] = Number(array_tmp[index]);
}

array.sort((a, b) => {return a - b;});
//console.log(array);

for (let x = 0; x < N - 2; x++) {
    let start = x + 1;
    let end = N - 1;

    while (start < end) {
        const sum = array[start] + array[end] + array[x];
        if (sum === 0) 
        {
            let l = 1, r = 1;
            if (array[start] === array[end]) {
                let n = end - start + 1;
                result += (n * (n - 1)) / 2;
                break;
             }
             while (start + 1 < end && array[start] == array[start + 1]) {
                  l++;
                  start++;
             }
             while (start < end - 1 && array[end] == array[end - 1]) {
                  r++;
                  end--;           
             }
             result += l * r;
        }
        
        if (sum < 0) { start++; }
        else { end--; }
    }
}

console.log(result);



