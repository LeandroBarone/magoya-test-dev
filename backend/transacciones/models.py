from django.db import models

class Transaccion(models.Model):
	fecha = models.DateTimeField(auto_now_add=True)
	concepto = models.CharField(max_length=100)
	monto = models.DecimalField(decimal_places=2, max_digits=9)

	def __str__(self):
		return self.concepto