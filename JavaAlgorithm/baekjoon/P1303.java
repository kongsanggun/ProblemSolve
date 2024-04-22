import java.io.*;
import java.util.*;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));
// 1303번 : 전쟁 - 전투

public class P1303 {

    // 전역 변수
    static int N;
    static int M;
    static int[] nextX = { 1, -1, 0, 0 };
    static int[] nextY = { 0, 0, 1, -1 };

    static String map[][];
    static boolean isVisited[][];

    // 입력 가져오기
    public static List<String> getInput() throws Exception {
        List<String> result = new ArrayList<String>();
        File note = new File("src/main/java/input.txt");
        BufferedReader br = new BufferedReader(new FileReader(note));

        String str = br.readLine();
        while (str != null) {
            result.add(str);
            str = br.readLine();
        }
        br.close();

        return result;
    }

    public static int DFS(int level, String team, int x, int y) {
        int result = level;

        for (int i = 0; i < 4; i++) {
            if (x + nextX[i] < 0 || x + nextX[i] >= M || y + nextY[i] < 0 || y + nextY[i] >= N) {
                continue;
            }

            if (!isVisited[x + nextX[i]][y + nextY[i]] && map[x + nextX[i]][y + nextY[i]].equals(team)) {
                isVisited[x + nextX[i]][y + nextY[i]] = true;
                result += DFS(1, team, x + nextX[i], y + nextY[i]);
            }
        }

        return result;
    }

    public static void main(String[] args) throws Exception {
        List<String> inputList = getInput();
        String firstLine = inputList.get(0);

        int[] output = { 0, 0 };

        N = Integer.parseInt(firstLine.split(" ")[0]); // 가로
        M = Integer.parseInt(firstLine.split(" ")[1]); // 세로

        map = new String[M][N];
        isVisited = new boolean[M][N];

        for (int x = 1; x <= M; x++) {
            Arrays.fill(isVisited[x - 1], false);

            String[] inputLine = inputList.get(x).split("");
            for (int y = 0; y < N; y++) {
                map[x - 1][y] = inputLine[y];
            }
        }

        for (int x = 0; x < M; x++) {
            for (int y = 0; y < N; y++) {
                if (isVisited[x][y]) {
                    continue;
                }

                isVisited[x][y] = true;
                int count = DFS(1, map[x][y], x, y);

                if (map[x][y].equals("W")) {
                    output[0] = output[0] + (count * count);
                } else {
                    output[1] = output[1] + (count * count);
                }
            }
        }

        System.out.println(output[0] + " " + output[1]);
    }
}