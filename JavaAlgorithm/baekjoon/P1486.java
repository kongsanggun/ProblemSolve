package JavaAlgorithm.baekjoon;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

// 백준 제출용 : BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
// 로컬용 : File note = new File("src/main/java/input.txt");
//         BufferedReader br = new BufferedReader(new FileReader(note));

// 1406번 : 에디터

public class P1486 {
    // 전역 클래스 및 변수
    public static List<String> leftPointer = new ArrayList<>();
    public static List<String> rightPointer = new ArrayList<>();

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
    public static void P1486(String[] args) throws Exception {
        String[] inputList = getInput(); // 입력 가져오기
        String output = "";

        for(String c : inputList[0].split("")) {
            leftPointer.add(c);
        }

        int M = Integer.parseInt(inputList[1]);
        for(int index = 0; index < M; index++) {
            String[] command = inputList[index + 2].split(" ");

            switch (command[0]) {
                case "L":
                    if(leftPointer.size() > 0) {
                        String tmp = leftPointer.remove(leftPointer.size() - 1);
                        rightPointer.add(tmp);
                    }
                    break;
                case "D":
                    if(rightPointer.size() > 0) {
                        String tmp = rightPointer.remove(rightPointer.size() - 1);
                        leftPointer.add(tmp);
                    }
                    break;
                case "B":
                    if(leftPointer.size() > 0) {
                        leftPointer.remove(leftPointer.size() - 1);
                    }
                    break;
                case "P":
                    String input = command[1];
                    leftPointer.add(input);
                    break;
            }
        }

        output = leftPointer.stream().collect(Collectors.joining(""));
        while(rightPointer.size() > 0) {
            output += rightPointer.remove(rightPointer.size() - 1);
        }
        System.out.println(output);
    }
}
