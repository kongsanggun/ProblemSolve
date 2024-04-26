import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 17352번 : 여러분의 다리가 되어 드리겠습니다!

public class P17352 {

  // 전역 클래스 및 변수
  static int output = 0;
  static int[] unionSet;
  static int[] unionSetRank;
  
  public static int find(int x) {
    if(unionSet[x] == x) {
      return x;
    }
    return find(unionSet[x]);
  }

  public static void union(int a, int b) {
    a = find(unionSet[a]);
    b = find(unionSet[b]);

    if(unionSetRank[a] > unionSetRank[b]) {
      unionSet[b] = a;
    } else if(unionSetRank[a] < unionSetRank[b]) {
      unionSet[a] = b;
    } else {
      unionSet[b] = a;
      unionSetRank[a] += 1;
    }
  }

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

    int N = Integer.parseInt(inputList[0]);
    unionSet = new int[N + 1];
    unionSetRank = new int[N + 1];
    
    for (int index = 1; index < N + 1; index++) {
      unionSet[index] = index;
      unionSetRank[index] = 0;
    }

    for (int index = 1; index <= N - 2; index++) {
      String[] bridgeList = inputList[index].split(" ");
      int a = Integer.parseInt(bridgeList[0]);
      int b = Integer.parseInt(bridgeList[1]);

      union(a, b);
    }

    for (int index = 2; index <= N; index++) {
      if (find(1) != find(index)) {
        System.out.println(1 + " " + index);
        break;
      }
    }
  }
}