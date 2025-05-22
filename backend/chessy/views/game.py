from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models import Game
from ..serializers.game import *
from ..models import Tournament

class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        tournament_id = self.kwargs['tournament_pk']
        return Game.objects.filter(tournament_id=tournament_id)

    def get_serializer_class(self):
        if self.action == 'create':
            return GameCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return GameStatusUpdateSerializer
        return GameSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        tournament_id = self.kwargs['tournament_pk']
        context['tournament'] = Tournament.objects.get(pk=tournament_id)
        return context
