# import sys
# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 1781번
# 컵라면

from queue import PriorityQueue

inputs = open('./python/input.txt',"rt").readlines()
output = 0

N = 0

cupNoodle = PriorityQueue()
maxCount = PriorityQueue()

for inputNode in list(inputs) :
  if(N == 0) :
    N = int(inputNode.strip())
    dp = [0] * N
  else:
    inputLine = inputNode.strip().split(' ')
    cupNoodle.put((int(inputLine[0]), int(inputLine[1])))

while cupNoodle.qsize() > 0 :
  top = cupNoodle.get()
  if(top[0] > maxCount.qsize()) :
    maxCount.put(top[1])
  else :
    minValue = maxCount.get()
    minValue = top[1] if top[1] > minValue else minValue
    maxCount.put(minValue)

while maxCount.qsize() > 0 :
  value = maxCount.get()
  output = output + value

print(output)