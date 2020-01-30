from rest_framework import routers
from .api import TransaccionViewSet

router = routers.DefaultRouter()
router.register('api/transacciones', TransaccionViewSet, 'transacciones')

urlpatterns = router.urls