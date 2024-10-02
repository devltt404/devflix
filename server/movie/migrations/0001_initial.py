# Generated by Django 5.1.1 on 2024-09-26 20:03

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('vote_average', models.FloatField()),
                ('vote_count', models.IntegerField()),
                ('release_date', models.DateTimeField()),
                ('runtime', models.IntegerField()),
                ('backdrop_path', models.CharField(max_length=255)),
                ('overview', models.TextField()),
                ('popularity', models.IntegerField()),
                ('poster_path', models.CharField(blank=True, max_length=255, null=True)),
                ('genres', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), size=None)),
            ],
        ),
    ]