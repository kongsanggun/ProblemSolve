# import sys
from collections import deque

# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 27924번
# 윤이는 엄청난 것을 훔쳐갔습니다

input = open('./python/input.txt',"rt").readlines()
output = "NO"

N = int(input[0].strip())
roadA = [-1 for i in range(N + 1)]
roadB = [-1 for i in range(N + 1)]
roadC = [-1 for i in range(N + 1)]

# 그래프 선언
town = []
for i in range(N + 1):
    town.append([])

# 그래프 간선 초기화
for index in range(1, N) :
  node = input[index].strip().split(' ')
  town[int(node[0])].append(int(node[1]))
  town[int(node[1])].append(int(node[0]))

start = input[N].strip().split(' ')
a = int(start[0])       # 윤이
b = int(start[1])       # 달구 
c = int(start[2])       # 포닉스

# 달구 이동 시간 구하기
roadB[b] = 0
queue = deque([b])
while len(queue) > 0 :
   top = queue.popleft()
   for next in town[top] :
      if roadB[next] == -1 :
         queue.append(next)
         roadB[next] = roadB[top] + 1

# 포닉스 이동 시간 구하기
roadC[c] = 0
queue = deque([c])
while len(queue) > 0 :
   top = queue.popleft()
   for next in town[top] :
      if roadC[next] == -1 :
         queue.append(next)
         roadC[next] = roadC[top] + 1

roadA[a] = 0
queue = deque([a])
while len(queue) > 0 :
   top = queue.popleft()
   if len(town[top]) == 1:
      output = "YES"
      queue.clear()
   else :
    for next in town[top] :
       if roadA[next] == -1 :
          roadA[next] = roadA[top] + 1
          if(roadB[next] != roadA[next] and roadC[next] != roadA[next]) :
             if(roadB[next] + 1 != roadA[next] and roadC[next] + 1 != roadA[next]) :
                queue.append(next)

print(output)

