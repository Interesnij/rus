# Generated by Django 2.2.5 on 2020-03-08 12:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0006_goodcommentvotes_goodvotes_photocommentvotes_photovotes'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ProxyBlacklistedDomain',
        ),
    ]
