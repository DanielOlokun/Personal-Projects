from django.urls import path, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from pizzaApp import views
from pizzaApp.views import previous_orders, RegisterForm
from . import views
from .views import make_pizza, pizza_summary


urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='index.html'), name='login'),
    path('register/', views.register_view, name='register'),
    path('previous-orders/', previous_orders, name='previous-orders'),
    path('make_pizza/', views.make_pizza, name='make_pizza'),
    path('', views.index, name='index'),
    path('payment/', views.process_payment, name='payment'),
    path('pizza_summary/', pizza_summary, name='pizza_summary'),
]
