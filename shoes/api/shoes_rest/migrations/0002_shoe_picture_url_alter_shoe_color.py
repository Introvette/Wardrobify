# Generated by Django 4.0.3 on 2022-10-20 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='shoe',
            name='picture_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='shoe',
            name='color',
            field=models.CharField(max_length=200),
        ),
    ]
