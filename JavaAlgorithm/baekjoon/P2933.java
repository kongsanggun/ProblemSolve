import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 2933번 : 미네랄

public class P2933 {
    // 전역 클래스 및 변수
    static String[][] map;
    static int mineral = 0;

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

    public static void main(String[] args) throws Exception {
        String[] inputList = getInput(); // 입력 가져오기

        String[] firstList = inputList[0].split(" ");
        int R = Integer.parseInt(firstList[0]);
        int C = Integer.parseInt(firstList[1]);

        int N = Integer.parseInt(inputList[R + 1]);

        map = new String[R][C];

        for(int index = 1; index <= R; index++) {
            String[] lineList = inputList[index].split("");
            for(int jndex = 0; jndex < C; jndex++) {
                map[index - 1][jndex] = lineList[jndex];
                mineral = (map[index - 1][jndex].equals("x")) ? mineral + 1 : mineral;
            }
        }

        String[] commandList = inputList[R + 2].split(" ");
        for(int index = 0; index < N; index++) {

            boolean[][] isVisited = new boolean[R][C];
            String[][] tmpMap = new String[R][C];

            int commandRow = R - Integer.parseInt(commandList[index]);

            // 1. 미네랄 파괴 (왼쪽 -> 오른쪽 순서)
            int startDistory = (index % 2 == 0) ? 0 : C - 1;
            int distoryDir = (index % 2 == 0) ? 1 : -1;

            while(startDistory >= 0 && startDistory < C) {
                if(map[commandRow][startDistory].equals("x") ) {
                    map[commandRow][startDistory] = ".";
                    mineral = mineral - 1;
                    break;
                }
                startDistory = startDistory + distoryDir;
            }

            // 2. 공중 클러스터 확인
            int count = 0;
            for(int c = 0; c < C; c++) {
                if(map[R - 1][c].equals("x") && !isVisited[R - 1][c]) {
                    Queue<int[]> queue = new LinkedList<int[]>();

                    int[] start = {R - 1, c};
                    queue.offer(start);
                    isVisited[R - 1][c] = true;

                    count += 1;

                    while(queue.size() > 0) {
                        int[] top = queue.poll();
                        int[] nextRow = {0, 0, 1, -1};
                        int[] nextCol = {1, -1, 0, 0};

                        for(int next = 0; next < 4; next++) {
                            int row = top[0] + nextRow[next];
                            int col = top[1] + nextCol[next];
                            if(row < 0 || row >= R || col < 0 || col >= C) {
                                continue;
                            }

                            if(map[row][col].equals("x") && !isVisited[row][col]) {
                                int[] tmp = {row, col};
                                queue.offer(tmp);
                                isVisited[row][col] = true;
                                count += 1;
                            }
                        }
                    }
                }
            }

            // 3. 공중 클러스터 조정
            if(count != mineral) {
                int minGap = R + 1; // 땅과 공중의 차이

                for(int c = 0; c < C; c++) {
                    int minHight = R - 1;

                    for(int r = R - 1; r >= 0; r--) {
                        if(isVisited[r][c]) {
                            minHight = r - 1;
                        } else if(map[r][c].equals("x")) {
                            minGap = Math.min(minGap, minHight - r);
                        }
                    }
                }

                for(int r = 0; r < R; r++) {
                    for(int c = 0; c < C; c++) {
                        if(r >= minGap && map[r - minGap][c].equals("x") && !isVisited[r - minGap][c]) {
                            tmpMap[r][c] = "x";
                        } else {
                            tmpMap[r][c] = ".";
                        }
                    }
                }

                mineral = 0;

                for(int r = 0; r < R; r++) {
                    for(int c = 0; c < C; c++) {
                        if(tmpMap[r][c].equals("x") || isVisited[r][c]) {
                            map[r][c] = "x";
                            mineral += 1;
                        } else {
                            map[r][c] = ".";
                        }
                    }
                }

            }
        }

        // show map
        for(int r = 0; r < R; r++) {
            Collectors Collectors = null;
            String output = Arrays.stream(map[r]).collect(java.util.stream.Collectors.joining(""));
            System.out.println(output);
        }

    }
}