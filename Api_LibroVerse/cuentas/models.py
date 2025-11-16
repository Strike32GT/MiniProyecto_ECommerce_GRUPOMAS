from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.
class Usermanager( BaseUserManager ):
    
    def create_user(self, email, nombre_completo, password=None):
        if not email:
            raise ValueError("El usuario debe tener un correo electronico")
        
        email = self.normalize_email(email)
        user = self.model(email=email, nombre_completo=nombre_completo)
        user.set_password(password)
        user.save(using=self._db)
        return user



    def create_superuser(self, email, nombre_completo, password=None):
        user = self.create_user(email , nombre_completo, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)   
        return user


class Usuario( AbstractBaseUser , PermissionsMixin):
    nombre_completo = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    is_active = models.BooleanField(default=True)
    is_staff =  models.BooleanField(default=False)

    objects = Usermanager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre_completo']


    def __str__(self):
        return self.email