cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

cargar = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");

    deshabilitarComponente("deposito")
    deshabilitarComponente("retiro")

}

buscarCuenta = function (numeroCuenta) {
    let account;
    let cuentaArreglo;
    for (c = 0; c < cuentas.length; c++) {
        cuentaArreglo = cuentas[c]
        if (cuentaArreglo.numeroCuenta == numeroCuenta) {
            account = cuentaArreglo
            break
        } else {
            account = null
        }
    }
    return account
}

ejecutarBusqueda = function () {


    let cuenta = recuperarTexto("cajitaBuscarcuenta")
    let cliente = buscarCuenta(cuenta)

    if (cliente == null) {
        alert("Cuenta inexistente")
        mostrarTexto("cuentaEncontrada", "La busqueda va apartir del número de cuenta")
        deshabilitarComponente("deposito")
        deshabilitarComponente("retiro")
    } else {
        mostrarTexto("cuentaEncontrada", "")
        mostrarTexto("cuentaEncontradanC", "No.Cuenta: " + cliente.numeroCuenta)
        mostrarTexto("cuentaEncontradaci", "Cédula: " + cliente.cedula)
        mostrarTexto("cuentaEncontradanm", "Señor/a: " + cliente.nombre + " " + cliente.apellido)
        mostrarTexto("cuentaEncontradas", "Saldo: " + cliente.saldo)

        habilitarComponente("deposito")
        habilitarComponente("retiro")

    }

}

depositar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta)
    cuentaAfectada.saldo += monto
    alert("Deposito exitoso")

}

ejecutarDeposito = function () {
    let nAccount = recuperarTexto("cajitaBuscarcuenta")
    let nCantidad = recuperarFloat("monto")
    depositar(nAccount, nCantidad)
    let actualizarSaldoShow = buscarCuenta(nAccount);
    mostrarTexto("cuentaEncontradas", "Saldo: " + actualizarSaldoShow.saldo)

    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
}


retirar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta)

    if (monto > cuentaAfectada.saldo) {
        alert("No hay fondos suficientes")
    } else {
        cuentaAfectada.saldo -= monto
        alert("Retiro exitoso")

    }
}



ejecutarRetiro = function () {
    let nAccount = recuperarTexto("cajitaBuscarcuenta")
    let nCantidad = recuperarFloat("monto")
    retirar(nAccount, nCantidad)
    let actualizarSaldoShow = buscarCuenta(nAccount);
    mostrarTexto("cuentaEncontradas", "Saldo: " + actualizarSaldoShow.saldo)
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
}