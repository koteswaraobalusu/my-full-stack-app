from django.urls import path
from .views import LoginAPIView,RefreshAPIView,LogoutAPIView,MeAPIView,UserRegisterAPIView,AuthStatusView,UserSuggestionsAPIView,UserProfileDetailView
urlpatterns=[
    path('register/',UserRegisterAPIView.as_view(),name='register'),
    path('login/',LoginAPIView.as_view(),name='login'),
    path('refresh/',RefreshAPIView.as_view(),name='refresh'),
    path('logout/',LogoutAPIView.as_view(),name='logout'),
    path('status/',AuthStatusView.as_view(),name='status'),
    path('me/',MeAPIView.as_view(),name='me'),
    path('user-suggestions/',UserSuggestionsAPIView.as_view(),name='user-suggestions'),
    path('profile/', UserProfileDetailView.as_view(), name='user-profile'),

]