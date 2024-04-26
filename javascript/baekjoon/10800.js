// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 10800번 : 컬러볼
// 각 플레이어의 목표는 자기 공보다 크기가 작고 색이 다른 공을 사로잡아 그 공의 크기만큼의 점수를 얻는 것
// 다른 공을 사로잡은 이후에도 본인의 공의 색과 크기는 변하지 않는다.

class ball {
  constructor(color, size) {
    this.color = color;
    this.size = size;
    this.rank = [0, 0]; // [총 순위, 색 내 순위]
  }
}

let input = require("fs").readFileSync("input.txt").toString().split("\n");
let output = [];

const N = Number(input[0]);
let ballList = []; // 공의 정보
let ballSum = [[0, -1]]; // 전체 공의 누적합
let ballColorSum = {}; // 동 색깔 내 공의 누적합

for (let index = 1; index <= N; index++) {
  const [color, size] = input[index].split(" ").map((v) => {
    return Number(v);
  });

  // 각 공의 정보 추가
  ballList.push(new ball(color, size));
  // 전체 공의 누적합 추가
  ballSum.push([size, index - 1]);
  // 동 색깔 내 공의 누적합 추가
  if (ballColorSum[color] === undefined) {
    ballColorSum[color] = [
      [0, -1],
      [size, index - 1],
    ];
  } else {
    ballColorSum[color].push([size, index - 1]);
  }
}

// 누적합 정렬하기
ballSum = ballSum.sort((a, b) => {
  return a[0] - b[0];
});

let tmpBall = [0, -1, 0];
for (let index = 1; index < ballSum.length; index++) {
  if (tmpBall[0] === ballSum[index][0]) {
    ballList[ballSum[index][1]].rank[0] = tmpBall[2];
    ballSum[index][1] = tmpBall[1];
  } else {
    tmpBall = [...ballSum[index], index];
    ballList[ballSum[index][1]].rank[0] = index;
  }

  ballSum[index][0] = ballSum[index][0] + ballSum[index - 1][0];
}

// 색 내 누적합 정렬하기
for (let key of Object.keys(ballColorSum)) {
  ballColorSum[key] = ballColorSum[key].sort((a, b) => {
    return a[0] - b[0];
  });

  let tmpColorBall = [0, -1, 0];
  for (let index = 1; index < ballColorSum[key].length; index++) {
    if (tmpColorBall[0] === ballColorSum[key][index][0]) {
      ballList[ballColorSum[key][index][1]].rank[1] = tmpColorBall[2];
      ballColorSum[key][index][1] = tmpColorBall[1];
    } else {
      tmpColorBall = [...ballColorSum[key][index], index];
      ballList[ballColorSum[key][index][1]].rank[1] = index;
    }

    ballColorSum[key][index][0] =
      ballColorSum[key][index][0] + ballColorSum[key][index - 1][0];
  }
}

// 값 구하기
for (let ball of ballList) {
  let result = 0;

  result += ballSum[ball.rank[0] - 1][0];
  result -= ballColorSum[ball.color][ball.rank[1] - 1][0];

  output.push(result);
}

console.log(output.join("\n")); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