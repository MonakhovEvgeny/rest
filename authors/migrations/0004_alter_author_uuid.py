# Generated by Django 4.0 on 2021-12-25 13:52

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [("authors", "0003_alter_author_uuid")]

    operations = [
        migrations.AlterField(
            model_name="author",
            name="uuid",
            field=models.UUIDField(
                default=uuid.UUID("df60165c-ed43-4d9c-9553-7b9a5ac3b782"), primary_key=True, serialize=False
            ),
        )
    ]
