# Generated by Django 2.2.5 on 2019-10-29 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0003_auto_20191029_1116'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='community',
            name='title',
        ),
        migrations.AlterField(
            model_name='community',
            name='name',
            field=models.CharField(max_length=64, verbose_name='Заголовок'),
        ),
    ]
