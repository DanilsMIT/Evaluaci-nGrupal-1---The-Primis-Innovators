cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos

////////////////////////////////////CÓDIGO_CUENTAS - LEYTHON HIDALGO

mostrarCuentas = function () {
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
    let cmpTabla = document.getElementById("tabla");
    let contenidoTabla = "<table><tr>" +
        "<th>NUMERO CUENTA</th>" +
        "<th>NOMBRE</th>" +
        "<th>SALDO</th>" +
        "</tr>";
    let elementoCuenta;
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuenta = cuentas[i];
        contenidoTabla +=
            "<tr><td>" + elementoCuenta.numeroCuenta + "</td>"
            + "<td>" + elementoCuenta.nombre + " " + elementoCuenta.apellido + "</td>"
            + "<td>" + elementoCuenta.saldo + "</td>"
            + "</tr>";

    }
    contenidoTabla += "</table>";
    cmpTabla.innerHTML = contenidoTabla;
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    let elementoCuenta;
    let cuentaEncontrada = null;
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuenta = cuentas[i];
        if (elementoCuenta.numeroCuenta == numeroCuenta) {
            cuentaEncontrada = elementoCuenta;
        }
    }
    return cuentaEncontrada;
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta = function (cuenta) {
    let resultado = buscarCuenta(cuenta.numeroCuenta);
    if (resultado == null) {
        cuentas.push((cuenta));
        //Si se agrega, mostrar un alert CUENTA AGREGADA
        alert("Cuenta agregada");
    } else {
        //Si ya existe mostrar un alert CUENTA EXISTENTE
        alert("Cuenta existente");
    }
}

agregar = function () {
    //Toma los valores de las cajas de texto, sin validaciones
    let cedula = recuperarTexto("cmpCedula");
    let nombre = recuperarTexto("cmpNombre");
    let apellido = recuperarTexto("cmpApellido");
    let nCuenta = recuperarTexto("cmpNumeroCuenta");

    let verificacionCedula = false;
    let verificacionNombre = false;
    let verificacionApellido = false;
    let verificacionCuenta = false;

    if (cedula !== null && cedula !== undefined && cedula !== "" && cedula.length == 10 && !isNaN(cedula)) {
        verificacionCedula = true;
        mostrarTexto("errorCedula", "");
    } else {
        mostrarTexto("errorCedula", "La cédula debe tener 10 dígitos");
    }

    let encontrarDigitoNombre = esDigito(nombre);
    if (nombre !== null && nombre !== undefined && nombre != "" && nombre.length >= 3 && esMayuscula(nombre) && encontrarDigitoNombre == false) {
        verificacionNombre = true;
        mostrarTexto("errorNombre", "");
    } else {
        mostrarTexto("errorNombre", "Debe contener 3 o más letras, la primera en mayúscula, no se aceptan números");
    }

    let encontrarDigitoApellido = esDigito(apellido);
    if (apellido !== null && apellido !== undefined && apellido != "" && apellido.length >= 3 && esMayuscula(apellido) && encontrarDigitoApellido == false) {
        verificacionApellido = true;
        mostrarTexto("errorApellido", "");
    } else {
        mostrarTexto("errorApellido", "Debe contener 3 o más letras, la primera en mayúscula, no se aceptan números");
    }

    if (nCuenta !== null && nCuenta !== undefined && nCuenta !== "" && nCuenta.length == 8 && !isNaN(nCuenta)) {
        verificacionCuenta = true;
        mostrarTexto("errorNCuenta", "");
    } else {
        mostrarTexto("errorNCuenta", "El número de cuenta debe tener 8 dígitos");
    }

    if (verificacionCedula && verificacionNombre && verificacionApellido && verificacionCuenta) {
        //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
        let cuenta = {};
        cuenta.cedula = cedula;
        cuenta.nombre = nombre;
        cuenta.apellido = apellido;
        cuenta.numeroCuenta = nCuenta;
        cuenta.saldo = 0.0;
        //Invoca a agregarCuenta
        agregarCuenta(cuenta);
        //Invoca a mostrarCuentas
        mostrarCuentas();
    }
}

//////////////////////////Botones de los DIV

Cuentas = function () {
    ocultarComponente("divTransacciones");
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");

}

Transacciones = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");

    deshabilitarComponente("deposito")
    deshabilitarComponente("retiro")

}

Movimientos = function () {
    ocultarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    mostrarComponente("divMovimientos");

}
////////////////////////////////////CÓDIGO_TRANSACCIONES - DANILO ISAAC

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
    alert("Deposito exitoso");
    
    let depositoMovimiento={}
    depositoMovimiento.numeroCuenta=numeroCuenta
    depositoMovimiento.monto=monto
    depositoMovimiento.tipo="C"

    movimientos.push(depositoMovimiento)
}

ejecutarDeposito = function () {
    let nAccount = recuperarTexto("cajitaBuscarcuenta")
    let nCantidad = recuperarFloat("monto")
    depositar(nAccount, nCantidad)
    let actualizarSaldoShow = buscarCuenta(nAccount);
    mostrarTexto("cuentaEncontradas", "Saldo: " + actualizarSaldoShow.saldo)
    mostrarCuentas();
}


retirar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta)

    let depositoMovimiento={}
    if (monto > cuentaAfectada.saldo) {
        alert("No hay fondos suficientes")
    } else {
        cuentaAfectada.saldo -= monto
        alert("Retiro exitoso")

    depositoMovimiento.numeroCuenta=numeroCuenta
    depositoMovimiento.monto=monto
    depositoMovimiento.tipo="D"
    movimientos.push(depositoMovimiento)
    mostrarCuentas();
    }
}



ejecutarRetiro = function () {
    let nAccount = recuperarTexto("cajitaBuscarcuenta")
    let nCantidad = recuperarFloat("monto")
    retirar(nAccount, nCantidad)
    let actualizarSaldoShow = buscarCuenta(nAccount);
    mostrarTexto("cuentaEncontradas", "Saldo: " + actualizarSaldoShow.saldo)
}

////////////////////////////////////CÓDIGO_MOVIMIENTOS - ANGEL DIDER

filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    //Se barre el arreglo de movimientos
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
    let movimientoIterado
    for(let i=0;i<movimientos.length;i++){
        movimientoIterado = movimientos[i]
        if(numeroCuenta==movimientoIterado.numeroCuenta){
            movimientosCuenta.push(movimientoIterado)
        }
    }
    mostrarMovimientos(movimientosCuenta)
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos=function(misMovimientos){
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
    let cmp = document.getElementById("tablaMovimientos")
    let contenidoTabla = "<table><tr>"+"<th>NUMERO CUENTA</th>"+"<th>MONTO</th>"+"<th>TIPO</th>"+"</tr>"
    let movimientoIterado
    for(let i = 0;i<misMovimientos.length;i++){
        movimientoIterado = misMovimientos[i]
        if(movimientoIterado.tipo=="D"){
            let monto_debito = movimientoIterado.monto * -1
            movimientoIterado.monto = monto_debito
        }
        contenidoTabla +="<tr><td>"+movimientoIterado.numeroCuenta+"</td>"+"<td>"+movimientoIterado.monto+"</td>"+"<td>"+movimientoIterado.tipo+"</td></tr>"
    }
    contenidoTabla += "</table>"
    cmp.innerHTML = contenidoTabla
}

ejecutarMovimiento=function(){
    let nCuenta=recuperarTexto("cajitamovimientos")
    filtrarMovimientos(nCuenta)
}
