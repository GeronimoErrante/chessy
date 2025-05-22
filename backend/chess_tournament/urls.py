from django.contrib import admin
from django.urls import path, include

# API documentation title
API_TITLE = 'Chess Tournament API'
API_DESCRIPTION = 'API for managing chess tournaments and users'

urlpatterns = [
    # Admin interface
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('', include('chessy.urls')),
    
]
