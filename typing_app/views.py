from django.views import generic
from .forms import InquiryForm

# Create your views here.
class IndexViews(generic.TemplateView):
    template_name='index.html'

class InquiryView(generic.FormView): #ここではデータベースを使用する機会がないのでFormViewクラスを継承
    template_name="inquiry.html"
    form_class=InquiryForm

