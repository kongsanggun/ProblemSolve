// 2023 KAKAO BLIND RECRUITMENT
// 표현 가능한 이진트리
// 이분탐색?

function solution(numbers) {
    var answer = [];
    let count = 0;

    const binarySearch = (left, right, binary) => {
        const mid = Math.round((left + right) / 2);
        if (left < right) {
            if (binary[mid] === '1') {
                count = count + 1;
                binarySearch(left, mid - 1, binary);
                binarySearch(mid, right, binary);
            }
        }
    }

    numbers.forEach(element => {

        let number = element;
        let binary = "";
        count = 0;
        let nodeCount = 0;

        // 1. 이진수로 변환하기
        while(number > 0) {
            nodeCount = (number % 2) ? nodeCount + 1 : nodeCount;
            binary = binary + (number % 2);
            number = Math.floor(number / 2);
        }

        binary = binary.split('').reverse().join('');

        // 2. 포화 이진트리로 만들기 (2 ^ n - 1)
        let pow = 0;
        while(binary.length > Math.pow(2, pow) - 1) {
            pow = pow + 1;
        }

        const dif = Math.pow(2, pow) - 1 - binary.length;
        for(let index = 0; index < dif; index++) {
            binary = '0' + binary;
        }

        // 3. 분할로 조사하기
        let left = -1;
        let right = binary.length - 1;

        binarySearch(left, right, binary);

        if (count === nodeCount) {
            answer.push(1);
        } else {
            answer.push(0);
        }

    });

    return answer;
}

console.log(solution([7, 42, 5, 15]))
console.log(solution([63, 111, 95]))