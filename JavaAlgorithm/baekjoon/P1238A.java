package JavaAlgorithm.baekjoon;

import java.io.*;
import java.util.*;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 1238번 : 파티
// 플로이드 워셜

public class P1238A {
    // 전역 클래스 및 변수
    public static class Pair{
        public int first;
        public int second;
        Pair(int first, int second) {
            this.first = first;
            this.second = second;
        }
    }

    public static int N = 0; // 학생의 수
    public static int M = 0; // 도로의 수
    public static int X = 0; // 출발지

    public static int[][] road;
    public static int[] output;

    // 입력 가져오기
    public static String[] getInput() throws Exception {
        List<String> input = new ArrayList<String>();
        File note = new File("/Users/kongsanghyean/Desktop/Algorithm/JavaAlgorithm/input.txt");
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
    public static void P1238A(String[] args) throws Exception {
        String[] inputList = getInput(); // 입력 가져오기
        String[] firstInputList = inputList[0].split(" ");

        N = Integer.parseInt(firstInputList[0]);
        M = Integer.parseInt(firstInputList[1]);
        X = Integer.parseInt(firstInputList[2]);

        road = new int[N + 1][N + 1];
        output = new int[N + 1];
        for(int i = 0 ; i <= N; i++) {
            output[i] = 0;
            for(int j = 0 ; j <= N; j++) {
                if(i == j) {
                    road[i][j] = 0;
                } else {
                    road[i][j] = 987654321;
                }
            }
        }

        for(int i = 0; i < M; i++) {
            String[] roadInput = inputList[i + 1].split(" ");
            int A = Integer.parseInt(roadInput[0]);
            int B = Integer.parseInt(roadInput[1]);
            int T = Integer.parseInt(roadInput[2]);

            road[A][B] = T;
        }

        for(int i = 1; i <= N; i++) {
            for(int start = 1; start <= N; start++) {
                for(int end = 1; end <= N; end++) {
                    road[start][end] = Math.min(road[start][end], road[start][i] + road[i][end]);
                }
            }
        }

        for(int i = 1; i <= N; i++) {
            output[i] = road[i][X] + road[X][i];
        }

        System.out.println(Arrays.stream(output).max().getAsInt());
    }
}