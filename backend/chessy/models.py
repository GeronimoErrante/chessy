from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    points = models.IntegerField(default=0)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

class Tournament(models.Model):
    MODE_CHOICES = [
        ('STANDARD', 'Standard'),
        ('BLITZ', 'Blitz'),
    ]
    
    STATUS_CHOICES = [
        ('PENDING', 'Pendiente'),
        ('IN_PROGRESS', 'En juego'),
        ('FINISHED', 'Finalizado'),
    ]

    name = models.CharField(max_length=200)
    start_date = models.DateField()
    start_time = models.TimeField()
    creator = models.ForeignKey(User, related_name='created_tournaments', on_delete=models.CASCADE)
    players = models.ManyToManyField(User, related_name='tournaments')
    prize = models.IntegerField()
    mode = models.CharField(max_length=10, choices=MODE_CHOICES)
    status = models.CharField(max_length=11, choices=STATUS_CHOICES, default='PENDING')
    players_amount = models.IntegerField(default=0)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.status})"

    class Meta:
        ordering = ['-created_at']

class Game(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pendiente'),
        ('IN_GAME', 'En juego'),
        ('FINISHED', 'Finalizado'),
    ]

    tournament = models.ForeignKey(Tournament, related_name='games', on_delete=models.CASCADE)
    player1 = models.ForeignKey(User, related_name='games_as_player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(User, related_name='games_as_player2', on_delete=models.CASCADE)
    status = models.CharField(max_length=11, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.player1.username} vs {self.player2.username}"
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ('tournament', 'player1', 'player2')