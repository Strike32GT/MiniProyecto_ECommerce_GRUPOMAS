from django.shortcuts import render

from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['POST'])
def login_usuario(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_active and not user.is_staff:

            return Response({
                'id': user.id,
                'email': user.email,
                'nombre_completo':user.nombre_completo
            })
        else: 
            return Response({'error':'Acceso denegado'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error':'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)    