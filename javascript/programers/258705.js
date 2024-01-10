// 2024 KAKAO WINTER INTERNSHIP
// 산 모양 타일링 (lv.3)

// tops : 0 - 윗변에 삼각형 없음 / 1 - 윗변에 삼각형 있음 
function solution(n, tops) {
    var length = 2 * n + 1;
    
    let dp = [];
    dp[0] = 1;
    dp[1] = 1;

    for(let index = 2; index <= length; index++) {
        if (index % 2 === 0) {
            const topIndex = (index / 2) - 1;
            if(tops[topIndex] === 1) {
                dp[index] = (dp[index - 1] * 2 + dp[index - 2]) % 10007;
            }
            else {
                dp[index] = (dp[index - 1] + dp[index - 2]) % 10007;
            }
        }
        else {
            dp[index] = (dp[index - 1] + dp[index - 2]) % 10007;
        }
    }


    return dp[length];
}

console.log(solution(4, [1, 1, 0, 1]));
console.log(solution(2, [0, 1]));
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));