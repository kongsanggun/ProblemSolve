#import sys
import math

# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 7578번
# 공장
# 세그먼트 트리
# inversion Counting 활용

inputs = sys.stdin.readlines()
output = 0
N = int(inputs[0].strip())
hight = math.floor(math.log(N, 2))

tree = []

def updateData(index, start, end, target):
  if target < start or target > end :
    return 0
  
  if start == end:
    tree[index] = 1
    return tree[index]
  
  mid = (start + end) // 2
  updateData(index * 2, start, mid, target)
  updateData(index * 2 + 1, mid + 1, end, target)
  tree[index] = tree[index * 2] + tree[index * 2 + 1]
  return tree[index]

def getSumData(index, start, end, left, right):
  if right < start or left > end:
    return 0
  if left <= start and right >= end:
    return tree[index]
  mid = (start + end) // 2
  return getSumData(index * 2, start, mid, left, right) + getSumData(
      index * 2 + 1, mid + 1, end, left, right)

# B열 기계 배치도 간략화하기
def getList(A, B):
  result = [''] * N
  set = {}
  for index in range(0, N):
    key = A[index]
    set[key] = index
  for index in range(0, N):
    key = B[index]
    value = set[key]
    result[value] = index
  return result

list = getList(inputs[1].strip().split(' '), inputs[2].strip().split(' '))
treeSize = N * 4
tree = [0] * treeSize

# 세그먼트 트리를 활용하여 inversion Counting 구하기
for index in range(0, N):
  node = list[index]
  # 부분합 구하기
  output = output + getSumData(1, 0, N - 1, node + 1, N - 1)
  # 값 구하기
  updateData(1, 0, N - 1, node)

print(output)