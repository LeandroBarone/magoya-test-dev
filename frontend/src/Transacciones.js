import React, { useState, useEffect } from 'react';
import { cadenaAFecha, cadenaAMoneda } from './utils';

function Transacciones() {
  const [actualizando, setActualizando] = useState(true);
  const [transacciones, setTransacciones] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [nuevoConcepto, setNuevoConcepto] = useState('');
  const [nuevoMonto, setNuevoMonto] = useState('');
  const [formularioValido, setFormularioValido] = useState(false);

  // Carga las transacciones cuando se monta el componente
  useEffect(() => {
    cargarTransacciones();
  }, []);

  // Carga las transacciones desde la API
  function cargarTransacciones() {
    setActualizando(true);
  
    fetch('http://localhost:8000/api/transacciones/')
      .then(res => { if (res.ok) return res; else throw new Error(res.statusText); })
      .then(res => res.json())
      .then(json => {
        setTransacciones(json);
        const montoTotal = json.reduce((a, el) => a + parseFloat(el.monto), 0);
        setMontoTotal(montoTotal);
      })
      .catch(err => alert(err))
      .finally(setActualizando(false))
  }

  // Guarda una nueva transacción a través de la API
  function guardarTransaccion() {
    const concepto = nuevoConcepto;
    const monto = parseFloat(nuevoMonto);

    setActualizando(true);

    fetch('http://localhost:8000/api/transacciones/', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ concepto, monto }),
    })
      .then(res => { if (res.ok) return res; else throw new Error(res.statusText); })
      .then(() => {
        setNuevoConcepto('');
        setNuevoMonto('');
        setFormularioValido(false);
      })
      .then(cargarTransacciones)
      .catch(err => alert(err))
      .finally(setActualizando(false))
  }

  // Verifica si el formulario es válido para activar/desactivar el botón Guardar
  function validarFormulario() {
    setFormularioValido(
      (nuevoConcepto) &&
      (nuevoMonto) &&
      !isNaN(nuevoMonto) &&
      nuevoMonto !== 0 &&
      nuevoMonto >= 0 - montoTotal
    );
  }

  return (
    <div>
      <h3>
        Historial de gastos
        <button className="btn btn-primary btn-sm float-right" onClick={cargarTransacciones}><i className="fas fa-sync"></i></button>
      </h3>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Concepto</th>
            <th className="text-right">Monto</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map(el => (
          <tr key={el.id}>
            <td>{el.concepto} &nbsp; <small className="text-muted">{cadenaAFecha(el.fecha)}</small></td>
            <td className={"text-right " + ((parseInt(el.monto) > 0) ? "text-success" : "text-danger")}>{cadenaAMoneda(el.monto)}</td>
          </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-weight-bold">
            <td>Total</td>
            <td className="text-right">{cadenaAMoneda(montoTotal)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="form-row">
        <div className="col-md-6">
          <input className="form-control" placeholder="Nuevo débito o crédito" value={nuevoConcepto} onChange={e => setNuevoConcepto(e.target.value)} onKeyUp={validarFormulario} onInput={validarFormulario} />
        </div>
        <div className="col-md-3 input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">$</div>
          </div>
          <input type="number" className="form-control" placeholder="Monto" value={nuevoMonto} onChange={e => setNuevoMonto(e.target.value)} onKeyUp={validarFormulario} onInput={validarFormulario} />
        </div>
        <div className="col-md-3 text-right">
          <button className="btn btn-primary btn-block" disabled={!formularioValido} onClick={guardarTransaccion}>Guardar</button>
        </div>
      </div>
      {(actualizando) ? (
        <p className="mt-5"><i className="fas fa-sync fa-spin"></i> Actualizando...</p>
      ) : false}
    </div>
	);
}

export default Transacciones;