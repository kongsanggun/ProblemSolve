# import sys
# 백준 제출 시 : sys.stdin.readlines()
# 실행은 python 실행 (터미널)

# 1599번
# 민식어
# sort : a b k d e g h i l m n ng o p r s t u w y

inputs = open('./python/input.txt',"rt").readlines()
output = ""

N = int(inputs[0].strip())
wordlist = [] # 단어 / 우선순위 리스트

def setProperty(word) :
  result = ""
  wordcount = 0;

  while(wordcount < len(word)) :
    if(word[wordcount] >= 'o') :
      code = ord(word[wordcount])
      result = result + chr(code + 1)
    else :
      result = result + word[wordcount]
    wordcount = wordcount + 1

  result = result.replace('k', 'c')
  result = result.replace('ng', 'o')

  return result

for i in range(1 , N + 1) :
  word = (inputs[i].strip(), setProperty(inputs[i].strip()))
  wordlist.append(word)

wordlist.sort(key=lambda node: node[1])

for i in range(0 , N) :
  output += wordlist[i][0]
  if i < N - 1 :
    output += '\n'

print(output)