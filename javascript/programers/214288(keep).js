// 2023 현대모비스 알고리즘 경진대회 예선
// 상담원 인원

// 최솟값을 리턴
// DP 문제 ? 

// k : 상담 유형의 수
// n : 상담 멘토의 수
// req -> [a, b, c] : a분에  b분 동안 c번 유형의 상담을 들을려고 함 
// 멘토 인원을 적절히 배정했을 때 참가자들이 상담을 받기까지 기다린 시간을 모두 합한 값의 최솟값을 리턴
function solution(k, n, reqs) {
    var answer = Infinity;
    
    // 배치된 상담 멘토의 수 
    const initPerson = Array.from({length: k + 1}, () => 0); 
    let startPerson = 0;   

    // dp[i][j] : 현재 i명일 때 멘토 를 유형 j로 추가 시 최소 대기 시간
    // dp[][] => [최소 시간(Number), 배치된 멘토의 수 (Array)]
    let dp = Array.from({length: n + 1}, () => Array(k + 1).fill([Infinity, []])); 
    
    // 대기 시간 구하기
    const getWaitTime = (personList) => {
        let waitTime = 0;

        // timetable[][][] = 타임테이블[유형][사람 수][대기 수] : [시작, 끝]
        let timetable = Array.from({length : k + 1}, ());
        for (let i = 1; i <= k; i++) {
            timetable[i] = Array.from({length : personList[i]}, []);
        }

        // TODO : 대기 시간 구하기
        for (let req of reqs) {
            
        }

        return waitTime;
    }

    // 1. DP 순회 시작 지점을 구한다.
    for (let req of reqs) {
        initPerson[req[2]] = 1;
    }

    for (let item of initPerson) {
        startPerson = (item === 1) ? startPerson + 1 : startPerson;
    }

    // 2. 순회 시작 지점일 떄 대기 시간을 구한다.
    const initTime = getWaitTime(initPerson);

    for (let j = 1; j <= k; j++) {
        dp[startPerson][j] = [initTime, startPerson];
    }

    // 3. DP를 이용하여 인원 수 마다 최소 시간을 구한다.
    for (let i = startPerson; i < n; i++) {
        for (let j = 1; j <= k; j++) {
            for (let select = 1; select <= k; select++) {
                let personList = [...dp[i][j][1]];
                personList[select] = personList[select] + 1;

                const time = getWaitTime(personList);

                if (dp[i + 1][j][1] > time) {
                    dp[i + 1][j] = [time, personList];
                }
            }
        }
    }

    // 4. N명 일 때의 최소 시간을 구한다.
    for (let index = 1; index <= k; index++) {
        answer = (answer > dp[n][index][1]) ? dp[n][index][1] : answer;
    }

    return answer;
}

console.log(solution(3, 5, [[10, 60, 1], [15, 100, 3], [20, 30, 1], [30, 50, 3], [50, 40, 1], [60, 30, 2], [65, 30, 1], [70, 100, 2]]));
console.log(solution(2, 3, [[5, 55, 2], [10, 90, 2], [20, 40, 2], [50, 45, 2], [100, 50, 2]]));