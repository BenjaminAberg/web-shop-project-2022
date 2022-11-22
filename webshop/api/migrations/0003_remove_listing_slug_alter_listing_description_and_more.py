# Generated by Django 4.1.3 on 2022-11-22 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_listing_delete_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listing',
            name='slug',
        ),
        migrations.AlterField(
            model_name='listing',
            name='description',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='listing',
            name='price',
            field=models.DecimalField(decimal_places=1, max_digits=6),
        ),
    ]
