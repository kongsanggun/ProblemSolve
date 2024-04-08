# import sys
import math

# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 2090번
# 조화평균

inputs = open('./python/input.txt',"rt").readlines()
output = ""

N = int(inputs[0].strip())
A = list(map(int, inputs[1].split()))

child = 0
parent = 1

for i in range(0 , N) :
  parent = math.lcm(parent, A[i])

for i in range(0 , N) :
  child += round(parent // A[i])

divice = math.gcd(parent, child)
parent = parent // divice
child = child // divice

print(str(parent)+'/'+str(child))