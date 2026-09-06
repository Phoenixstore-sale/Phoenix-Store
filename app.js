let pedidoActual = {
    producto: "",
    precio: "",
    idJugador: "",
    nombreCliente: "",
    metodoPago: "",
    numeroPedido: ""
};


/* =================================
   COMPRAR PRODUCTO
================================= */

function comprar(producto, precio) {

    pedidoActual.producto = producto;
    pedidoActual.precio = precio;

    document.getElementById("checkout-producto").textContent =
        producto;

    document.getElementById("checkout-precio").textContent =
        precio;

    document.body.classList.add("checkout-active");

    document.getElementById("checkout").classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =================================
   VOLVER A LA TIENDA
================================= */

function volverTienda() {

    document.body.classList.remove("checkout-active");

    document.getElementById("checkout").classList.remove("active");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =================================
   FORMULARIO DEL PEDIDO
================================= */

document.getElementById("checkout-form").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const idJugador =
            document.getElementById("player-id").value.trim();

        const nombreCliente =
            document.getElementById("customer-name").value.trim();

        const metodoPago =
            document.getElementById("payment-method").value;


        if (!idJugador || !nombreCliente || !metodoPago) {
            return;
        }


        /* Guardar información */

        pedidoActual.idJugador = idJugador;

        pedidoActual.nombreCliente = nombreCliente;

        pedidoActual.metodoPago = metodoPago;


        /* Crear número de pedido */

        pedidoActual.numeroPedido =
            "PS-" +
            Date.now().toString().slice(-8);


        /* Mostrar producto y precio */

        document.getElementById("payment-producto").textContent =
            pedidoActual.producto;

        document.getElementById("payment-precio").textContent =
            pedidoActual.precio;

        document.getElementById("payment-total").textContent =
            pedidoActual.precio;


        /* Cambiar a pantalla de Pago Móvil */

        document.body.classList.remove("checkout-active");

        document.getElementById("checkout").classList.remove("active");

        document.body.classList.add("payment-active");

        document.getElementById("payment").classList.add("active");


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }
);


/* =================================
   VOLVER AL PEDIDO
================================= */

function volverPedido() {

    document.body.classList.remove("payment-active");

    document.getElementById("payment").classList.remove("active");

    document.body.classList.add("checkout-active");

    document.getElementById("checkout").classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =================================
   PAGO REALIZADO
================================= */

function pagoRealizado() {

    /* Número de pedido */

    document.getElementById("receipt-number").textContent =
        pedidoActual.numeroPedido;


    /* Producto */

    document.getElementById("receipt-producto").textContent =
        pedidoActual.producto;


    /* Precio */

    document.getElementById("receipt-precio").textContent =
        pedidoActual.precio;


    /* ID */

    document.getElementById("receipt-id").textContent =
        pedidoActual.idJugador;


    /* Cliente */

    document.getElementById("receipt-cliente").textContent =
        pedidoActual.nombreCliente;


    /* Método de pago */

    document.getElementById("receipt-pago").textContent =
        pedidoActual.metodoPago;


    /* Cambiar a comprobante */

    document.body.classList.remove("payment-active");

    document.getElementById("payment").classList.remove("active");

    document.body.classList.add("receipt-active");

    document.getElementById("receipt").classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =================================
   VOLVER AL PAGO
================================= */

function volverPago() {

    document.body.classList.remove("receipt-active");

    document.getElementById("receipt").classList.remove("active");

    document.body.classList.add("payment-active");

    document.getElementById("payment").classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =================================
   ENVIAR PEDIDO A WHATSAPP
================================= */

function enviarWhatsApp() {

    const numeroWhatsApp =
        "584120179772";


    const mensaje =
        "🔥 *PHOENIX STORE - NUEVO PEDIDO* 🔥\n\n" +

        "📋 *N° DE PEDIDO:* " +
        pedidoActual.numeroPedido +
        "\n\n" +

        "🎮 *JUEGO:* Blood Strike\n" +

        "🪙 *PRODUCTO:* " +
        pedidoActual.producto +
        "\n" +

        "💰 *PRECIO:* " +
        pedidoActual.precio +
        "\n\n" +

        "👤 *CLIENTE:* " +
        pedidoActual.nombreCliente +
        "\n" +

        "🆔 *ID DEL JUGADOR:* " +
        pedidoActual.idJugador +
        "\n\n" +

        "💳 *MÉTODO DE PAGO:* " +
        pedidoActual.metodoPago +
        "\n\n" +

        "✅ *Pago realizado.*\n" +

        "📸 Enviaré el comprobante de pago por este chat.";


    const url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensaje);


    window.location.href = url;
}


/* =================================
   SOPORTE
================================= */

function soporte() {

    const numeroWhatsApp =
        "584120179772";


    const mensaje =
        "Hola, Phoenix Store. Necesito ayuda con una compra.";


    const url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensaje);


    window.location.href = url;
}