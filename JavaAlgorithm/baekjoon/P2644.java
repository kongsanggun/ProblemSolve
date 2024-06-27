package JavaAlgorithm.baekjoon;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 2644번 : 촌수계산

public class P2644 {
    // 전역 클래스 및 변수
    public static int N = 0;
    public static int M = 0;

    public static int output = -1;

    public static List<Integer>[] graph;
    public static boolean[] isVisited;

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
    public static void P2644(String[] args) throws Exception {
        String[] inputList = getInput(); // 입력 가져오기
        N = Integer.parseInt(inputList[0]);
        M = Integer.parseInt(inputList[2]);

        graph = new ArrayList[N + 1];
        isVisited = new boolean[N + 1];

        for(int i = 0; i <= N ; i++) {
            graph[i] = new ArrayList<Integer>();
            isVisited[i] = false;
        }

        String[] secondInput = inputList[1].split(" ");
        int start = Integer.parseInt(secondInput[0]);
        int end = Integer.parseInt(secondInput[1]);

        for(int i = 0; i < M; i++) {
            String[] input = inputList[i + 3].split(" ");

            int x = Integer.parseInt(input[0]);
            int y = Integer.parseInt(input[1]);

            graph[x].add(y);
            graph[y].add(x);
        }

        Queue<int[]> queue = new LinkedList();
        queue.add(new int[]{start, 0});
        isVisited[start] = true;
        int point = start;

        while(!queue.isEmpty() && point != end) {
            int[] top = queue.poll();

            for(int next : graph[top[0]]) {
                if(!isVisited[next]) {
                    isVisited[next] = true;
                    queue.add(new int[]{next, top[1] + 1});
                }
            }

            if(!queue.isEmpty()) {
                point = queue.peek()[0];
            }
        }

        if(!queue.isEmpty()) {
            output = queue.peek()[1];
        }

        System.out.println(output);
    }
}