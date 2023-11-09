// 2023 KAKAO BLIND RECRUITMENT
// 택배 배달과 수거하기
// 투 포인터 

function solution(cap, n, deliveries, pickups) {
    var answer = 0;
    let point = n - 1;

    // 1. 포인터 정렬
    while (deliveries[point] === 0 && pickups[point] === 0) {
        point--;
    }

    while (point >= 0) {
        answer += 2 * (point + 1);

        let cntDeliveries = cap;
        let cntPickups = cap;

        while ( cntDeliveries >= 0 && cntPickups >= 0) {
            const tmpDeliveries = cntDeliveries;
            const tmpcntPickups = cntPickups;

            cntDeliveries = cntDeliveries - deliveries[point];
            cntPickups = cntPickups - pickups[point];

            deliveries[point] = deliveries[point] - tmpDeliveries;
            pickups[point] = pickups[point] - tmpcntPickups;
            
            if (deliveries[point] <= 0 && pickups[point] <= 0) {
                point--;
            }
        }
    }
    return answer;
}
