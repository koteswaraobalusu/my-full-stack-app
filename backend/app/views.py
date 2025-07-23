from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model
from .serializers import UserSerializer,UserSuggestionsSerializer,UserProfileSerializer
from .models import UserProfile
from rest_framework import generics
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your views here.
User=get_user_model()

class LoginAPIView(APIView):

    def post(self,request,format=None):
        username=request.data.get('username')
        password=request.data.get('password')

        user=authenticate(username=username,password=password)

        if user is not None:
            refresh=RefreshToken.for_user(user)

            access_token=str(refresh.access_token)
            refresh_token=str(refresh)
            response=Response({'message': 'Login successful','access_token':access_token})


            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=60*60*24*30
            )
            return response
        else:
            return Response(
                {'error': 'Invalid username or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )

class UserRegisterAPIView(APIView):
    serializer_class=UserSerializer

    def post(self,request,format=None):
        serializer=self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            user=serializer.save()
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = Response({
                'message': 'User registered successfully',
                'access': access_token,
                'user': {
                    'username': user.username,
                    'email': user.email
                }
            }, status=status.HTTP_201_CREATED)

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=False,  
                samesite='Lax',
                max_age=60 * 60 * 24 * 30  
            )
            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RefreshAPIView(APIView):
    def post(self, request, format=None):
        old_refresh_token = request.COOKIES.get('refresh_token')
        

        if not old_refresh_token:
            return Response({'error': 'No refresh token found'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            old_refresh = RefreshToken(old_refresh_token)

            # Get user from token payload
            user_id = old_refresh.get('user_id')
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

            # Blacklist the old token
            try:
                old_refresh.blacklist()
            except AttributeError:
                pass  # blacklist app not enabled

            # Issue new tokens
            new_refresh = RefreshToken.for_user(user)
            new_access = str(new_refresh.access_token)
            

            # Return response with new access token + new refresh token in cookie
            response = Response({'access': new_access})
            response.set_cookie(
                key='refresh_token',
                value=str(new_refresh),
                httponly=True,
                secure=False,  # Set to True in production
                samesite='Lax',
                max_age=60 * 60 * 24 * 30
            )

            return response

        except TokenError:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
        

class LogoutAPIView(APIView):
    
    def post(self,request,format=None):
        refresh_token=request.COOKIES.get('refresh_token')
        response = Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

        if refresh_token:
            try:
                token=RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                pass

        response.delete_cookie('refresh_token')

        return response
    
class MeAPIView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request,format=None):
        user=request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email
        })

class AuthStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'Authenticated'}, status=200)
    
class UserSuggestionsAPIView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request,format=None):
        users=User.objects.exclude(id=request.user.id)
        serializer = UserSuggestionsSerializer(users, many=True)
        return Response(serializer.data)


class UserProfileDetailView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        return self.request.user.profile
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)