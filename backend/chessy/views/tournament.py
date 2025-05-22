from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from ..models import Tournament
from ..serializers.user import UserSerializer
from ..serializers.tournament import (
    TournamentSerializer,
    TournamentDetailSerializer,
    TournamentCreateSerializer,
    TournamentStatusUpdateSerializer,
)

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'mode']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TournamentDetailSerializer
        elif self.action == 'create':
            return TournamentCreateSerializer
        elif self.request.method == 'PATCH' and 'status' in self.request.data:
            return TournamentStatusUpdateSerializer
        return TournamentSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    @action(detail=False, methods=['get'])
    def active(self, request):
        active_tournaments = Tournament.objects.exclude(status="FINISHED")
        serializer = self.get_serializer(active_tournaments, many=True)
        return Response(serializer.data)    

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def join(self, request, pk=None):
        user = request.user
        tournament = self.get_object()

        if tournament.status != 'PENDING':
            return Response({'detail': 'You cannot join a tournament that has already started.'}, status=status.HTTP_400_BAD_REQUEST)

        if tournament.players.filter(pk=user.pk).exists():
            return Response({'detail': 'You are already registered in this tournament.'}, status=status.HTTP_400_BAD_REQUEST)

        tournament.players.add(user)
        players_data = UserSerializer(tournament.players.all(), many=True).data #devuelvo la lista de inscriptos hasta el momento

        return Response({
            'detail': 'Successfully registered.',
            'players': players_data
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def choices(self, request):
        mode_choices = [{'value': k, 'label': v} for k, v in Tournament.MODE_CHOICES]
        status_choices = [{'value': k, 'label': v} for k, v in Tournament.STATUS_CHOICES]
        return Response({
            "modes": mode_choices,
            "statuses": status_choices
        })

