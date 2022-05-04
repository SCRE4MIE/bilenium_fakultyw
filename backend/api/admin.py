"""API admin."""
# Django
from django.contrib import admin

# Project
from api.forms import M2MDogsLimit
from api.models import Dog, Walk
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


@admin.register(Walk)
class WalkAdmin(admin.ModelAdmin):  # noqa: D101
    list_display = [
        'pk',
        'trainer',
    ]
    form = M2MDogsLimit
