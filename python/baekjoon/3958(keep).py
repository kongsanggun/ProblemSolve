# import sys

# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 3958번
# 롤러코스터 타기

input = open("input.txt", "rt").readlines()
output = ""


def calFun(a, b, k):
  result = a - ((k - 1) * (k - 1) * b)
  if result > 0:
    return result
  return 0


N = int(input[0].strip())
rollerCoster = []  # 함수의 계수 a, 함수의 계수 b, 걸리는 시간
dp = [[0 for col in range(N + 1)] for row in range(25001)]

for index in range(1, N + 1):
  rollerCoster.append(input[index].strip().split(' '))

# DP를 이용하여 각 시간마다 최댓값 구하기

for time in range(0, 25001):
  maxFun = -1
  maxNumber = 0
  maxTime = 0

  for number in range(N):
    a = int(rollerCoster[number][0])
    b = int(rollerCoster[number][1])
    rollerTime = int(rollerCoster[number][2])
    if time >= rollerTime:
      k = dp[time - rollerTime][number + 1] + 1
      fun = calFun(a, b, k) + dp[time - rollerTime][0]
      if fun == max(maxFun, fun):
        maxFun = fun
        maxNumber = number
        maxTime = rollerTime

  if maxFun != -1:
    dp[time][0] = maxFun
    for number in range(N):
      dp[time][number + 1] = dp[time - maxTime][number + 1]
    dp[time][maxNumber + 1] = dp[time][maxNumber + 1] + 1

Q = int(input[N + 1].strip())

for index in range(N + 2, N + Q + 2):
  time = int(input[index].strip())
  output = output + str(
      dp[time][0]) + ' \n' if index < N + Q + 1 else output + str(dp[time][0])

if Q == 0:
  output = ''

print(output)