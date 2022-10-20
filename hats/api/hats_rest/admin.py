from django.contrib import admin

# Register your models here.
from .models import Hats, LocationVO


@admin.register(Hats)
class HatsAdmin(admin.ModelAdmin):
    pass

@admin.register(LocationVO)
class LocationVOAdmin(admin.ModelAdmin):
    pass
