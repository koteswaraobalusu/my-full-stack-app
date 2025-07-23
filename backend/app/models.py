from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

def user_profile_image_path(instance,filename):
    return f'profile_images/user_{instance.user.id}/{filename}'


class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name='profile')
    profile_image = models.ImageField(upload_to=user_profile_image_path, blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    website = models.URLField(max_length=200, blank=True)
    location = models.CharField(max_length=100, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    followers = models.ManyToManyField(User, related_name='following', blank=True)

    def __str__(self):
        return f'{self.user.username} Profile'
    
    @property
    def followers_count(self):
        return self.followers.count()
    
    @property
    def following_count(self):
        return self.user.following.count()

