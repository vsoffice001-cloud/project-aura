from django.contrib import admin
from django.urls import path
from api.views import HealthCheckView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', HealthCheckView.as_view(), name='health-check'),
]
