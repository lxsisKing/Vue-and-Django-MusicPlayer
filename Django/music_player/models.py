from django.db import models


# Create your models here.

class MusicData(models.Model):
    music_name = models.CharField(max_length=128, verbose_name='音乐名字', unique=True)
    music_address = models.CharField(max_length=128, verbose_name='音乐地址', unique=True)
    music_img_address = models.CharField(max_length=128, verbose_name='专辑图片')

    def __str__(self):
        return self.music_address

    class Meta:
        db_table = 'MusicData'  # 定义表名
        verbose_name = '音乐数据'
