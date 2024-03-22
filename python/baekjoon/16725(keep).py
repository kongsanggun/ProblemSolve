# import sys
from collections import deque

# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 16725번
# 다항 계수

input = open('./python/input.txt',"rt").readlines()
output = 0

tmpInput = input[0].strip().split(' ')
n = int(tmpInput[0])
m = int(tmpInput[1])
k = int(tmpInput[2])

dp = deque([[]])

# m = 1
for i in range(n + 1):
  dp[0].append(1)

# m in 2 to m
for row in range(1, m) :
  result = []

  size = (row + 1) * n + 1
  mid = int(round((size - 1) / 2))

  result.append(1)
  value = 1

  for col in range(1, n + 1) :
    value = (value + dp[0][col]) % 1000000009
    result.append(value)
  
  for col in range(n + 1, mid + 1) :
    value = (value + dp[0][col] - dp[0][col - n - 1]) % 1000000009
    result.append(value)
  
  if size % 2 == 0 :
    result.append(value)

  for colTmp in range(mid + 1, size) :
    col = mid - abs(mid - colTmp)
    if col >= 0 :
      value = result[col]
      result.append(value)

  dp.append(result)
  dp.popleft()

print(dp[0][k])