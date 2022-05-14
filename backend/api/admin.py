"""API admin."""
# Django
from django.contrib import admin

# Project
from api.forms import WalkLimit
from api.models import Dog, TrainersWorksDays
from api.models import Rating
from api.models import Walk


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
        'date',
        'date_end',
    ]
    form = WalkLimit


@admin.register(TrainersWorksDays)  # noqa: D101
class TrainersWorksDaysAdmin(admin.ModelAdmin):
    list_display = [
        'pk',
        'trainer',
    ]