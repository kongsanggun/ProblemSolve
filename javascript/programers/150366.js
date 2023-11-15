// 2023 KAKAO BLIND RECRUITMENT
// 표 병합
// 구현, 집합(UNION), 반례 주의

function solution(commands) {
    var answer = [];
    let tableMerge = []; // 병합 확인용 테이블

    // key : 병합 테이블 index
    // value : [ value, 병합 리스트 [[r, c]...] ]
    let tableData = {};

    var tableDataIndex = 0;

    for (let x = 0; x <= 50; x++) {
        tableMerge[x] = [];
        for (let y = 0; y <= 50; y++) {
            tableMerge[x][y] = null;
        }
    }

    // 커멘드 처리
    const updateTable = (input) => {
        const r = Number(input[1]);
        const c = Number(input[2]);
        const value = input[3];

        // 데이터가 없을 때 
        if (tableMerge[r][c] === null) {
            tableMerge[r][c] = tableDataIndex;
            tableData[tableDataIndex] = [value, [[r, c]]];
            tableDataIndex++;
        }
        else {
            tableData[tableMerge[r][c]][0] = value;
        }
    }

    const changeTable = (input) => {
        const valueBf = input[1];
        const valueAft = input[2];

        Object.keys(tableData).forEach(function (key) {
            if(tableData[key][0] === valueBf) {
                tableData[key][0] = valueAft;
            }
        })
    }

    const mergeTable = (input) => {
        // 자
        const r1 = Number(input[1]);
        const c1 = Number(input[2]);
        const index1 = tableMerge[r1][c1];

        // 피
        const r2 = Number(input[3]);
        const c2 = Number(input[4]);
        const index2 = tableMerge[r2][c2];

        if (r1 === r2 && c1 === c2) {
            return;
        }

        if (index1 === null && index2 === null) {
            tableMerge[r1][c1] = tableDataIndex;
            tableMerge[r2][c2] = tableDataIndex;
            tableData[tableDataIndex] = [null, []];
            tableData[tableDataIndex][1].push([r1, c1]);
            tableData[tableDataIndex][1].push([r2, c2]);
            tableDataIndex++;

        } else if(index1 === null) {
            const index = tableMerge[r2][c2];

            tableMerge[r1][c1] = index;
            tableData[index][1].push([r1, c1]);

        } else if(index2 === null) {
            const index = tableMerge[r1][c1];

            tableMerge[r2][c2] = index;
            tableData[index][1].push([r2, c2]);

        } else {
            const from = tableMerge[r2][c2];
            const to = tableMerge[r1][c1];

            if (from === to) {
                return;
            }

            if (tableData[to][0] === null) {
                tableData[to][1].forEach(function (item) {
                    tableMerge[item[0]][item[1]] = from;
                    tableData[from][1].push([item[0], item[1]]);
                });
                
                delete tableData[to];
            } else {
                tableData[from][1].forEach(function (item) {
                    tableMerge[item[0]][item[1]] = to;
                    tableData[to][1].push([item[0], item[1]]);
                });
    
                delete tableData[from];
            }
        }
    }

    const unmergeTable = (input) => {
        const r = Number(input[1]);
        const c = Number(input[2]);

        const index = tableMerge[r][c];
        if (index === null) {
            return;
        }

        tableData[index][1].forEach(function (item) {
            tableMerge[item[0]][item[1]] = null;
        });

        tableMerge[r][c] = index;
        tableData[index][1] = [[r, c]];
    }

    const printTable = (input) => {
        const r = Number(input[1]);
        const c = Number(input[2]);

        if (tableMerge[r][c] === null) {
            answer.push("EMPTY");
        }
        else {
            const value = tableData[tableMerge[r][c]][0];
            answer.push(value === null ? "EMPTY" : value);
        }
    }

    // r,c의 범위 1 이상 50 이하 
    commands.forEach(element => {
        const input = element.split(' ')
        // console.log(element);
        switch (input[0]) {
            case 'UPDATE':
                if (input.length === 4) {
                    updateTable(input);
                }
                else {
                    changeTable(input);
                }
            break;
            case 'MERGE':
                mergeTable(input);
            break;
            case 'UNMERGE':
                unmergeTable(input);
            break;
            case 'PRINT':
                printTable(input);
            break;
            default:
                break;
        }
        // console.log(tableData);
    });

    return answer;
}

console.log(solution(["UPDATE 1 1 menu", "MERGE 1 1 1 2", "MERGE 1 1 1 3", "MERGE 1 1 1 4", "MERGE 1 2 1 3", "UPDATE 1 1 hansik", "PRINT 1 1", "PRINT 1 2", "PRINT 1 3", "PRINT 1 4"]))