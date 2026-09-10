/* =================================
   PHOENIX STORE
   SISTEMA DE PEDIDOS
================================= */

let pedidoActual = {
    producto: "",
    precio: "",
    idJugador: "",
    nombreCliente: "",
    metodoPago: "",
    numeroPedido: ""
};


/* =================================
   UTILIDAD: IR ARRIBA
================================= */

function irArriba() {
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =================================
   BLOOD STRIKE
================================= */

function abrirBloodStrike() {

    const pagina = document.getElementById("blood-strike-page");

    if (!pagina) {
        console.error("No se encontró la pantalla de Blood Strike.");
        return;
    }

    /* Ocultar cualquier pantalla anterior */

    document.body.classList.remove(
        "checkout-active",
        "payment-active",
        "receipt-active"
    );

    const checkout = document.getElementById("checkout");
    const payment = document.getElementById("payment");
    const receipt = document.getElementById("receipt");

    if (checkout) checkout.classList.remove("active");
    if (payment) payment.classList.remove("active");
    if (receipt) receipt.classList.remove("active");

    /* Mostrar Blood Strike */

    document.body.classList.add("blood-strike-active");
    pagina.classList.add("active");

    irArriba();
}


/* =================================
   CERRAR BLOOD STRIKE
================================= */

function cerrarBloodStrike() {

    const pagina = document.getElementById("blood-strike-page");

    if (!pagina) {
        return;
    }

    pagina.classList.remove("active");
    document.body.classList.remove("blood-strike-active");

    irArriba();
}


/* =================================
   COMPRAR PRODUCTO
================================= */

function comprar(producto, precio) {

    /* Guardar producto */

    pedidoActual.producto = producto;
    pedidoActual.precio = precio;

    /* Mostrar producto en el pedido */

    const checkoutProducto =
        document.getElementById("checkout-producto");

    const checkoutPrecio =
        document.getElementById("checkout-precio");

    if (checkoutProducto) {
        checkoutProducto.textContent = producto;
    }

    if (checkoutPrecio) {
        checkoutPrecio.textContent = precio;
    }

    /* Ocultar Blood Strike */

    const bloodStrike =
        document.getElementById("blood-strike-page");

    if (bloodStrike) {
        bloodStrike.classList.remove("active");
    }

    document.body.classList.remove("blood-strike-active");

    /* Ocultar otras pantallas */

    const payment =
        document.getElementById("payment");

    const receipt =
        document.getElementById("receipt");

    if (payment) payment.classList.remove("active");
    if (receipt) receipt.classList.remove("active");

    document.body.classList.remove(
        "payment-active",
        "receipt-active"
    );

    /* Mostrar pantalla de pedido */

    const checkout =
        document.getElementById("checkout");

    if (!checkout) {
        console.error("No se encontró la pantalla de pedido.");
        return;
    }

    document.body.classList.add("checkout-active");
    checkout.classList.add("active");

    irArriba();
}


/* =================================
   VOLVER A LA TIENDA
================================= */

function volverTienda() {

    /* Ocultar todas las pantallas */

    const checkout =
        document.getElementById("checkout");

    const payment =
        document.getElementById("payment");

    const receipt =
        document.getElementById("receipt");

    const bloodStrike =
        document.getElementById("blood-strike-page");

    if (checkout) checkout.classList.remove("active");
    if (payment) payment.classList.remove("active");
    if (receipt) receipt.classList.remove("active");
    if (bloodStrike) bloodStrike.classList.remove("active");

    document.body.classList.remove(
        "checkout-active",
        "payment-active",
        "receipt-active",
        "blood-strike-active"
    );

    irArriba();
}


/* =================================
   FORMULARIO DEL PEDIDO
================================= */

document.addEventListener("DOMContentLoaded", function() {

    const formulario =
        document.getElementById("checkout-form");

    if (!formulario) {
        console.error("No se encontró checkout-form.");
        return;
    }

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        /* Obtener datos */

        const campoId =
            document.getElementById("player-id");

        const campoNombre =
            document.getElementById("customer-name");

        const campoPago =
            document.getElementById("payment-method");

        if (!campoId || !campoNombre || !campoPago) {
            console.error(
                "No se encontraron todos los campos del formulario."
            );
            return;
        }

        const idJugador =
            campoId.value.trim();

        const nombreCliente =
            campoNombre.value.trim();

        const metodoPago =
            campoPago.value;

        /* Validar */

        if (
            !idJugador ||
            !nombreCliente ||
            !metodoPago
        ) {
            return;
        }

        /* Guardar datos */

        pedidoActual.idJugador =
            idJugador;

        pedidoActual.nombreCliente =
            nombreCliente;

        pedidoActual.metodoPago =
            metodoPago;

        /* Crear número de pedido */

        pedidoActual.numeroPedido =
            "PS-" +
            Date.now()
                .toString()
                .slice(-8);

        /* Mostrar información en Pago Móvil */

        const paymentProducto =
            document.getElementById("payment-producto");

        const paymentPrecio =
            document.getElementById("payment-precio");

        const paymentTotal =
            document.getElementById("payment-total");

        if (paymentProducto) {
            paymentProducto.textContent =
                pedidoActual.producto;
        }

        if (paymentPrecio) {
            paymentPrecio.textContent =
                pedidoActual.precio;
        }

        if (paymentTotal) {
            paymentTotal.textContent =
                pedidoActual.precio;
        }

        /* Ocultar pedido */

        const checkout =
            document.getElementById("checkout");

        if (checkout) {
            checkout.classList.remove("active");
        }

        document.body.classList.remove(
            "checkout-active"
        );

        /* Mostrar Pago Móvil */

        const payment =
            document.getElementById("payment");

        if (!payment) {
            console.error(
                "No se encontró la pantalla de Pago Móvil."
            );
            return;
        }

        document.body.classList.add(
            "payment-active"
        );

        payment.classList.add("active");

        irArriba();

    });

});


