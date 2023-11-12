// 2023 KAKAO BLIND RECRUITMENT
// 미로탈출 명령어
// 구현, DFS

function solution(n, m, x, y, r, c, k) {
    var answer = '';

    // n * m 격자
    // (x, y) -> (r, c)
    // 거리 이동은 총 k

    // 갈 수 있는 가장 최소의 거리
    // 1. impossible 처리
    let distance = Math.abs(x - r) + Math.abs(y - c);
    let remain = k - distance;

    if (k < distance)
    {
        return "impossible";
    }
    
    if (remain % 2 !== 0) {
        return "impossible";
    }

    // 사전 순 : d(아래) -> l(왼쪽) -> r(오른쪽) -> u(위)
    // 남은 거리랑 일치할 때 까지

    while(k !== distance) {
        if (x < n) {
            x++;
            answer = answer + 'd';
        }
        else if (y !== 1) {
            y--;
            answer = answer + 'l';
        }
        else {
            y++;
            answer = answer + 'r';
        }

        distance = Math.abs(x - r) + Math.abs(y - c);
        k--;
    }

    // 남은 거리랑 일치할 때
    while ( r > x ) {
        answer = answer + 'd';
        x++;
    }

    while ( c < y ) {
        answer = answer + 'l';
        y--;
    }

    while ( c > y ) {
        answer = answer + 'r';
        y++;
    }

    while ( r < x ) {
        answer = answer + 'u';
        x--;
    }

    return answer;
}

console.log(solution(3, 4, 2, 3, 3, 1, 5))
console.log(solution(2, 2, 1, 1, 2, 2, 2))
console.log(solution(3, 3, 1, 2, 3, 3, 4))