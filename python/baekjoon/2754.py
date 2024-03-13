# import sys
# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 2754번
# 학점계산
#
# A+: 4.3, A0: 4.0, A-: 3.7
# B+: 3.3, B0: 3.0, B-: 2.7
# C+: 2.3, C0: 2.0, C-: 1.7
# D+: 1.3, D0: 1.0, D-: 0.7
# F: 0.0

from sys import stdin as s

s = open('./python/input.txt',"rt") 
score = s.readline().strip()
output = 0

match score:
    case "A+":
        output = 4.3
    case "A0":
        output = 4.0
    case "A-":
        output = 3.7
    case "B+":
        output = 3.3
    case "B0":
        output = 3.0
    case "B-":
        output = 2.7
    case "C+":
        output = 2.3
    case "C0":
        output = 2.0
    case "C-":
        output = 1.7
    case "D+":
        output = 1.3
    case "D0":
        output = 1.0
    case "D-":
        output = 0.7
    case "F":
        output = 0.0 

print(output)