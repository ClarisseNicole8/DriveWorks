# Generated by Django 4.0.3 on 2023-06-08 00:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_remove_appointment_date_time_appointment_canceled_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='canceled',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='finished',
        ),
    ]
