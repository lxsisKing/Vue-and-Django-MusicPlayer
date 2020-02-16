from django.shortcuts import render
from django.http import JsonResponse
from . import models


# Create your views here.

def get_music_data(request):
    music_name = models.MusicData.objects.values('music_name')
    music_data = {}

    # one_music_data = []
    # for i in range(len(music_name)):
    #     name = music_name[i]['music_name']
    for name in music_name:
        name = name['music_name']
        one_data = list(models.MusicData.objects.values().filter(music_name__exact=name))
        music_data[one_data[0]['id']] = one_data

        # for data in one_data:
        #     one_music_data.append(data['music_address'])
        #     one_music_data.append(data['music_name'])
        #     one_music_data.append(data['music_img_address'])
        #     music_data[name] = one_music_data

    # music_data['music_address'] = music_address
    # music_data['music_name'] = music_name
    # music_data['music_img_address'] = music_img_address
    # music_address = {
    #     'music_address': music_address
    # }
    return JsonResponse(music_data)
