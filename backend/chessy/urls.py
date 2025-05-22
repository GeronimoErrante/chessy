from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views.auth import *
from .views.tournament import *
from .views.game import *
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views.tournament import TournamentViewSet

router = DefaultRouter()
router.register(r'tournaments', TournamentViewSet, basename='tournament')

tournament_router = NestedDefaultRouter(router, r'tournaments', lookup='tournament')
tournament_router.register(r'games', GameViewSet, basename='tournament-games')

urlpatterns = [
    path('auth/', include([
        path('register/', RegisterView.as_view(), name='register'),
        path('login/', LoginView.as_view(), name='login'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ])),
    path('', include(router.urls)),
    path('', include(tournament_router.urls)),
]