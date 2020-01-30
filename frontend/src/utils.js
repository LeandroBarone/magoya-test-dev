function cadenaAMoneda(monto) {
	return parseFloat(monto).toLocaleString(undefined, { style: "currency", currency: "ARS" });
}
  
function cadenaAFecha(fecha) {
return (new Date(Date.parse(fecha))).toLocaleString();
}

export { cadenaAFecha, cadenaAMoneda }