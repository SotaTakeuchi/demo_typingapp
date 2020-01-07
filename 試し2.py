import random
import time
CTRL_C = 3
word_list = ['apple','banana','dog','cat']
count = len(word_list)
true = 0
false = 0
type_miss = ()
type_miss_list = []

try:
    from msvcrt import getch
except ImportError:
    def getch():
        import sys
        import tty
        import termios
        fd = sys.stdin.fileno()
        old = termios.tcgetattr(fd)
        try:
            tty.setraw(fd)
            return sys.stdin.read(1)
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old)

start = time.time()

while count > 0:
    word = random.choice(word_list)
    word_list.remove(word)
    del_num = 1
    count -= 1
    print(word)
    for ans in word:
        key = ord(getch())
        typ = '{0}'.format(chr(key))
        if key == CTRL_C:
            break
        elif typ == ans:
            print(word[del_num:])
            del_num += 1
            true += 1
        else:
            print('False')
            print(word[del_num:])
            del_num += 1
            false += 1
            type_miss = ans+'→'+typ
            type_miss_list.append(type_miss)
            

stop = time.time()
result = stop - start
print('O=',true,'X=',false,'Time=',round(result,2))
print('Typemiss=',type_miss_list)
        
            

                