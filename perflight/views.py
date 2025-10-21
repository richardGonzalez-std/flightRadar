from django.shortcuts import render
import django.forms as forms
from django.http import JsonResponse
import requests
import os
import json

# Create your views here.
def home(request):
    form = forms.Form()

    form.base_fields['flight_number'] = forms.CharField(label='Flight Number', max_length=10)

    return render(request, 'perflight/home.html', context={'form':form})

def handle(request):
    if request.method == 'POST':
        url = 'https://flightradar24-data.p.rapidapi.com/flights/flight-info'
        flight = request.POST.get('flight_number')
        header = {
	"x-rapidapi-key": "00e456644fmsh9d26fcccadd34c2p195efcjsnc61a43b08238",
	"x-rapidapi-host": "flightradar24-data.p.rapidapi.com"
}
        queryString = {"query":f"{flight}"}
        response = requests.get(url,headers=header,params=queryString)
        print(response.json())
    return JsonResponse({"sucess":True, "data":response.json()})