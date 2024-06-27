package JavaAlgorithm.baekjoon;

import java.io.*;
import java.util.*;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 14248번 : 점프 점프

public class P14248 {
    // 전역 클래스 및 변수
    public static boolean[] isVisited;
    public static int output = 1;
    public static Queue<Integer> queue = new LinkedList<Integer>();

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
    public static void P14248(String[] args) throws Exception {
        String[] inputList = getInput(); // 입력 가져오기

        int N = Integer.parseInt(inputList[0]);
        String[] A = inputList[1].split(" ");
        int S = Integer.parseInt(inputList[2]) - 1;

        isVisited = new boolean[N];
        for(int i = 0; i < N; i++) {
            isVisited[i] = false;
        }

        isVisited[S] = true;
        queue.add(S);

        while(!queue.isEmpty()) {
            Integer top = queue.poll();
            int add = Integer.parseInt(A[top]);

            if((top + add) < N) {
                if(!isVisited[top + add]) {
                    isVisited[top + add] = true;
                    queue.add(top + add);
                    output += 1;
                }
            }

            if((top - add) >= 0) {
                if(!isVisited[top - add]) {
                    isVisited[top - add] = true;
                    queue.add(top - add);
                    output += 1;
                }
            }
        }

        System.out.println(output);
    }
}
