from django.db.models import Sum
from .models import Transaccion
from rest_framework import serializers
from transacciones.models import Transaccion

class TransaccionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Transaccion
		fields = '__all__'

	# Validamos que los débitos no sean superiores al dinero disponible
	def validate_monto(self, value):
		total = Transaccion.objects.all().aggregate(Sum('monto'))['monto__sum'] or 0
		if (0 - value > total):
			raise serializers.ValidationError("El monto de la transacción supera el dinero disponible")
		return value