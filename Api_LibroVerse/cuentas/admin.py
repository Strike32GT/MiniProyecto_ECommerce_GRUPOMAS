from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario


# Register your models here.
class UsuarioAdmin(UserAdmin):
    model = Usuario
    list_display = ('email', 'nombre_completo', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información personal', {'fields': ('nombre_completo',)}),
        ('Permisos', {
            'fields': (
                'is_staff', 
                'is_active',
                'is_superuser',
                'groups',
                'user_permissions'
            )
        }),
        ('Fechas importantes', {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'nombre_completo',
                'password1',
                'password2',
                'is_staff',
                'is_active'
            ),
        }),
    )


    search_fields = ('email', 'nombre_completo')
    ordering = ('email',)

admin.site.register(Usuario, UsuarioAdmin)