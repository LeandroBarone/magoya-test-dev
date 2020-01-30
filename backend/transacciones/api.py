from .models import Transaccion
from .serializers import TransaccionSerializer
from rest_framework import viewsets, permissions

class TransaccionViewSet(viewsets.ModelViewSet):
	queryset = Transaccion.objects.all().order_by('fecha')
	permission_classes = [
		permissions.AllowAny,
	]
	serializer_class = TransaccionSerializer
