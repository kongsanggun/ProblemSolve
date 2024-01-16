// 2024 KAKAO WINTER INTERNSHIP
// 주사위 고르기 (lv.3)

function solution(dices) {
    var answer = [];
    let maxWin = 0;
    const size = dices.length;
    const initDice = dices.map((v, i) => i);
  
    // 주사위 나오는 모든 경우의 수 
    const initSumList = (list, index, sum) => {
      if(list.length === index) {
        return [sum];
      }
  
      let result = [];
      const target = list[index];
      for(let item of dices[target]) {
        result = [...result, ...initSumList(list, index + 1, sum + Number(item))];
      }
  
      return result;
    }
  
    // 2. 승수 구해서 최고 승수 찾기
    const checkWins = (diceListA, diceListB) => {
      const diceSumA = initSumList(diceListA, 0, 0).sort((a, b) => {return a - b});
      const diceSumB = initSumList(diceListB, 0, 0).sort((a, b) => {return a - b;});
      
      let diceWin = 0;
      let diceIndexA = 0;
      let diceIndexB = 0;
  
      while(diceIndexA < diceSumA.length && diceIndexB < diceSumB.length) {
        if(diceSumA[diceIndexA] > diceSumB[diceIndexB]) {
          diceIndexB++;
        }
        else {
          diceWin = diceWin + diceIndexB;
          diceIndexA++;
        }
      }
  
      if(diceIndexA < diceSumA.length) {
        diceWin = diceWin + (diceSumB.length * (diceSumA.length - diceIndexA));
      }
  
      // console.log('---');
      // console.log(diceWin);
  
      if(maxWin < diceWin) {
        maxWin = diceWin;
        answer = diceListA.map((v) => {return Number(v) + 1});
      }
    }
  
    // 1. 조합을 이용하여 고를 수 있는 주사위를 고르기
    const chooseDice = (choose, list, remain) => {
      if (choose.length === Math.floor(size / 2)) {
        checkWins(choose, remain);
        return;
      }
  
      for (let items of list) {
        const newChoose = [...choose, items];
        const newList = list.map((v) => v).filter((v) => {return v > items});
        const newRemain = remain.map((v) => v).filter((v) => {return v !== items});
        chooseDice(newChoose, newList, newRemain);
      }
    }
  
    chooseDice([], [...initDice], [...initDice]);
    return answer;
  }