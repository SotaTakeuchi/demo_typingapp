import random
CTRL_C = 3
word_list = ['apple','banana','dog','cat']
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
while True:
    word = random.choice(word_list)
    del_num = 1
    print(word)
    for ans in word:
        key = ord(getch())
        typ = '{0}'.format(chr(key))
        if key == CTRL_C:
            break
        elif typ == ans:
            print(word[del_num:])
            del_num += 1
        else:
            print('X')
            break
        
            

                