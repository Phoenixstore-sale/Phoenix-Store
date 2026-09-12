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

    // ==========================================
// CONEXIÓN CON SUPABASE
// ==========================================

const SUPABASE_REST_URL = `${SUPABASE_URL}/rest/v1/Productos`;

async function obtenerProductosBloodStrike() {
    try {
        const respuesta = await fetch(
            `${SUPABASE_REST_URL}?game=eq.Blood%20Strike&active=eq.true&order=sort_order.asc`,
            {
                method: "GET",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        if (!respuesta.ok) {
            throw new Error(`Error de Supabase: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        console.log("Productos recibidos desde Supabase:", productos);

        return productos;

    } catch (error) {
        console.error("No se pudieron cargar los productos:", error);
        return [];
    }
}
// ==========================================
// CARGAR PAQUETES DE ORO EN BLOOD STRIKE
// ==========================================

async function cargarPaquetesOro() {

    const contenedor = document.getElementById("bloodStrikeGoldProducts");

    if (!contenedor) {
        return;
    }

    const productos = await obtenerProductosBloodStrike();

    const tasaUSDT = await obtenerTasaUSDT();

    // Limpiar el mensaje de carga
    contenedor.innerHTML = "";

    // Si no hay productos
    if (productos.length === 0) {

        contenedor.innerHTML = `
            <div class="products-loading">
                NO HAY PAQUETES DISPONIBLES
            </div>
        `;

        return;
    }

    // Crear las tarjetas
    productos
        .filter(producto => producto.category === "Oro")
        .forEach(producto => {

            const precioBs = producto.price * tasaUSDT;

            const tarjeta = document.createElement("article");

            tarjeta.className = "product-card";

            tarjeta.innerHTML = `
                <div class="product-amount">
                    ${producto.name.replace(" Barras de oro", "")}
                </div>

                <p class="product-description">
                    Oro
                </p>

                <div class="product-price">
                    ${precioBs.toLocaleString("es-VE")} Bs
                </div>

                <button>
                    COMPRAR
                </button>
            `;

            const boton = tarjeta.querySelector("button");

            boton.addEventListener("click", function () {

                comprar(
                    producto.name,
                    `${precioBs.toLocaleString("es-VE")} Bs`
                );

            });

            contenedor.appendChild(tarjeta);

        });

}// Cargar productos cuando la página esté lista
document.addEventListener("DOMContentLoaded", function () {
    cargarPaquetesOro();
});
// ==========================================
// CARGAR PASES EN BLOOD STRIKE
// ==========================================

async function cargarPases() {

    const contenedor = document.getElementById("bloodStrikePassProducts");

    if (!contenedor) {
        return;
    }

    const productos = await obtenerProductosBloodStrike();

    const tasaUSDT = await obtenerTasaUSDT();

    // Limpiar el mensaje de carga
    contenedor.innerHTML = "";

    // Buscar solamente los productos de categoría Pases
    const pases = productos.filter(
        producto => producto.category === "Pases"
    );

    // Si no hay pases disponibles
    if (pases.length === 0) {

        contenedor.innerHTML = `
            <div class="products-loading">
                NO HAY PASES DISPONIBLES
            </div>
        `;

        return;
    }

    // Crear las tarjetas de los pases
    pases.forEach(producto => {

        const precioBs = producto.price * tasaUSDT;

        const tarjeta = document.createElement("article");

        tarjeta.className = "product-card special";

        tarjeta.innerHTML = `
            <div class="product-amount">
                ${producto.name.toUpperCase()}
            </div>

            <p class="product-description">
                Blood Strike
            </p>

            <div class="product-price">
                ${precioBs.toLocaleString("es-VE")} Bs
            </div>

            <button>
                COMPRAR
            </button>
        `;

        const boton = tarjeta.querySelector("button");

        boton.addEventListener("click", function () {

            comprar(
                producto.name,
                `${precioBs.toLocaleString("es-VE")} Bs`
            );

        });

        contenedor.appendChild(tarjeta);

    });
}


// Cargar los pases cuando la página esté lista
document.addEventListener("DOMContentLoaded", function () {
    cargarPases();
});
// ==========================================
// OBTENER TASA USDT DESDE SUPABASE
// ==========================================

async function obtenerTasaUSDT() {

    try {

        const respuesta = await fetch(
            `${SUPABASE_URL}/rest/v1/Configuracion?clave=eq.tasa_usdt&select=valor`,
            {
                method: "GET",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        if (!respuesta.ok) {
            throw new Error(`Error de Supabase: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!datos.length) {
            throw new Error("No se encontró la tasa USDT");
        }

        const tasa = Number(datos[0].valor);

        console.log("Tasa USDT recibida desde Supabase:", tasa);

        return tasa;

    } catch (error) {

        console.error("No se pudo obtener la tasa USDT:", error);

        return 970;
    }
}