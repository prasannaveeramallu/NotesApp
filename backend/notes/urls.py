from django.urls import path, include
from django.contrib import admin
from . import views
from .views import UserViewSet

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'view', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('<str:pk>/home', views.list),
    path('<str:pk>/home/<str:ic>', views.NotesDetails),
    path('signup', views.signup),
    path('login', views.login),
    path('delete/<str:pk>', views.deleteUser),
    path('changepassword/<str:pk>', views.changePassword),
    path('', include(router.urls)),
]

#{ "password": "latha", "new_password": "test123" }