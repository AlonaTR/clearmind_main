from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import DataSerializer, TestQuestionSerializer
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Count, Case, When, IntegerField
from datetime import datetime, timedelta


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        fields = UserCreationForm.Meta.fields + ('email',)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = CustomUserCreationForm(data)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({'status': 'success', 'user': {'id': user.id, 'username': user.username, 'email': user.email}})
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success', 'user': {'id': user.id, 'username': user.username, 'email': user.email}})  
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})


from django.contrib.auth import authenticate

@csrf_exempt
def update_user_view(request):
    if request.method == 'POST' and request.user.is_authenticated:
        data = json.loads(request.body)
        
        user = request.user
        
        current_password = data.get('currentPassword')
        new_password = data.get('newPassword')
        
        #if not user.check_password(current_password):
        #    return JsonResponse({'status': 'error', 'message': 'Current password is incorrect'}, status=400)
        
        username = data.get('username')
        email = data.get('email')
        
        user.username = username
        user.email = email
        
        if new_password:
            user.set_password(new_password)
        
        user.save()

        user = authenticate(username=username, password=new_password if new_password else current_password)
        if user is not None:
            login(request, user)
        
        return JsonResponse({'status': 'success', 'message': 'User updated successfully.'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

    
def user_activity_meditation(request):
    user_activities = UserActivity.objects.filter(user=request.user, name__type=Data.MEDITATION)
    if not user_activities.exists():
        return JsonResponse([{'type': Data.MEDITATION, 'count': 0}], safe=False)
    else:
        activities_grouped_by_type = user_activities.values('name__type').annotate(
            count=Count('name__type')
        )
        activity_data = list(activities_grouped_by_type)
        return JsonResponse(activity_data, safe=False)


def user_activity_affirmation(request):
    user_activities = UserActivity.objects.filter(user=request.user, type=UserActivity.AFFIRMATION)
    if not user_activities.exists():
        return JsonResponse([{'type': UserActivity.AFFIRMATION, 'count': 0}], safe=False)
    else:
        activities_grouped_by_type = user_activities.values('type').annotate(
            count=Count('type')
        )
        activity_data = list(activities_grouped_by_type)
        return JsonResponse(activity_data, safe=False)


def user_activity_breathing(request):
    user_activities = UserActivity.objects.filter(user=request.user, type=UserActivity.BREATHING)
    if not user_activities.exists():
        return JsonResponse([{'type': UserActivity.BREATHING, 'count': 0}], safe=False)
    else:
        activities_grouped_by_type = user_activities.values('type').annotate(
            count=Count('type')
        )
        activity_data = list(activities_grouped_by_type)
        return JsonResponse(activity_data, safe=False)


def user_activity_calendar(request):
    user = request.user
    if user.is_authenticated:
        # Calculate date one year before today
        today = datetime.now().date()
        one_year_ago = today - timedelta(days=365)
        
        # Get user activities within the last year
        user_activities = UserActivity.objects.filter(user=user, date__range=[one_year_ago, today])

        # Group activities by date and annotate with count and level
        activities_grouped_by_date = user_activities.values('date').annotate(
            count=Count('date'),
            level=Case(
                When(count=1, then=1),
                When(count__range=(2, 3), then=2),
                When(count__gte=4, then=3),
                default=0,
                output_field=IntegerField(),
            )
        )

        # Serialize the activity data
        activity_data = list(activities_grouped_by_date.values('date', 'count', 'level'))


        # Check if the first date of the period exists in the activity data
        first_date_period = one_year_ago.strftime('%Y-%m-%d')
        if not any(activity['date'] == first_date_period for activity in activity_data):
            # If the first date doesn't exist, append it with count and level as 0
            activity_data.insert(0,{'date': datetime.strptime(first_date_period, '%Y-%m-%d').date(), 'count': 0, 'level': 0})

        return JsonResponse(activity_data, safe=False)

    return JsonResponse({'status': 'error', 'message': 'User is not authenticated'}, status=401)


@csrf_exempt
def record_activity_view(request):
    if request.method == 'POST':
        user = request.user
        if user.is_authenticated:
            data = json.loads(request.body)
            date = data.get('date')
            name = data.get('name')
            
            # Check if a similar record already exists
            if not UserActivity.objects.filter(user=user, date=date, name=name).exists():
                UserActivity.objects.create(user=user, date=date, name=name)
                return JsonResponse({'status': 'success'}, status=201)
        return JsonResponse({'status': 'error', 'message': 'User is not authenticated'}, status=401)

class ItemDetailView(viewsets.ReadOnlyModelViewSet):
    queryset = Data.objects.all()
    serializer_class = DataSerializer

    def get_object(self):
        item_id = self.kwargs.get('pk')
        return Data.objects.get(id=item_id)


class MeditationDataView(viewsets.ModelViewSet):
    queryset = Data.objects.filter(type=Data.MEDITATION)  
    serializer_class = DataSerializer

class AffirmationDataView(viewsets.ModelViewSet):
    queryset = Data.objects.filter(type=Data.AFFIRMATION)  
    serializer_class = DataSerializer

class BreathingDataView(viewsets.ModelViewSet):
    queryset = Data.objects.filter(type=Data.BREATHING)  
    serializer_class = DataSerializer

class AllDataView(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = DataSerializer


class TestQuestionView(viewsets.ReadOnlyModelViewSet):
    queryset = TestQuestion.objects.all()
    serializer_class = TestQuestionSerializer

def main(request):
    return render(request, 'index.html')

def onetype_view(request, typename):
    #data_objects = Data.objects.filter(type=Data.MEDITATION)
    return render(request, 'index.html')

def oneitem_view(request, itemid):
    return render(request, 'index.html')


@api_view(['GET'])
def get_recommendations(request, score):
    # Adjusting the range [score-1, score+1]
    queryset = Data.objects.filter(test_result__gte=score-1, test_result__lte=score+1)[:2]
    serializer = DataSerializer(queryset, many=True)
    return Response(serializer.data)