# Generated by Django 4.0 on 2021-12-25 12:30

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [("authors", "0001_initial")]

    operations = [
        migrations.RemoveField(model_name="author", name="id"),
        migrations.AddField(
            model_name="author",
            name="uuid",
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
    ]
