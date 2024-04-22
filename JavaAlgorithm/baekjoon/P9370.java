import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 9370번 : 미확인 도착지

public class P9370 {
    // 전역 클래스

    static class Pair {
        int first;
        int second;
    }

    static class Road {
        int value;
        String path;
        List<Pair> roadList;
        boolean isVisited;

        Road() {
            this.value = 987654321;
            this.path = "";
            this.roadList = new ArrayList<Pair>();
            this.isVisited = false;
        }
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

    public static void P9370(String[] args) throws Exception {
        String[] inputList = getInput(); // 입력 가져오기

        int T = Integer.parseInt(inputList[0]);
        int inputLine = 1;

        for (int test = 0; test < T; test++) {
            String[] firstList = inputList[inputLine].split(" ");
            String[] secondList = inputList[inputLine + 1].split(" ");

            List<Integer> outputLine = new ArrayList<Integer>();

            int n = Integer.parseInt(firstList[0]); // 교차로
            int m = Integer.parseInt(firstList[1]); // 도로
            int t = Integer.parseInt(firstList[2]); // 후보지 갯수

            Road[] road = new Road[n];
            for(int i = 0; i < n; i++) {
                road[i] = new Road();
            }

            int[] targetList = new int[t];

            int s = Integer.parseInt(secondList[0]) - 1; // 출발지
            String g = String.valueOf(Integer.parseInt(secondList[1]) - 1); // 발견한 교차로 1
            String h = String.valueOf(Integer.parseInt(secondList[2]) - 1); // 발견한 교차로 2

            // 도로의 정보
            for (int index = 0; index < m; index++) {
                String[] roadList = inputList[inputLine + 2 + index].split(" ");

                int a = Integer.parseInt(roadList[0]); //
                int b = Integer.parseInt(roadList[1]); //
                int d = Integer.parseInt(roadList[2]); // 거리

                Pair aPair = new Pair();
                aPair.first = b - 1;
                aPair.second = d;
                road[a - 1].roadList.add(aPair);

                Pair bPair = new Pair();
                bPair.first = a - 1;
                bPair.second = d;
                road[b - 1].roadList.add(bPair);
            }

            // 후보지
            for (int index = 0; index < t; index++) {
                int x = Integer.parseInt(inputList[inputLine + 2 + m + index]);
                targetList[index] = x - 1;
            }

            // 다익스트라를 활용한다.
            road[s].isVisited = true;
            road[s].value = 0;
            road[s].path = String.valueOf(s);

            for (int i = 0; i < n - 1; i++) {
                int minIndex = -1;
                int minValue = 1234567890;

                //System.out.println(s);
                //System.out.println(road[s].path);
                //System.out.println("-----");

                for (int index = 0; index < road[s].roadList.size(); index++) {
                    Pair target = road[s].roadList.get(index);
                    int newValue = road[s].value + target.second;

                    if (!road[target.first].isVisited && road[target.first].value > newValue) {
                        road[target.first].value = newValue;
                        road[target.first].path = road[s].path + String.valueOf(target.first);
                    } else if (!road[target.first].isVisited && road[target.first].value == newValue) {
                        if(!road[target.first].path.contains(h + g) && !road[target.first].path.contains(g + h)) {
                            road[target.first].path = road[s].path + String.valueOf(target.first);
                        }
                    }
                }

                for (int index = 0; index < n; index++) {
                    if(minValue > road[index].value && !road[index].isVisited) {
                        minIndex = index;
                        minValue = road[index].value;
                    }
                }

                s = minIndex;
                road[s].isVisited = true;
            }

            // 목표 확인
            for (int i = 0; i < t; i++) {
                int targetIndex = targetList[i];
                String target = road[targetIndex].path;

                //System.out.println(target);

                if(target.contains(h + g) || target.contains(g + h)) {
                    outputLine.add(targetIndex + 1);
                }
            }

            Collectors Collectors = null;
            Collections.sort(outputLine);
            String listString = outputLine.stream().map(Object::toString).collect(Collectors.joining(" "));
            System.out.println(listString);

            inputLine += m + t + 2;
        }

    }
}