// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 1006번
// 습격자 초라기

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = "";

let emenyList = [];
let dp = []; // 둘 다 채운 경우
let upDp = []; // 위에만 채운 경우
let downDp = []; // 아래에만 채운 경우

const t = Number(input[0]); // 테스트케이스

const initDp = (n) => {
  dp = Array.from(Array(n).fill(0));
  upDp = Array.from(Array(n).fill(0));
  downDp = Array.from(Array(n).fill(0));
};

const setDp = (i, n, w) => {
  const isPossableUp = (emenyList[i] + emenyList[i + n]) <= w;
  const isPossableRight = (emenyList[i - 1] + emenyList[i]) <= w;
  const isPossableRightSecend = (emenyList[i + n - 1] + emenyList[i + n]) <= w;

  const up = isPossableUp ? 1 : 2;
  const right = isPossableRight ? 1 : 2;
  const rightSecend = isPossableRightSecend ? 1 : 2;

  upDp[i] = Math.min(dp[i - 1] + 1, downDp[i - 1] + right);
  downDp[i] = Math.min(dp[i - 1] + 1, upDp[i - 1] + rightSecend);
  dp[i] = Math.min(
    dp[i - 1] + up,
    dp[i - 2] + right + rightSecend,
    upDp[i] + 1,
    downDp[i] + 1
  );
};

const solution = (n, w) => {
  let result = 2 * n + 1;

  initDp(n);

  upDp[1] = 1;
  downDp[1] = 1;
  dp[1] = emenyList[1] + emenyList[n + 1] <= w ? 1 : 2;

  for (let i = 2; i <= n; i++) {
    setDp(i, n, w);
  }

  result = Math.min(result, dp[n]);

  if (n > 1) {
    const isPossableRight = emenyList[0] + emenyList[n - 1] <= w;
    const isPossableRightSecend = emenyList[n] + emenyList[2 * n - 1] <= w;

    const upFirst = emenyList[0];
    const downFirst = emenyList[n];

    if (isPossableRight) {
      emenyList[0] = upFirst;
      emenyList[n] = downFirst;

      initDp(n);

      upDp[1] = 1;
      downDp[1] = 1;
      dp[1] = 2;

      emenyList[0] = n * 2 + 1;

      for (let i = 2; i <= n; i++) {
        setDp(i, n, w);
      }

      result = Math.min(result, upDp[n]);
    }

    if (isPossableRightSecend) {
      emenyList[0] = upFirst;
      emenyList[n] = downFirst;

      initDp(n);

      upDp[1] = 1;
      downDp[1] = 1;
      dp[1] = 2;

      emenyList[n] = n * 2 + 1;

      for (let i = 2; i <= n; i++) {
        setDp(i, n, w);
      }

      result = Math.min(result, downDp[n]);
    }

    if (isPossableRight && isPossableRightSecend) {
      initDp(n);

      upDp[1] = 1;
      downDp[1] = 1;
      dp[1] = 2;

      emenyList[0] = n * 2 + 1;
      emenyList[n] = n * 2 + 1;

      for (let i = 2; i <= n; i++) {
        setDp(i, n, w);
      }

      result = Math.min(result, dp[n - 1]);
    }
    
  }

  return result;
};

const setEmenyList = (frontInput, backInput) => {
  let result = [];

  const frontEmeny = frontInput.split(" ").map((value) => {
    return Number(value);
  });
  const backEmeny = backInput.split(" ").map((value) => {
    return Number(value);
  });

  result = result.concat([...frontEmeny]);
  result = result.concat([...backEmeny]);

  return result;
};

for (let test = 0; test < t; test++) {
  const info = input[test * 3 + 1].split(" ").map((value) => {
    return Number(value);
  });
  const n = info[0]; // 총 방의 수
  const w = info[1]; // 특수 부대의 수

  // 배치 된 적
  emenyList = setEmenyList(input[test * 3 + 2], input[test * 3 + 3]);
  output = output + solution(n, w);
  if (test != t - 1) {
    output = output + "\n";
  }
}

console.log(output);
