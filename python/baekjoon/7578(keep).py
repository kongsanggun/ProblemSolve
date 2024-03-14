# import sys
# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 7578번
# 공장
# 세그먼트 트리

inputs = open('./python/input.txt',"rt").readlines()
output = 0
N = int(inputs[0].strip())

machineSet = {}
machineList = [''] * N

machineNo = 0
for fromName in inputs[1].strip().split(' ') :
  machineSet[fromName] = [machineNo]
  machineNo = machineNo + 1

machineNo = 0
for toName in inputs[2].strip().split(' ') :
  machineSet[toName].append(machineNo)
  machineNo = machineNo + 1

for setNode in machineSet.values() :
  machineList[int(setNode[0])] = int(setNode[1])

# 세그먼트 트리를 활용하여 수 구하기
# 

print(machineList)