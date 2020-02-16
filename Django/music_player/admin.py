from django.contrib import admin

# Register your models here.
from . import models

class MusicPlayData(admin.ModelAdmin):
    list_display = ['music_address']


admin.site.register(models.MusicData, MusicPlayData)