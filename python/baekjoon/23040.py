# import sys

# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 23040번
# 누텔라 트리 (Easy)

class node :
  def __init__(self) :
    self.visited = False
    self.color = None
    self.edge = []

input = open('./python/input.txt',"rt").readlines()
output = 0

N = int(input[0].strip())

nutalla = [None]

def search(start) :
  topIndex = 0
  black = 0
  stack = [start]
  nutalla[start].visited = True

  while(len(stack) > topIndex) :
    top = stack[topIndex]
    topIndex = topIndex + 1

    for next in nutalla[top].edge :
      isNextNotBlack = (nutalla[next].color != 'B')
      isNotVisited = (nutalla[next].visited == False)
      if isNextNotBlack and isNotVisited :
          stack.append(next);
          nutalla[next].visited = True;
      elif not(isNextNotBlack) :
        black = black + 1

  return (black * len(stack))

for index in range(0, N):
  nutalla.append(node())

for index in range(1, N):
  edge = input[index].strip().split(' ');
  a = int(edge[0])
  b = int(edge[1])

  nutalla[a].edge.append(b);
  nutalla[b].edge.append(a);

c = input[N].strip()
for index in range(0, len(c)) :
  color = c[index];
  nutalla[index + 1].color = color

for index in range(1, N + 1) :
  isNotBlack = (nutalla[index].color != 'B')
  isNotVisited = (nutalla[index].visited == False)

  if isNotBlack and isNotVisited:
    output = output + search(index)

print(output)