from rest_framework import serializers
from ..models import Game
from django.db.models import Q

class GameCreateSerializer(serializers.ModelSerializer):
    tournament = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Game
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'tournament']

    def validate(self, data):
        tournament = self.context['tournament']
        player1 = data.get('player1')
        player2 = data.get('player2')

        if tournament.status not in ['PENDING', 'IN_PROGRESS']: #solo se pueden crear games en torneos pendientes o en progreso
            raise serializers.ValidationError("The tournament is finished or was canceled.")

        if player1 == player2:
            raise serializers.ValidationError("Players cannot be the same person.")

        if player1 not in tournament.players.all() or player2 not in tournament.players.all():
            raise serializers.ValidationError("Both players must be registered in the tournament.")
        
        if Game.objects.filter(
            tournament=tournament
        ).filter(
            Q(player1=player1, player2=player2) | Q(player1=player2, player2=player1)
        ).exists():
            raise serializers.ValidationError("Both players have already faced each other in this tournament.")
        return data
    
    def create(self, validated_data):
        validated_data['tournament'] = self.context['tournament']
        return super().create(validated_data)

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

class GameStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['status']

    def validate_status(self, value):
        instance = self.instance 
        tournament = instance.tournament

        #contemlo el estado del game
        if instance.status == 'IN_GAME' and value == 'PENDING':
            raise serializers.ValidationError("The match is currently in game.")

        if instance.status == 'FINISHED' and value != 'FINISHED':
            raise serializers.ValidationError("The match has already finished.")

        #contemplo el estado del torneo
        if value in ['IN_GAME', 'FINISHED']:
            if tournament.status == 'PENDING':
                raise serializers.ValidationError("This tournament has not yet started.")
            elif tournament.status == 'FINISHED':
                raise serializers.ValidationError("This tournament has already ended")

        return value
