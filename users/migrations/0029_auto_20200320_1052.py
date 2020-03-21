# Generated by Django 2.2.5 on 2020-03-20 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0028_auto_20200320_0934'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_phone_accepted',
        ),
        migrations.AddField(
            model_name='user',
            name='is_phone_verified',
            field=models.BooleanField(default=False, verbose_name='Телефон подтвержден'),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_email_verified',
            field=models.BooleanField(default=False, verbose_name='Почта подтверждена'),
        ),
    ]
