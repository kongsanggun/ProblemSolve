# import sys
# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 13140번
# Hello World!

input = open('./python/input.txt',"rt").readlines()
output = ""

def soultion(N) :
   result = "No Answer"
   for hello in range(1000, 10000) :
      for world in range(100, 1000) :
         set = {}
         h = (hello // 1000) % 10
         e = (hello // 100) % 10
         l = (hello // 10) % 10
         o = hello % 10

         w = (world // 100) % 10
         r = (world // 10) % 10
         d = world % 10

         set[h] = True
         set[e] = True
         set[l] = True
         set[o] = True
         set[w] = True
         set[r] = True
         set[d] = True

         a = h * 10000 + e * 1000 + l * 100 + l * 10 + o
         b = w * 10000 + o * 1000 + r * 100 + l * 10 + d
         if a + b == N and len(set) == 7:
               count = 7 - len(str(N))
               return "  " + str(a) + "\n+ " + str(b) + "\n-------\n" + (" ") * count + str(N)
   return result

N = int(input[0].strip())
print(soultion(N))