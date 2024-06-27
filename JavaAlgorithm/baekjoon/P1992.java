package JavaAlgorithm.baekjoon;

import java.io.*;
import java.util.*;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 1992번 : 쿼드트리

public class P1992 {
    // 전역 클래스 및 변수
    static class QuadTree{
        int count;
        String result;

        QuadTree(int count, String result) {
            this.count = count;
            this.result = result;
        }
    }

    static String[][] movie;
    static String output = "";

    public static P1992.QuadTree findQuadTree(int startRow, int startCol, int endRow, int endCol) {
        if(startRow == endRow && startCol == endCol) {
            P1992.QuadTree result = new P1992.QuadTree(
                    Integer.parseInt(movie[startRow][startCol]),
                    movie[startRow][startCol]);

            return result;
        }

        int midRow = (int) Math.floor((startRow + endRow) / 2);
        int midCol = (int) Math.floor((startCol + endCol) / 2);
        int size = (endRow - startRow + 1) * (endCol - startCol + 1);

        P1992.QuadTree topLeft = findQuadTree(startRow, startCol, midRow, midCol);
        P1992.QuadTree bottomLeft = findQuadTree(midRow + 1, startCol, endRow, midCol);
        P1992.QuadTree topRight = findQuadTree(startRow, midCol + 1, midRow, endCol);
        P1992.QuadTree bottomRight = findQuadTree(midRow + 1, midCol + 1, endRow, endCol);

        int resultCount = topLeft.count + bottomLeft.count + topRight.count + bottomRight.count;
        String resultString = topLeft.result + topRight.result + bottomLeft.result + bottomRight.result;

        P1992.QuadTree result;
        if(resultCount == 0) {
            result = new P1992.QuadTree(resultCount, "0");
        } else if (resultCount == size) {
            result = new P1992.QuadTree(resultCount, "1");
        } else {
            result = new P1992.QuadTree(resultCount,
                    "(" +  resultString + ")");
        }

        return result;
    }

    // 입력 가져오기
    public static String[] getInput() throws Exception {
        List<String> input = new ArrayList<String>();
        File note = new File("");
        BufferedReader br = new BufferedReader(new FileReader(note));

        String str = br.readLine();
        while (str != null) {
            input.add(str);
            str = br.readLine();
        }
        br.close();

        String[] result = input.toArray(new String[input.size()]);
        return result;
    }
    public static void P1992(String[] args) throws Exception {
        String[] inputList = getInput(); // 입력 가져오기
        int N = Integer.parseInt(inputList[0]);

        movie = new String[N][N];

        for(int row = 1; row <= N; row++) {
            String[] lineInputList = inputList[row].split("");
            for(int col = 0; col < N; col++) {
                movie[row - 1][col] = lineInputList[col];
            }
        }

        // 분할 정복을 이용
        output = findQuadTree(0, 0, N - 1, N - 1).result;
        System.out.println(output);
    }
}
