# Generated by Django 5.0.4 on 2024-04-19 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='confirm_password',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='contact',
            field=models.CharField(default='', max_length=255),
        ),
    ]
