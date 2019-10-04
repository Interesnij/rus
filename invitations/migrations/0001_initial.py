# Generated by Django 2.2.5 on 2019-10-03 20:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('main', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInvite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Приглашение создано')),
                ('name', models.CharField(blank=True, max_length=35, null=True)),
                ('nickname', models.CharField(blank=True, max_length=35, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Емаил')),
                ('token', models.CharField(max_length=255, unique=True)),
                ('is_invite_email_sent', models.BooleanField(default=False)),
                ('badge', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.Badge')),
                ('created_user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Кто приглашает')),
                ('invited_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invited_users', to=settings.AUTH_USER_MODEL, verbose_name='Кого приглашает')),
            ],
        ),
    ]
