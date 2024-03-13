# import sys
# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 19583번
# 싸이버개강총회

inputs = open('./python/input.txt',"rt").readlines()
output = 0

S = -1 # 시작 시간 
E = -1 # 종료 시간
Q = -1 # 스트리밍 종료 시간

attendList = {} # 참여 리스트

def timeConverter(x) :
  return int(x.replace(':', ''))

def checkAttend(name, time) :
  isAttendBfStart = time <= S
  isGoneAfEnd = time >= E and time <= Q

  if isAttendBfStart :
    attendList[name] = False
  elif (isGoneAfEnd and attendList.get(name) != None):
    if(attendList[name] == False) :
        attendList[name] = True
        return 1
  
  return 0

for inputNode in list(inputs) :
  inputLine = inputNode.strip().split(' ')
  if S == -1 and E == -1 and Q == -1 :
    inputMap = list(map(timeConverter, inputLine))
    S = inputMap[0]
    E = inputMap[1]
    Q = inputMap[2]
  else :
    output = output + checkAttend(inputLine[1], timeConverter(inputLine[0]))

print(output)