/* =================================
   VOLVER AL PEDIDO
================================= */

function volverPedido() {

    const payment =
        document.getElementById("payment");

    const checkout =
        document.getElementById("checkout");

    if (payment) {
        payment.classList.remove("active");
    }

    document.body.classList.remove(
        "payment-active"
    );

    if (checkout) {
        checkout.classList.add("active");
    }

    document.body.classList.add(
        "checkout-active"
    );

    irArriba();
}


/* =================================
   PAGO REALIZADO
================================= */

function pagoRealizado() {

    /* Verificar que exista un pedido */

    if (
        !pedidoActual.numeroPedido ||
        !pedidoActual.producto ||
        !pedidoActual.precio
    ) {
        console.error(
            "No existe un pedido válido."
        );
        return;
    }

    /* Número de pedido */

    const receiptNumber =
        document.getElementById("receipt-number");

    if (receiptNumber) {
        receiptNumber.textContent =
            pedidoActual.numeroPedido;
    }

    /* Producto */

    const receiptProducto =
        document.getElementById("receipt-producto");

    if (receiptProducto) {
        receiptProducto.textContent =
            pedidoActual.producto;
    }

    /* Precio */

    const receiptPrecio =
        document.getElementById("receipt-precio");

    if (receiptPrecio) {
        receiptPrecio.textContent =
            pedidoActual.precio;
    }

    /* ID */

    const receiptId =
        document.getElementById("receipt-id");

    if (receiptId) {
        receiptId.textContent =
            pedidoActual.idJugador;
    }

    /* Cliente */

    const receiptCliente =
        document.getElementById("receipt-cliente");

    if (receiptCliente) {
        receiptCliente.textContent =
            pedidoActual.nombreCliente;
    }

    /* Método de pago */

    const receiptPago =
        document.getElementById("receipt-pago");

    if (receiptPago) {
        receiptPago.textContent =
            pedidoActual.metodoPago;
    }

    /* Ocultar Pago Móvil */

    const payment =
        document.getElementById("payment");

    if (payment) {
        payment.classList.remove("active");
    }

    document.body.classList.remove(
        "payment-active"
    );

    /* Mostrar comprobante */

    const receipt =
        document.getElementById("receipt");

    if (!receipt) {
        console.error(
            "No se encontró la pantalla de comprobante."
        );
        return;
    }

    document.body.classList.add(
        "receipt-active"
    );

    receipt.classList.add("active");

    irArriba();
}


/* =================================
   VOLVER AL PAGO
================================= */

function volverPago() {

    const receipt =
        document.getElementById("receipt");

    const payment =
        document.getElementById("payment");

    if (receipt) {
        receipt.classList.remove("active");
    }

    document.body.classList.remove(
        "receipt-active"
    );

    if (payment) {
        payment.classList.add("active");
    }

    document.body.classList.add(
        "payment-active"
    );

    irArriba();
}


/* =================================
   ENVIAR PEDIDO A WHATSAPP
================================= */

function enviarWhatsApp() {

    if (
        !pedidoActual.numeroPedido ||
        !pedidoActual.producto
    ) {
        console.error(
            "No existe un pedido para enviar."
        );
        return;
    }

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


/* =================================
   HACER FUNCIONES DISPONIBLES
   PARA LOS BOTONES DEL HTML
================================= */

window.abrirBloodStrike =
    abrirBloodStrike;

window.cerrarBloodStrike =
    cerrarBloodStrike;

window.comprar =
    comprar;

window.volverTienda =
    volverTienda;

window.volverPedido =
    volverPedido;

window.pagoRealizado =
    pagoRealizado;

window.volverPago =
    volverPago;

window.enviarWhatsApp =
    enviarWhatsApp;

window.soporte =
    soporte;