from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.serializers import ValidationError
import re

class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields = ['username', 'email', 'password']

    def validate_username(self,value):
        if User.objects.filter(username=value).exists():
            raise ValidationError('Username already exists')
        if len(value)<3:
            raise ValidationError('Username must be at least 3 characters long')
        return value
    def validate_email(self,value):
        pattern=r'^[A-Z-a-z][A-Za-z0-9._]+@gmail\.com$'
        if not re.match(pattern,value):
            raise ValidationError('Email must be a valid Gmail address (e.g., user123@gmail.com)')
        if User.objects.filter(email=value).exists():
            raise ValidationError('Email already exists')
        return value
    def validate_password(self,value):
        if len(value)<8:
            raise ValidationError("Password must be at least 8 characters long")
        if not re.search(r'[A-Z]',value):
            raise ValidationError("Password must contain at least one uppercase letter")
        if not re.search(r'[a-z]',value):
            raise ValidationError("Password must contain at least one lowercase letter")
        if not re.search(r'\d', value):
            raise ValidationError("Password must contain at least one digit")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise ValidationError("Password must contain at least one special character")
        return value
    def create(self,validated_data):
        user=User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
            )
        return user