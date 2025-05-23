from rest_framework import serializers
from ..models import Tournament
from ..serializers.user import UserSerializer
from django.utils import timezone
from django.utils.timezone import localtime
from datetime import datetime


class TournamentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['id', 'name', 'start_date', 'start_time', 'prize', 'mode', 'players_amount', 'description']

    def validate(self, attrs):
        start_date = attrs.get('start_date')
        start_time = attrs.get('start_time')
        
        if start_date and start_time:
            naive_start_datetime = datetime.combine(start_date, start_time)
            aware_start_datetime = timezone.make_aware(naive_start_datetime, timezone.get_current_timezone())
            now = timezone.localtime(timezone.now())  

            if aware_start_datetime < now:
                raise serializers.ValidationError("You cannot create a tournament in the past.")
        return attrs

class TournamentSerializer(serializers.ModelSerializer):
    players_count = serializers.SerializerMethodField()
    class Meta:
        model = Tournament
        fields = ['id', 'name', 'start_date', 'start_time', 'prize', 'mode', 'status', 'players_count']

    def get_players_count(self, obj):
        return obj.players.count()

class TournamentDetailSerializer(serializers.ModelSerializer):
    players = UserSerializer(many=True, read_only=True)
    creator = serializers.SerializerMethodField()
    games = serializers.StringRelatedField(many=True, read_only=True)


    class Meta:
        model = Tournament
        fields = ['id', 'name', 'start_date', 'start_time', 'prize', 'mode', 'status', 'players', 'creator', 'games', 'players_amount', 'description']

    def get_creator(self, obj):
        return obj.creator.username if obj.creator else None
    
    def get_games(self, obj):
        return [str(game) for game in obj.games.filter(status='IN_GAME')]

    def validate_status(self, value):
        instance = self.instance
        current_status = instance.status
        now = timezone.now()

        start_datetime = timezone.make_aware(
        timezone.datetime.combine(instance.start_date, instance.start_time))
        start_datetime_local = localtime(start_datetime)
        has_started = now >= start_datetime

        # Regla 1: un torneo finalizado no puede cambiar de estado
        if current_status == 'FINISHED':
            raise serializers.ValidationError("The tournament has already finished.")

        # Regla 2: no puede volver a pending si ya comenzó o está en progreso
        if value == 'PENDING' and (current_status == 'IN_PROGRESS' or has_started):
            raise serializers.ValidationError("The tournament has already started")

        # Regla 3: no se puede pasar a IN_PROGRESS si aún no llegó la hora
        if value == 'IN_PROGRESS' and not has_started:
            raise serializers.ValidationError(
                f'This tournament starts on {start_datetime_local:%Y-%m-%d} at {start_datetime_local:%H:%M}'
            )

        # Regla 4: para finalizar el torneo, debe haber comenzado y no tener games sin finalizar
        if value == 'FINISHED':
            if not has_started:
                raise serializers.ValidationError("The tournament has not even started yet.")
            if instance.games.exclude(status='FINISHED').exists():
                raise serializers.ValidationError("All games must be finished before ending the tournament.")

        return value
