# Generated by Django 5.0.4 on 2024-05-08 15:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_project_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='owner',
        ),
    ]
