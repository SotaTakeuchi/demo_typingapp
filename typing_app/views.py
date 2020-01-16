from django.views import generic
from .forms import InquiryForm

# Create your views here.
class IndexViews(generic.TemplateView):
    template_name='index.html'

class InquiryView(generic.FormView): #ここではデータベースを使用する機会がないのでFormViewクラスを継承
    template_name="inquiry.html"
    form_class=InquiryForm

'''import random
import time
CTRL_C = 3
space = 32

word_list = ['dog','cat','pet']

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

print('plase push Space_key')
start_key = ord(getch())
if start_key == space:

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
                print('x')
                print(word[del_num:])
                del_num += 1
                false += 1
                type_miss = ans+'→'+typ
                type_miss_list.append(word)
                type_miss_list.append(type_miss)
            
    stop = time.time()


    result = stop - start
    print('O=',true,'X=',false,'Time=',round(result,2))
    print('Typemiss=',type_miss_list)

else:
    None'''