from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from .serializers import DataSerializer

def main(request):
    return render(request, 'index.html')

class AllDataView(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
