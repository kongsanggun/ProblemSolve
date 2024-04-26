import java.io.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.Map.Entry;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 23059번 : 리그 오브 레게노

public class P23059 {

  // 전역 클래스 및 변수
  static class Item {
    public String name;
    public int inCome;
    public List<String> outCome;
    public int depth;

    Item(String name) {
      this.name = name;
      this.inCome = 0;
      this.outCome = new ArrayList<String>();
      this.depth = 0;
    }
  }

  static Map<String, Item> itemMap = new HashMap<String, Item>();
  static List<Item> queue = new ArrayList<Item>();
  static List<String> output = new ArrayList<String>();

  static boolean pushCompareItem(Item compareA, Item compareB) {
    if (compareA.depth < compareB.depth) {
      return true;
    } else if (compareA.depth == compareB.depth && compareA.name.compareTo(compareB.name) < 0) {
      return true;
    }

    return false;
  }

  static void pushQueue(Item key) {
    int index = queue.size();

    queue.add(queue.size(), key);
    while (index > 0) {
      int parent = (int) Math.floor((index + 1) / 2) - 1;

      Item compareA = queue.get(index);
      Item compareB = queue.get(parent);

      if (pushCompareItem(compareA, compareB)) {
        queue.set(index, compareB);
        queue.set(parent, compareA);
        index = parent;
      } else {
        break;
      }
    }
  }

  static boolean popCompareItem(Item compareA, Item compareB) {
    if (compareA.depth > compareB.depth) {
      return true;
    } else if (compareA.depth == compareB.depth && compareB.name.compareTo(compareA.name) < 0) {
      return true;
    }

    return false;
  }

  static Item popQueue() {
    Item result = queue.get(0);
    
    queue.set(0, queue.get(queue.size() - 1));
    queue.set(queue.size() - 1, result);

    queue.remove(queue.size() - 1);

    int index = 0;
    while((index + 1) * 2 - 1 < queue.size()) {
      int left = (index + 1) * 2 - 1;
      int right = (index + 1) * 2;
      
      Item compareA = queue.get(index);
      Item compareB = queue.get(left);
      int next = left;

      if((index + 1) * 2 < queue.size() && popCompareItem(compareB, queue.get(right))) {
        compareB = queue.get(right);
        next = right;
      }

      if(popCompareItem(compareA, compareB)) {
        queue.set(index, compareB);
        queue.set(next, compareA);
        index = next;
      } else {
        break;
      }
    }

    return result;
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

    for (int index = 1; index <= N; index++) {
      String[] items = inputList[index].split(" ");

      String itemA = items[0];
      String itemB = items[1];

      if (!itemMap.containsKey(itemA)) {
        itemMap.put(itemA, new Item(itemA));
      }

      if (!itemMap.containsKey(itemB)) {
        itemMap.put(itemB, new Item(itemB));
      }

      Item ItemA = itemMap.get(itemA);
      Item ItemB = itemMap.get(itemB);

      ItemB.inCome += 1;
      ItemA.outCome.add(itemB);

      itemMap.put(itemA, ItemA);
      itemMap.put(itemB, ItemB);
    }

    for (Entry<String, Item> entry : itemMap.entrySet()) {
      if (entry.getValue().inCome == 0) {
        pushQueue(entry.getValue());
      }
    }

    while (queue.size() > 0) {
      Item top = popQueue();

      for (String next : top.outCome) {
        Item nextItem = itemMap.get(next);
        nextItem.inCome -= 1;
        itemMap.put(next, nextItem);

        if (nextItem.inCome == 0) {
          nextItem.depth = top.depth + 1;
          pushQueue(nextItem);
        }
      }

      output.add(top.name);
    }

    if (output.size() != itemMap.size()) {
      System.out.println(-1);
    } else {
      System.out.println(output.stream().collect(Collectors.joining("\n")));
    }

  }
}