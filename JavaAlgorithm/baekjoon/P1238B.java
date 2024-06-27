package JavaAlgorithm.baekjoon;

import java.io.*;
import java.util.*;
import java.util.PriorityQueue;
import java.util.Comparator;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 1238번 : 파티
// 다익스트라

public class P1238B {
    // 전역 클래스 및 변수
    public static class Pair{
        public int first;
        public int second;
        Pair(int first, int second) {
            this.first = first;
            this.second = second;
        }
    }

    public static class PairCompare implements Comparator<Pair> {
        @Override
        public int compare(Pair o1, Pair o2) {
            return o1.first - o2.first;
        }
    }

    public static int N = 0; // 학생의 수
    public static int M = 0; // 도로의 수
    public static int X = 0; // 출발지

    public static int[] output;
    public static List<Pair>[] road;

    public static int[] disktra(int start) {
        int[] result = new int[N + 1];
        boolean[] isVisited = new boolean[N + 1];
        PriorityQueue<Pair> queue = new PriorityQueue<Pair>(1, new PairCompare());

        for(int i = 0 ; i <= N; i++) {
            result[i] = 987654321;
            isVisited[i] = false;
        }

        result[start] = 0;
        queue.add(new Pair(0, start));

        while(queue.size() > 0) {
            Pair top = queue.poll();
            if(!isVisited[top.second]) {
                isVisited[top.second] = true;
                for(Pair next : road[top.second]) {
                    if(!isVisited[next.first]) {
                        int value = next.second + result[top.second];
                        if(value < result[next.first]) {
                            result[next.first] = value;
                            queue.add(new Pair(value, next.first));
                        }
                    }
                }
            }
        }

        return result;
    }

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
    public static void P1238B(String[] args) throws Exception {
        String[] inputList = getInput(); // 입력 가져오기
        String[] firstInputList = inputList[0].split(" ");

        N = Integer.parseInt(firstInputList[0]);
        M = Integer.parseInt(firstInputList[1]);
        X = Integer.parseInt(firstInputList[2]);

        output = new int[N + 1];
        road = new ArrayList[N + 1];

        for(int i = 0 ; i <= N; i++) {
            output[i] = 0;
            road[i] = new ArrayList<Pair>();
        }

        for(int i = 0; i < M; i++) {
            String[] roadInput = inputList[i + 1].split(" ");
            int A = Integer.parseInt(roadInput[0]);
            int B = Integer.parseInt(roadInput[1]);
            int T = Integer.parseInt(roadInput[2]);

            road[A].add(new Pair(B, T));
        }

        // 다익스트라 구하기
        for(int start = 1; start <= N; start++) {
            int[] tmp = disktra(start);
            output[start] += tmp[X];
        }

        int[] tmp = disktra(X);
        for(int end = 1; end <= N; end++) {
            output[end] += tmp[end];
        }

        System.out.println(Arrays.stream(output).max().getAsInt());
    }
}
