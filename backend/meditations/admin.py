from django.contrib import admin
from django.contrib.auth.models import User
from django.db.models import Count
from .models import Data, TestQuestion, UserActivity

@admin.register(Data)
class DataAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type', 'video_id', 'test_result', 'info')
    list_display_links = ('id', 'name')

@admin.register(TestQuestion)
class TestQuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'question_text', 
                    'answer_choice_1', 'answer_choice_1_points',
                    'answer_choice_2', 'answer_choice_2_points',
                    'answer_choice_3', 'answer_choice_3_points',
                    'answer_choice_4', 'answer_choice_4_points')
    list_display_links = ('id', 'question_text')

@admin.register(UserActivity)
class UserActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_count')
    #list_display_links = ('user',)

    def get_queryset(self, request):
        queryset = User.objects.annotate(activity_count=Count('useractivity'))
        return queryset

    def activity_count(self, obj):
        return obj.activity_count
    activity_count.short_description = 'Activity Count'

    def user(self, obj):
        return obj.username
    user.short_description = 'User'
