# Generated by Django 2.2.5 on 2020-03-09 09:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stst', '0002_usernumbers_count'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='usernumbers',
            options={'ordering': ['-count'], 'verbose_name': 'Кто к кому заходил', 'verbose_name_plural': 'Кто к кому заходил'},
        ),
    ]
