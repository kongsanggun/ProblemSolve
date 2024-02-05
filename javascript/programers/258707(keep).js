// 2024 KAKAO WINTER INTERNSHIP
// n + 1 카드게임 (lv.3)

function solution(coin, cards) {
  var pair = 0;
  const limit = Math.floor(cards.length / 3);
  let coinList = [[], [], []]; // 0개 소비, 1개 소비, 2개 소비
  
  for (let index in cards) {
    const card = cards[index];
    const target = cards.length + 1 - card;
    const targetIndex = cards.findIndex((v) => {return v === target});

    if(Number(index) < limit && targetIndex < limit) {
      coinList[0].push(card);
    }
    else if(Number(index) < limit || targetIndex < limit) {
      coinList[1].push(card);
    }
    else {
      coinList[2].push(card);
    }
  }

  pair = Math.floor(coinList[0].length / 2);
  //console.log('round 0 : ' + pair);

  let round = 0;
  const cardB = cards.slice(limit);
  let index = 2;

  while(index <= cardB.length && round <= pair) {
    let remain = coin;
    let tmpPair = Math.floor(coinList[0].length / 2);

    for(let i = 0; i < index; i++) {
      if(remain < 1) continue;
      const target = cardB[i];
      let find = coinList[1].findIndex((v) => {return v === target});
      if(find !== -1 && remain > 0) {
        remain = remain - 1;
        tmpPair++;
      }
    }

    if(remain > 1) {
      for(let i = 0; i < index; i++) {
        if(remain < 2) continue;
        const target = cardB[i];
        let find = coinList[1].findIndex((v) => {return v === target});
        if(find !== -1) continue;
        find = cardB.findIndex((v) => {return v === (cards.length - target + 1)});
        if(i > find && remain > 1) {
          remain = remain - 2;
          tmpPair++;
        }
      }
    }

    pair = (tmpPair > pair) ? tmpPair : pair;
    round++;
    index = index + 2;
    //console.log('round ' + round + ' : ' + pair);
  }

  if(round <= pair) {
    round = (pair === Math.floor(cards.length / 2)) ? pair : pair + 1;
  }

  return round;
}

console.log(solution(4, [3, 6, 7, 2, 1, 10, 5, 9, 8, 12, 11, 4]));
console.log(solution(3, [1, 2, 3, 4, 5, 8, 6, 7, 9, 10, 11, 12]));
console.log(solution(2, [5, 8, 1, 2, 9, 4, 12, 11, 3, 10, 6, 7]));
console.log(
  solution(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
);
console.log(
  solution(2, [1, 2, 3, 4, 5, 8, 12, 11, 7, 6, 9, 10])
);     // answer is 2