package JavaAlgorithm.baekjoon;

import java.io.*;
import java.util.*;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 11265번 : 끝나지 않는 파티

public class P11265 {
    // 전역 클래스 및 변수
    public static int N = 0; // 파티장의 크기
    public static int M = 0; // 서비스를 요청한 손님의 수

    public static int[][] time;

    // 입력 가져오기
    public static String[] getInput() throws Exception {
        List<String> input = new ArrayList<String>();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String str = br.readLine();
        while (str != null) {
            input.add(str);
            str = br.readLine();
        }
        br.close();

        String[] result = input.toArray(new String[input.size()]);
        return result;
    }
    public static void P11265(String[] args) throws Exception {
        String[] inputList = getInput(); // 입력 가져오기
        String[] firstInputList = inputList[0].split(" ");

        N = Integer.parseInt(firstInputList[0]);
        M = Integer.parseInt(firstInputList[1]);

        time = new int[N][N];

        for(int i = 0; i < N; i++) {
            String[] timeInput = inputList[i + 1].split(" ");
            for(int j = 0; j < N; j++) {
                time[i][j] = Integer.parseInt(timeInput[j]);
            }
        }

        for(int i = 0; i < N; i++) {
            for(int row = 0; row < N; row++) {
                for(int col = 0; col < N; col++) {
                    time[row][col] = Math.min(time[row][col], time[row][i] + time[i][col]);
                }
            }
        }

        for(int i = 0; i < M; i++) {
            String[] requestInput = inputList[i + N + 1].split(" ");

            int A = Integer.parseInt(requestInput[0]) - 1;
            int B = Integer.parseInt(requestInput[1]) - 1;
            int C = Integer.parseInt(requestInput[2]);

            if(time[A][B] <= C) {
                System.out.println("Enjoy other party");
            } else {
                System.out.println("Stay here");
            }
        }
    }
}
