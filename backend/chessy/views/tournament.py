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
)

from ..serializers.game import GameCreateSerializer


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
            return Response({'detail': 'No puedes unirte a un torneo que ya ha comenzado.'}, status=status.HTTP_400_BAD_REQUEST)

        if tournament.players.filter(pk=user.pk).exists():
            return Response({'detail': 'Ya estás registrado en este torneo.'}, status=status.HTTP_400_BAD_REQUEST)
        print(f"players_amount: {tournament.players_amount}, current players: {tournament.players.count()}")


        if tournament.players_amount <= tournament.players.count():
            return Response({'detail': 'El torneo está lleno.'}, status=status.HTTP_400_BAD_REQUEST)

        tournament.players.add(user)
        players_data = UserSerializer(tournament.players.all(), many=True).data #devuelvo la lista de inscriptos hasta el momento

        return Response({
            'detail': 'Te has inscrito al torneo',
            'players': players_data
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def leave(self, request, pk=None):
        user = request.user
        tournament = self.get_object()

        if tournament.status != 'PENDING':
            return Response({'detail': 'No puedes abandonar un torneo que ya ha comenzado.'}, status=status.HTTP_400_BAD_REQUEST)

        if not tournament.players.filter(pk=user.pk).exists():
            return Response({'detail': 'No estás registrado en este torneo.'}, status=status.HTTP_400_BAD_REQUEST)

        tournament.players.remove(user)

        return Response({
            'detail': 'Has abandonado el torneo.',
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def choices(self, request):
        mode_choices = [{'value': k, 'label': v} for k, v in Tournament.MODE_CHOICES]
        status_choices = [{'value': k, 'label': v} for k, v in Tournament.STATUS_CHOICES]
        return Response({
            "modes": mode_choices,
            "statuses": status_choices
        })

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def start(self, request, pk=None):
        tournament = self.get_object()
        user = request.user

        if user != tournament.creator:
            return Response({'detail': 'Sin permisos.'}, status=status.HTTP_403_FORBIDDEN)
        
        if tournament.status != 'PENDING':
            return Response({'detail': 'El torneo ya ha comenzado o ha finalizado.'}, status=status.HTTP_400_BAD_REQUEST)

        players = list(tournament.players.all())
        games_created = []

        for i in range(0, len(players) - 1, 2):
            data = {
                'player1': players[i].id,
                'player2': players[i+1].id,
            }
            serializer = GameCreateSerializer(data=data, context={'tournament': tournament})
            if serializer.is_valid():
                serializer.save()
                games_created.append(serializer.data)
            else:
                pass
        
        tournament.status = 'IN_PROGRESS'
        tournament.save()

        return Response({
            'detail': f'Torneo iniciado con {len(games_created)} partidas creadas.',
            'games': games_created,
        }, status=status.HTTP_201_CREATED)


