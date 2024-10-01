// Variables necesarias para la simulación
let prestamos = []; // Array para almacenar préstamos simulados

// Objeto de préstamo
function Prestamo(monto, plazo, tasa, interesTotal, pagoMensual) {
  this.monto = monto;
  this.plazo = plazo;
  this.tasa = tasa;
  this.interesTotal = interesTotal;
  this.pagoMensual = pagoMensual;
}

// Función para capturar entradas y procesar el préstamo
function simularPrestamo() {
  // Captura de entradas del usuario mediante prompt
  let monto = parseFloat(prompt("Ingrese el monto del préstamo en AR$:"));
  let plazo = parseInt(prompt("Ingrese el plazo en años:"));
  let tasa = parseFloat(prompt("Ingrese la tasa de interés anual en %:"));

  // Verificación de entradas
  if (isNaN(monto) || isNaN(plazo) || isNaN(tasa)) {
    alert("Por favor ingrese valores válidos.");
    return;
  }

  // Procesamiento esencial: cálculos de interés y pago mensual
  let tasaMensual = (tasa / 100) / 12;
  let totalPagos = plazo * 12;
  let pagoMensual = (monto * tasaMensual) / (1 - Math.pow((1 + tasaMensual), -totalPagos));
  let interesTotal = pagoMensual * totalPagos - monto;

  // Crear objeto Prestamo y almacenarlo en el array
  let nuevoPrestamo = new Prestamo(monto, plazo, tasa, interesTotal.toFixed(2), pagoMensual.toFixed(2));
  prestamos.push(nuevoPrestamo);

  // Salida del resultado mediante alert
  alert(`Interés total a pagar: AR$${interesTotal.toFixed(2)}\nPago mensual: AR$${pagoMensual.toFixed(2)}`);
}

// Función para buscar préstamos simulados basados en un monto mínimo
function buscarPrestamos() {
  let montoMinimo = parseFloat(prompt("Ingrese el monto mínimo de préstamo para buscar:"));

  // Filtrado de préstamos en base al monto mínimo ingresado
  let prestamosFiltrados = prestamos.filter(prestamo => prestamo.monto >= montoMinimo);

  // Salida de los resultados filtrados
  if (prestamosFiltrados.length > 0) {
    console.log("Préstamos encontrados:");
    prestamosFiltrados.forEach((prestamo, index) => {
      console.log(`Préstamo ${index + 1}: Monto: AR$${prestamo.monto}, Interés Total: AR$${prestamo.interesTotal}, Pago Mensual: AR$${prestamo.pagoMensual}`);
    });
  } else {
    console.log("No se encontraron préstamos con el monto mínimo ingresado.");
  }
}

// Función principal para el simulador
function iniciarSimulador() {
  let continuar = true;

  while (continuar) {
    // Ejecutar la simulación del préstamo
    simularPrestamo();

    // Preguntar si el usuario quiere buscar préstamos anteriores
    let buscar = prompt("¿Desea buscar préstamos anteriores? (sí/no)").toLowerCase();
    if (buscar === "sí") {
      buscarPrestamos();
    }

    // Preguntar si el usuario quiere hacer otra simulación
    let respuesta = prompt("¿Desea hacer otra simulación? (sí/no)").toLowerCase();
    if (respuesta !== "sí") {
      continuar = false;
    }
  }

  alert("Gracias por usar el simulador de préstamos.");
}

// Iniciar el simulador
iniciarSimulador();
