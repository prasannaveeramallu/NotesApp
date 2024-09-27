from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Notes

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']




class NotesSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Notes
        fields = ('id', 'title', 'description', 'user_id')        