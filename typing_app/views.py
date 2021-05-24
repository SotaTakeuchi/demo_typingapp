from django.views import generic
from .forms import InquiryForm
from django.shortcuts import render


# Create your views here.
class IndexViews(generic.TemplateView):
    template_name='index.html'

class InquiryView(generic.FormView): #ここではデ\\ータベースを使用する機会がないのでFormViewクラスを継承
    template_name="inquiry.html"
    form_class=InquiryForm

def Typing(request):
    return render(request, 'typing_app/Typing.html')








