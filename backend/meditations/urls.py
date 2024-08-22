from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from . import views
from rest_framework import routers
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect


router = routers.DefaultRouter()
router.register(r'meditation', MeditationDataView)
router.register(r'affirmation', AffirmationDataView)
router.register(r'breathing', BreathingDataView)
router.register(r'test-questions', TestQuestionView)
router.register(r'data', AllDataView)
router.register(r'items', ItemDetailView, basename='item')


urlpatterns = [
    path('admin/', admin.site.urls),   
    path('', lambda request: redirect('/home', permanent=False)),
    path('home',views.main, name ='main'),
    path('allitems',views.main, name ='main'),
    path('test',views.main, name ='main'),
    path('log-in',views.main, name ='login'),
    path('account',views.main, name ='account'),
    path('activity',views.main, name ='activity'),
    path('onetype/<str:typename>',views.onetype_view, name ='onetype'),
    path('item/<int:itemid>',views.oneitem_view, name ='oneitem'),
    path('api/', include(router.urls)),
    path('api/register/', register_view, name='api_register'),
    path('api/login/', login_view, name='api_login'),
    path('api/user-activity-calendar', user_activity_calendar, name='api_user_activity_calendar'),
    path('api/user-activity-meditation', user_activity_meditation, name='api_user_activity_meditation'),
    path('api/user-activity-affirmation', user_activity_affirmation, name='api_user_activity_affirmation'),
    path('api/user-activity-breathing', user_activity_breathing, name='api_user_activity_breathing'),
    path('api/record-activity/', views.record_activity_view, name='api_record_activity'),
    path('api/update-user', update_user_view, name='api_update_user'),
    path('api/recommendations/<int:score>/', get_recommendations, name='recommendations'),


] 