# Generated by Django 2.2.5 on 2020-03-08 18:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_auto_20200308_1656'),
    ]

    operations = [
        migrations.RenameField(
            model_name='oneuserlocation',
            old_name='sity_en',
            new_name='city_en',
        ),
        migrations.RenameField(
            model_name='oneuserlocation',
            old_name='sity_ru',
            new_name='city_ru',
        ),
        migrations.RenameField(
            model_name='threeuserlocation',
            old_name='sity_en',
            new_name='city_en',
        ),
        migrations.RenameField(
            model_name='threeuserlocation',
            old_name='sity_ru',
            new_name='city_ru',
        ),
        migrations.RenameField(
            model_name='twouserlocation',
            old_name='sity_en',
            new_name='city_en',
        ),
        migrations.RenameField(
            model_name='twouserlocation',
            old_name='sity_ru',
            new_name='city_ru',
        ),
    ]
