# Generated by Django 4.0.3 on 2023-06-10 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0009_automobilevo_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='year',
            field=models.PositiveSmallIntegerField(default='unknown'),
        ),
    ]
