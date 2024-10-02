let prestamos = [];

function Prestamo(monto, plazo, tasa, interesTotal, pagoMensual) {
    this.monto = monto;
    this.plazo = plazo;
    this.tasa = tasa;
    this.interesTotal = interesTotal;
    this.pagoMensual = pagoMensual;
}

function simularPrestamo() {
    let monto = parseFloat(prompt("Ingrese el monto del préstamo en AR$:"));
    let plazo = parseInt(prompt("Ingrese el plazo en años:"));
    let tasa = parseFloat(prompt("Ingrese la tasa de interés anual en %:"));

    if (isNaN(monto) || isNaN(plazo) || isNaN(tasa)) {
        alert("Por favor ingrese valores válidos.");
        return;
    }

    let tasaMensual = (tasa / 100) / 12;
    let totalPagos = plazo * 12;
    let pagoMensual = (monto * tasaMensual) / (1 - Math.pow((1 + tasaMensual), -totalPagos));
    let interesTotal = pagoMensual * totalPagos - monto;

    let nuevoPrestamo = new Prestamo(monto, plazo, tasa, interesTotal.toFixed(2), pagoMensual.toFixed(2));
    prestamos.push(nuevoPrestamo);

    alert(`Interés total a pagar: AR$${interesTotal.toFixed(2)}\nPago mensual: AR$${pagoMensual.toFixed(2)}`);
}

function buscarPrestamos() {
    let montoMinimo = parseFloat(prompt("Ingrese el monto mínimo de préstamo para buscar:"));

    let prestamosFiltrados = prestamos.filter(prestamo => prestamo.monto >= montoMinimo);

    if (prestamosFiltrados.length > 0) {
        console.log("Préstamos encontrados:");
        prestamosFiltrados.forEach((prestamo, index) => {
            console.log(`Préstamo ${index + 1}: Monto: AR$${prestamo.monto}, Interés Total: AR$${prestamo.interesTotal}, Pago Mensual: AR$${prestamo.pagoMensual}`);
        });
    } else {
        console.log("No se encontraron préstamos con el monto mínimo ingresado.");
    }
}

function iniciarSimulador() {
    let continuar = true;

    while (continuar) {
        simularPrestamo();

        let buscar = prompt("¿Desea buscar préstamos anteriores? (sí/no)").toLowerCase();
        if (buscar === "sí") {
            buscarPrestamos();
        }

        let respuesta = prompt("¿Desea hacer otra simulación? (sí/no)").toLowerCase();
        if (respuesta !== "sí") {
            continuar = false;
        }
    }

    alert("Gracias por usar el simulador de préstamos.");
}

iniciarSimulador();