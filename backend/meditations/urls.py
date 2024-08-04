from django.urls import path, include
from . import views
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'data', AllDataView)


urlpatterns = [
    path('home', views.main, name='main'),  
    path('api/', include(router.urls)),
]   
