# Generated by Django 2.2.5 on 2020-03-19 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0025_auto_20200319_2144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(max_length=40, unique=True),
        ),
    ]
