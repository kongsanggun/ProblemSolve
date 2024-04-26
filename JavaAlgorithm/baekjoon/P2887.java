import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 2887번 : 행성 터널

public class P2887 {

  // 전역 클래스 및 변수
  static class Star {
    public int name;
    public int x;
    public int y;
    public int z;

    Star(int name, int x, int y, int z) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  static class Tunnel {
    public int a;
    public int b;
    public int cost;

    Tunnel(int a, int b, int cost) {
      this.a = a;
      this.b = b;
      this.cost = cost;
    }
  }

  static class starXCompare implements Comparator<Star> {
    @Override
    public int compare(Star star1, Star star2) {
      return star1.x - star2.x;
    }
  }

  static class starYCompare implements Comparator<Star> {
    @Override
    public int compare(Star star1, Star star2) {
      return star1.y - star2.y;
    }
  }

  static class starZCompare implements Comparator<Star> {
    @Override
    public int compare(Star star1, Star star2) {
      return star1.z - star2.z;
    }
  }

  static class tunnelCompare implements Comparator<Tunnel> {
    @Override
    public int compare(Tunnel tunnel1, Tunnel tunnel2) {
      return tunnel2.cost - tunnel1.cost;
    }
  }

  static List<Star> stars = new ArrayList<Star>();
  static List<Tunnel> tunnels = new ArrayList<Tunnel>();

  static int count = 0;
  static int[] group;

  static long output = 0;

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

  public static int find(int x) {
    if (x == group[x]) {
      return x;
    } else
      return find(group[x]);
  }

  // union
  public static void union(int a, int b) {
    a = find(a);
    b = find(b);

    if (a > b) {
      group[a] = b;
    } else {
      group[b] = a;
    }
  }

  public static void main(String[] args) throws Exception {
    String[] inputList = getInput(); // 입력 가져오기

    int N = Integer.parseInt(inputList[0]);
    group = new int[N];

    for (int index = 1; index <= N; index++) {
      String[] starInputList = inputList[index].split(" ");

      Star starInput = new Star(
          index - 1,
          Integer.parseInt(starInputList[0]),
          Integer.parseInt(starInputList[1]),
          Integer.parseInt(starInputList[2]));

      stars.add(starInput);
      group[index - 1] = index - 1;
    }

    // 1. 간선 후보 추리기
    Collections.sort(stars, new starXCompare());

    for (int index = 1; index < stars.size(); index++) {
      Star a = stars.get(index - 1);
      Star b = stars.get(index);

      int cost = Math.min(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
      cost = Math.min(cost, Math.abs(a.z - b.z));

      Tunnel tunnelInput = new Tunnel(a.name, b.name, cost);
      tunnels.add(tunnelInput);
    }

    Collections.sort(stars, new starYCompare());

    for (int index = 1; index < stars.size(); index++) {
      Star a = stars.get(index - 1);
      Star b = stars.get(index);

      int cost = Math.min(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
      cost = Math.min(cost, Math.abs(a.z - b.z));

      Tunnel tunnelInput = new Tunnel(a.name, b.name, cost);
      tunnels.add(tunnelInput);
    }

    Collections.sort(stars, new starZCompare());

    for (int index = 1; index < stars.size(); index++) {
      Star a = stars.get(index - 1);
      Star b = stars.get(index);

      int cost = Math.min(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
      cost = Math.min(cost, Math.abs(a.z - b.z));

      Tunnel tunnelInput = new Tunnel(a.name, b.name, cost);
      tunnels.add(tunnelInput);
    }

    // 2. 최소 스패닝 크리 이용하기 (Kernel??)
    Collections.sort(tunnels, new tunnelCompare());

    while (tunnels.size() > 0 && count < N - 1) {
      Tunnel top = tunnels.remove(tunnels.size() - 1);

      // System.out.println(top.a + " - " + top.b + " : " + top.cost);
      if (find(top.a) != find(top.b)) {
        // union 사용
        union(top.a, top.b);

        output += top.cost;
        count += 1;

        // System.out.println(count + " : " + output);
      }
    }

    System.out.println(output);
  }
}