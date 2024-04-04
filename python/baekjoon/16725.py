import math
# import sys

# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 16725번
# 다항 계수
# Generating Function

input = open('./python/input.txt',"rt").readlines()
output = 0

tmpInput = input[0].strip().split(' ')
n = int(tmpInput[0])
m = int(tmpInput[1])
k = int(tmpInput[2])

for i in range(0, math.floor(k / (n + 1)) + 1) :
  part = 0

  combTmp = m + k - 1 - (i * (n + 1))

  combA = math.comb(m, i) % 1000000009
  combB = math.comb(combTmp, m - 1) % 1000000009

  part = int(math.pow(-1, i)) * ((combA * combB) % 1000000009) 

  output = (output + part) % 1000000009

print(output)