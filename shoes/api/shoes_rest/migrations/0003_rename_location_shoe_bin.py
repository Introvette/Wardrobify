# Generated by Django 4.0.3 on 2022-10-20 15:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0002_shoe_picture_url_alter_shoe_color'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shoe',
            old_name='location',
            new_name='bin',
        ),
    ]
