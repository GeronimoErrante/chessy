from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Tournament

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)

@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'start_time', 'mode', 'status', 'prize')
    list_filter = ('mode', 'status')
    search_fields = ('name',)
    ordering = ('-created_at',)
