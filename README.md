# Mis Finanzas

Sistema para llevar el seguimiento de las finanzas personales. Desarrollado con Django, Django REST Framework y React como prueba para Magoya por Leandro Barone (web@leandrobarone.com.ar).

# Puesta en marcha

## Para el backend

	pipenv install
	pipenv shell
	cd backend
	python manage.py migrate
	python manage.py runserver

## Para el frontend

	cd frontend
	npm install
	npm start

# Endpoints

## GET api/transacciones/

Lista el historial completo de transacciones. No acepta parámetros.

Devuelve:

	[
		{
			"id": 1,
			"fecha": 2020-01-30T16:41:04.090947-03:00",
			"concepto": "Salario",
			"monto": "50000.00"
		},
		{
			"id": 2,
			"fecha": 2020-01-30T16:41:04.090948-03:00",
			"concepto": "Alquiler",
			"monto": "-20000.00"
		}
	]

### id: _integer_

ID autoincremental generado automáticamente al crear una transacción.

### fecha: _string_

Fecha en formato ISO 8601 generada automáticamente al crear una transacción.

### concepto: _string_

Motivo del crédito o débito.

### Monto: _string_

Monto del débito o crédito en formato decimal.

## POST api/transacciones/

Crea una nueva transacción. Devuelve el objeto creado o un objeto con información sobre el error.

Formato:

	{
		"concepto": "Nuevo gasto",
		"monto": "-100.00"
	}

Devuelve: 

	{
		"id": 3,
		"fecha": "2020-01-30T16:41:04.090949-03:00",
		"concepto": "Nuevo gasto",
		"monto": "-100.00"
	}

Ejemplo de error:

	{
		"monto": [
			"Se requiere un número válido."
		]
	}

## PUT api/transacciones/:id/

Modifica una transacción existente. Devuelve el objeto modificado o un objeto con información sobre el error.

Formato:

	{
		"concepto": "Gasto modificado",
		"monto": "-500.00"
	}

Devuelve: 

	{
		"id": 3,
		"fecha": "2020-01-30T16:41:04.090950-03:00",
		"concepto": "Gasto modificado",
		"monto": "-500.00"
	}

Ejemplo de error:

	{
		"monto": [
			"Se requiere un número válido."
		]
	}

## DELETE api/transacciones/:id/

Elimina una transacción existente. Devuelve una respuesta vacía o un objeto con información sobre el error.

Ejemplo de error:

	{
		"detail": "No encontrado."
	}