from django.urls import path

from . import views

app_name='typing_app'
urlpatterns=[
    path('', views.IndexViews.as_view(), name="index"),
    path('inquiry/', views.InquiryView.as_view(), name="inquiry"),   
]