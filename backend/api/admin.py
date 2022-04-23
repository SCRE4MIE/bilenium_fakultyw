"""API admin."""
# Django
from django.contrib import admin

# Project
from api.models import Dog
from api.models import Rating


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):  # noqa: D101
    list_display = [
        'pk',
        'value',
        '__str__',
    ]


@admin.register(Dog)
class DogAdmin(admin.ModelAdmin):  # noqa: D101
    list_display = [
        'pk',
        'name',
        'owner',
    ]
