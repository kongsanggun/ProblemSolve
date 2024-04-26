import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 1045번 : 도로
// Kruskal MST 알고리즘을 이용한다.

public class P1045 {

  // 전역 클래스 및 변수

  static class Pair implements Comparable<Pair> {
    public int first;
    public int second;

    Pair(int first, int second) {
      this.first = first;
      this.second = second;
    }

    @Override
    public int compareTo(Pair pair) {
      if (this.first == pair.first) {
        return this.second - pair.second;
      } else {
        return this.first - pair.first;
      }
    }

  }

  static List<Pair> road = new ArrayList<Pair>();
  static List<Pair> tmpRoad = new ArrayList<Pair>();
  static int[] output;
  static int[] isContain;
  static int count = 0;

  // 입력 가져오기
  public static String[] getInput() throws Exception {
    List<String> input = new ArrayList<String>();
    File note = new File("src/main/java/input.txt");
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

    String[] firstInputList = inputList[0].split(" ");
    int N = Integer.parseInt(firstInputList[0]);
    int M = Integer.parseInt(firstInputList[1]); // 얻어야 할 간선의 갯수

    output = new int[N];
    for (int item : output) {
      item = 0;
    }

    isContain = new int[N];
    for (int item : isContain) {
      item = 0;
    }

    for (int row = 1; row <= N; row++) {
      String[] roadInputList = inputList[row].split("");
      for (int col = row; col < N; col++) {
        String roadInput = roadInputList[col];
        if (roadInput.equals("Y")) {
          Pair inputPair = new Pair(row - 1, col);
          road.add(inputPair);
        }
      }
    }

    while (road.size() > 0) {
      Pair top = road.remove(0);

      if (isContain[top.first] != isContain[top.second]) {
        int first = isContain[top.first];
        int second = isContain[top.second];
        
        for(int index = 0; index < N ; index++) {
          if(first != 0 && isContain[index] == first) {
            isContain[index] = count + 1;
          }
          else if(second != 0 && isContain[index] == second) {
            isContain[index] = count + 1;
          }
        }
            
        isContain[top.first] = count + 1;
        isContain[top.second] = count + 1;

        output[top.first] += 1;
        output[top.second] += 1;

        count += 1;
      } 
      else if (isContain[top.first] == 0 && isContain[top.second] == 0) {
        isContain[top.first] = count + 1;
        isContain[top.second] = count + 1;

        output[top.first] += 1;
        output[top.second] += 1;

        count += 1;
      }
      else {
        tmpRoad.add(top);
      }
    }

    if (count != N - 1) {
      System.out.println(-1);
    } else {
      
      while (tmpRoad.size() > 0 && count != M) {
        Pair top = tmpRoad.remove(0);

        output[top.first] += 1;
        output[top.second] += 1;

        count += 1;
      }

      if (count != M) {
        System.out.println(-1);
      } else {
        System.out.println(Arrays.stream(output)
            .mapToObj(String::valueOf)
            .collect(Collectors.joining(" ")));
      }

    }

  }
}