// 2024 KAKAO WINTER INTERNSHIP
// n + 1 카드게임 (lv.3)

function solution(coin, cards) {
    var answer = 0;
  
    const size = cards.length;
    let matchIndex = [];
  
    let have = []; // 가질 경우
    let notHave = []; // 가지지 않을 경우
  
    const compare = (a, b) => {
      if(a[0] > b[0]) {
          return true;
      } else if(a[0] < b[0]) {
          return false;
      } else {
          if(a[1] > b[1])  {
              return true;
          }
          else {
              return false;
          }
      }
    }
  
    // 1. 해쉬를 이용하여 매칭되는 인덱스 구하기
    const initMatch = () => {
      let hash = {};
  
      for (let index in cards) {
        const card = cards[index];
        const target = size + 1 - card;
        const targetCard = hash[target];
  
        if (targetCard === undefined) {
          hash[card] = index;
        } else {
          matchIndex[Number(index)] = Number(targetCard);
          matchIndex[Number(targetCard)] = Number(index);
        }
      }
    };
  
    // 2. 그리드 && dp를 이용하여 최대로 구할 수 있는 쌍 구하기
    const remainInit = (param) => {
      for (let index = 1; index < param; index++) {
        if (matchIndex[index] < index) {
          answer++;
        }
      }
    };
  
    const remainRound = (param) => {
      let start = param;
      let end = param + 2;
      let limit = 0;
  
      while (answer >= limit && end <= size) {
        for (let index = start; index < end; index++) {
          if (matchIndex[index] < index) {
              let have_tmp = have.map((v) => v);
              let notHave_tmp = notHave.map((v) => v);
  
              // 2 - 1. nothave 갱신
              notHave = compare(have, notHave) ? have : notHave;
  
              // 2 - 2. have 갱신
              if (matchIndex[index] >= param) {
                  // 2개 소비
                  if(have_tmp[1] > 1) {
                      have_tmp[0]++;
                      have_tmp[1] = have_tmp[1] - 2;
                  }
  
                  if(notHave_tmp[1] > 1) {
                      notHave_tmp[0]++;
                      notHave_tmp[1] = notHave_tmp[1] - 2;
                  }
              } else {
                  // 1개 소비
                  if(have_tmp[1] > 0) {
                      have_tmp[0]++;
                      have_tmp[1] = have_tmp[1] - 1;
                  }
  
                  if(notHave_tmp[1] > 0) {
                      notHave_tmp[0]++;
                      notHave_tmp[1] = notHave_tmp[1] - 1;
                  }
              }
  
              have = compare(have_tmp, notHave_tmp) ? have_tmp : notHave_tmp;
  
              let answer_tmp = (have[0] > notHave[0]) ? have[0] : notHave[0];
              answer = (answer_tmp > answer) ? answer_tmp : answer;
          }
  
          // console.log(index);
          // console.log(have);
          // console.log(notHave);
        }
  
        start = start + 2;
        end = end + 2;
        limit++;
  
      //   console.log('start : ' + start);
      //   console.log('end : ' + end);
      //   console.log('limit : ' + limit);
      //   console.log('answer : ' + answer);
      }
    };
  
    initMatch();
    remainInit(Math.floor(size / 3));
    have = [answer, coin];
    notHave = [answer, coin];
  
    remainRound(Math.floor(size / 3));
    return (answer === Math.floor(size / 2)) ? answer : answer + 1;
  }
  
  console.log(solution(4, [3, 6, 7, 2, 1, 10, 5, 9, 8, 12, 11, 4]));
  console.log(solution(3, [1, 2, 3, 4, 5, 8, 6, 7, 9, 10, 11, 12]));
  console.log(solution(2, [5, 8, 1, 2, 9, 4, 12, 11, 3, 10, 6, 7]));
  console.log(
    solution(18, [1, 18, 2, 17, 3, 16, 4, 15, 5, 14, 6, 13, 7, 12, 8, 11, 9, 10])
  );
  