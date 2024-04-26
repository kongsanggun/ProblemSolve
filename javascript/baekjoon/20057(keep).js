// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 20057번 : 마법사 상어와 토네이도

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = 0;

const N = Number(input[0]);
const map = Array.from(Array(N + 4), () => {
  return Array(N + 4).fill(0);
});

for (let index = 1; index <= N; index++) {
  const inputLine = input[index].split(" ");
  for (let jndex in inputLine) {
    map[index + 1][Number(jndex) + 2] = Number(inputLine[jndex]);
  }
}

let wind = [Math.floor((N + 4) / 2), Math.floor((N + 4) / 2)];
let move = 0;

const movingSand = (target) => {
  if (
    target[0] <= 1 ||
    target[0] >= N + 2 ||
    target[1] <= 1 ||
    target[1] >= N + 2
  ) {
    return;
  }

  let sand = map[target[0]][target[1]];

  const A = Math.floor((sand * 7) / 100);
  const B = Math.floor((sand * 2) / 100);
  const C = Math.floor((sand * 10) / 100);
  const D = Math.floor((sand * 1) / 100);
  const E = Math.floor((sand * 5) / 100);

  if (move % 4 === 0) {
    map[target[0] + 1][target[1]] += A;
    map[target[0] - 1][target[1]] += A;
    map[target[0] + 2][target[1]] += B;
    map[target[0] - 2][target[1]] += B;
    map[target[0] + 1][target[1] - 1] += C;
    map[target[0] - 1][target[1] - 1] += C;
    map[target[0] + 1][target[1] + 1] += D;
    map[target[0] - 1][target[1] + 1] += D;
    map[target[0]][target[1] - 2] += E;

    sand = sand - A * 2 - B * 2 - C * 2 - D * 2 - E;
    map[target[0]][target[1] - 1] += sand;
  } else if (move % 4 === 1) {
    map[target[0]][target[1] + 1] += A;
    map[target[0]][target[1] - 1] += A;
    map[target[0]][target[1] + 2] += B;
    map[target[0]][target[1] - 2] += B;
    map[target[0] + 1][target[1] + 1] += C;
    map[target[0] + 1][target[1] - 1] += C;
    map[target[0] - 1][target[1] + 1] += D;
    map[target[0] - 1][target[1] - 1] += D;
    map[target[0] + 2][target[1]] += E;

    sand = sand - A * 2 - B * 2 - C * 2 - D * 2 - E;
    map[target[0] + 1][target[1]] += sand;
  } else if (move % 4 === 2) {
    map[target[0] + 1][target[1]] += A;
    map[target[0] - 1][target[1]] += A;
    map[target[0] + 2][target[1]] += B;
    map[target[0] - 2][target[1]] += B;
    map[target[0] + 1][target[1] + 1] += C;
    map[target[0] - 1][target[1] + 1] += C;
    map[target[0] + 1][target[1] - 1] += D;
    map[target[0] - 1][target[1] - 1] += D;
    map[target[0]][target[1] + 2] += E;

    sand = sand - A * 2 - B * 2 - C * 2 - D * 2 - E;
    map[target[0]][target[1] + 1] += sand;
  } else {
    map[target[0]][target[1] + 1] += A;
    map[target[0]][target[1] - 1] += A;
    map[target[0]][target[1] + 2] += B;
    map[target[0]][target[1] - 2] += B;
    map[target[0] - 1][target[1] + 1] += C;
    map[target[0] - 1][target[1] - 1] += C;
    map[target[0] + 1][target[1] + 1] += D;
    map[target[0] + 1][target[1] - 1] += D;
    map[target[0] - 2][target[1]] += E;

    sand = sand - A * 2 - B * 2 - C * 2 - D * 2 - E;
    map[target[0] - 1][target[1]] += sand;
  }

  map[target[0]][target[1]] = 0;
};

const moving = () => {
  const moveCount = Math.ceil((move + 1) / 2);

  if (move % 4 === 0) {
    for (let count = 1; count <= moveCount; count++) {
      wind[1] -= 1;
      const y = [...wind];
      movingSand(y);
    }
  } else if (move % 4 === 1) {
    for (let count = 1; count <= moveCount; count++) {
      wind[0] += 1;
      const y = [...wind];
      movingSand(y);
    }
  } else if (move % 4 === 2) {
    for (let count = 1; count <= moveCount; count++) {
      wind[1] += 1;
      const y = [...wind];
      movingSand(y);
    }
  } else {
    for (let count = 1; count <= moveCount; count++) {
      wind[0] -= 1;
      const y = [...wind];
      movingSand(y);
    }
  }

  move += 1;
};

while (wind[0] > 1 && wind[0] < N + 2 && wind[1] > 1 && wind[1] < N + 2) {
  moving();
}

for (let r = 0; r < N + 4; r++) {
  for (let c = 0; c < N + 4; c++) {
    if (r <= 1 || r >= N + 2 || c <= 1 || c >= N + 2) {
      output += map[r][c];
    }
  }
}

console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋㅋ