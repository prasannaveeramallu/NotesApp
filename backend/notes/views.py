from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import NotesSerializer,UserSerializer
from .models import Notes
from django.contrib.auth.hashers import make_password,check_password


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['POST'])
def signup(request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key, 'user': serializer.data})
        return Response(serializer.errors, status=status.HTTP_200_OK)


@api_view(['POST'])
def login(request):
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return Response("missing user", status=status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(user)
        return Response({'token': token.key, 'user': serializer.data})


@api_view(['DELETE'])
def deleteUser(request, pk):
    
    try:
        u = User.objects.filter(id=pk)
        u.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(['PUT'])
def changePassword(request, pk):
     user = get_object_or_404(User, id=pk)
     if not user.check_password(request.data['password']):
            return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    
     user.set_password(request.data['new_password'])
     user.save()
     return Response(status=status.HTTP_204_NO_CONTENT)


       
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")


@api_view(['GET', 'POST'])
def list(request, pk=None):
       
        if request.method == 'GET':
            queryset = Notes.objects.filter(user_id=pk)
            serializer = NotesSerializer(queryset, many=True)
            return Response(serializer.data)

        if request.method == 'POST':
            serializer = NotesSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST', 'DELETE', 'PUT'])    
def NotesDetails(request, pk=None, ic=None):
        try:
            n = Notes.objects.filter(user_id=pk)
            note = n.get(id=ic)
        except Notes.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if request.method == 'GET':
            queryset = n.get(id=ic)
            serializer = NotesSerializer(queryset)
            return Response(serializer.data)
    
       
        elif request.method == 'POST':
            serializer = NotesSerializer(data=request.data)
            if serializer.is_valid():
                
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        elif request.method == 'PUT':
            serializer = NotesSerializer(note, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

 

        

   
        
