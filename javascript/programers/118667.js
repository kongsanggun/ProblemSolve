// 각 큐의 원소 합을 같게 만들기 위해 필요한 작업의 수 

function solution(queue1, queue2) {
    var answer = 0;

    // 1. 각 큐의 합 구하기
    let sum1 = 0;
    let sum2 = 0;

    queue1.forEach(element => {
        sum1 += element;
    });

    queue2.forEach(element => {
        sum2 += element;
    });

    // 2. 각 큐의 합 로직 구하기
    const queue = queue1.concat(queue2);
    const maxCount = queue.length;

    let point1 = 0;
    let point2 = queue1.length;

    while (point1 !== point2 && answer <= maxCount * 3) {
        if (sum1 > sum2) {
            // sum1 값을 뺸다.
            sum1 = sum1 - queue[point1];
            sum2 = sum2 + queue[point1];
            point1 = (point1 + 1) % maxCount;
        } else if (sum1 < sum2) {
            // sum2 값을 뺸다.
            sum2 = sum2 - queue[point2];
            sum1 = sum1 + queue[point2];
            point2 = (point2 + 1) % maxCount;
        }
        else  {
            return answer;
        }

        answer++;
    }

    return -1;
}