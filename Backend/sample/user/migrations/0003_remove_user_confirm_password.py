# Generated by Django 5.0.4 on 2024-04-29 06:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_confirm_password_user_contact'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='confirm_password',
        ),
    ]
