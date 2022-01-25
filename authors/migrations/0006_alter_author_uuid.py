# Generated by Django 4.0 on 2022-01-15 11:52

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [("authors", "0005_alter_author_uuid")]

    operations = [
        migrations.AlterField(
            model_name="author",
            name="uuid",
            field=models.UUIDField(
                default=uuid.UUID("0ecd97a8-0e59-4585-9c37-e26ee9aaed42"), primary_key=True, serialize=False
            ),
        )
    ]
