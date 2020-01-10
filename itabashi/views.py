from django.shortcuts import render
#from itabashi.models import ()

# Create your views here.
def start(request):
    """トップ画面"""
    return render(request,'template\typies/start.html')