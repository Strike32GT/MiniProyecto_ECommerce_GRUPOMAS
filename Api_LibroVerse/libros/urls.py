from rest_framework import routers
from .views import LibroViewSet

router = routers.DefaultRouter()
router.register(r'libros',LibroViewSet)

urlpatterns = router.urls