from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

class RegisterUserSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=150,
        required=True
    )
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)