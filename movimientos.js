movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

cargar=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}

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
