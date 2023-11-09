// 2023 KAKAO BLIND RECRUITMENT
// 이모티콘 할인행사
// 

function solution(users, emoticons) {
    var answer = [0, 0];
    // 각 할인 때 마다 어느 순서 까지 오는지 확인 -1일 경우 아무도 없다는 뜻
    let rateRange = [-1, -1, -1, -1]; // 10, 20, 30, 40;

    const calculate = (array) => {
        let pointer = 0;
        const discount = [0, 0, 0, 0];
        const tmpAnswer = [0, 0];

        array.forEach((element, index) => {
            const disrate = (element + 1) * 10;
            const cost = emoticons[index] / 100 * (100 - disrate);

            discount[element] += cost;
        })

        for(let index = discount.length - 1; index > 0; index--) {
            discount[index - 1] = discount[index] + discount[index - 1];
        }

        users.forEach((element, index) => {
            while(index > rateRange[pointer]) {
                pointer = pointer + 1;
            }

            if (element[1] <= discount[pointer]) {
                tmpAnswer[0]++;
            } else {
                tmpAnswer[1] += discount[pointer];
            }
        })

        if (tmpAnswer[0] > answer[0]) {
            answer = tmpAnswer;
        } else if (tmpAnswer[0] === answer[0] && tmpAnswer[1] > answer[1]) {
            answer = tmpAnswer;
        }
    }

    const DFS = (array, length) => {
        if (length === emoticons.length) {
            calculate(array);
            return;
        }

        for (let index = 0; index < 4; index++) {
            DFS([...array, index], length + 1);
        }
    }

    // 1. user를 할인률로 정렬하기
    users.sort((a, b) => {
        return Number(a[0]) - Number(b[0]);
    });

    // 2. 할인 수요 조사
    users.forEach((element, index) => {
        const rate = element[0];
        if (rate < 11) {
            rateRange[0] = index;
        } else if(rate < 21) {
            rateRange[1] = index;
        } else if(rate < 31) {
            rateRange[2] = index;
        } 
        rateRange[3] = index;
    });

    // 3. 부르트포스 && DFS를 이용하여 최댓값을 구해준다. -> 최대 4^7 (4096번)
    DFS([], 0);

    return answer;
}

console.log(solution([[40, 10000], [25, 10000]], [7000, 9000]));
console.log(solution([[40, 2900], [23, 10000], [11, 5200], [5, 5900], [40, 3100], [27, 9200], [32, 6900]], [1300, 1500, 1600, 4900]));
