// let input = require('fs').readFileSync('/dev/stdin').toString().split('\n'); 백준 제출용
// .split('\n') 행바꿈  // .split(' ') 공백
// 실행은 node solution (터미널)

// 17503번 - 자료구조
// 맥주 축제

const pushQueue = (value) => {
    queue.push(value);
    let point = queue.length - 1;
    while(point > 1) {
      let parent = Math.floor(point / 2);
      if(queue[parent] > queue[point]) {
        let tmp = queue[point];
        queue[point] = queue[parent];
        queue[parent] = tmp;
      } else {
        break;
      }
      point = parent;
    }
  }
  
  const popQueue = () => {
    let tmp = queue[1];
    const result = tmp;
    queue[1] = queue[queue.length - 1];
    queue[queue.length - 1] = tmp;
    queue.pop();
  
    if(queue.length === 1){
      return result;
    }
  
    let point = 1;
    while(point * 2 < queue.length) {
      let compare = point * 2;
      if(compare + 1 < queue.length && queue[compare] > queue[compare + 1]) {
        compare = compare + 1;
      }
      if(queue[compare] < queue[point]) {
        tmp = queue[compare];
        queue[compare] = queue[point];
        queue[point] = tmp;
      } else {
        break;
      }
      point = compare;
    }
  
    return result;
  }
  
  let inputs = require('fs').readFileSync('input.txt').toString().split('\n'); // 테스트
  const firstInput = inputs[0].split(' ');
  const n = Number(firstInput[0]);  // 일수
  const m = Number(firstInput[1]);  // 최소 선호도
  const k = Number(firstInput[2]);  // 맥주의 종류
  
  let output = -1;
  
  let beerList = [];
  for (let index = 1; index < inputs.length; index++) {
    const tmpInput = inputs[index].split(' ');
    const like = Number(tmpInput[0]); // 선호도
    const level = Number(tmpInput[1]); // 간 레벨
    beerList.push([like, level]);
  }
  
  // 간 레벨 오름차순
  beerList.sort((a, b) => {return a[1] - b[1]});
  
  // 추가기준 간 레벨 삭제기준 선호도
  // 우선 순위 큐를 이용
  
  let queue = [null];
  let point = 0;
  let queueSum = 0;
  
  while(point < k) {
    if(queue.length === n + 1) {
      queueSum = queueSum - popQueue();
    }
  
    pushQueue(beerList[point][0]);
    queueSum = queueSum + beerList[point][0];
  
    if(queueSum >= m && queue.length === n + 1) {
      break;
    }
  
    point = point + 1;
  }
  
  if(point < k) {
    output = beerList[point][1];
  }
  
  console.log(output); // 최대한 console.log 적게 쓰기 ㅋㅋㅋㅋㅋㅋ