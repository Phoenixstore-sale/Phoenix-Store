// ==========================================
// PHOENIX STORE - ADMINISTRACIÓN
// ==========================================


// ==========================================
// CONFIGURACIÓN
// ==========================================

const SUPABASE_AUTH_URL =
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`;

const SUPABASE_PRODUCTOS_URL =
    `${SUPABASE_URL}/rest/v1/Productos`;

const SUPABASE_CONFIG_URL =
    `${SUPABASE_URL}/rest/v1/Configuracion`;

const STORAGE_SESSION =
    "phoenix_admin_session";


// ==========================================
// OBTENER SESIÓN GUARDADA
// ==========================================

function obtenerSesionAdmin() {

    const sesionGuardada =
        localStorage.getItem(STORAGE_SESSION);

    if (!sesionGuardada) {
        return null;
    }

    try {

        return JSON.parse(sesionGuardada);

    } catch (error) {

        console.error(
            "Sesión inválida:",
            error
        );

        localStorage.removeItem(STORAGE_SESSION);

        return null;
    }
}


// ==========================================
// OBTENER TOKEN
// ==========================================

function obtenerTokenAdmin() {

    const sesion =
        obtenerSesionAdmin();

    if (!sesion) {
        return null;
    }

    return sesion.access_token || null;
}


// ==========================================
// LOGIN
// ==========================================

const formularioLogin =
    document.getElementById("adminLoginForm");


if (formularioLogin) {

    const mensajeLogin =
        document.getElementById("adminLoginMessage");


    formularioLogin.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            const email =
                document
                    .getElementById("adminEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("adminPassword")
                    .value;


            mensajeLogin.textContent =
                "INICIANDO SESIÓN...";


            try {

                const respuesta =
                    await fetch(
                        SUPABASE_AUTH_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "apikey":
                                    SUPABASE_KEY
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );


                const datos =
                    await respuesta.json();


                if (!respuesta.ok) {

                    throw new Error(
                        datos.error_description ||
                        datos.msg ||
                        "Correo o contraseña incorrectos."
                    );

                }


                // ==================================
                // GUARDAR SESIÓN
                // ==================================

                localStorage.setItem(
                    STORAGE_SESSION,
                    JSON.stringify(datos)
                );


                mensajeLogin.textContent =
                    "ACCESO CORRECTO. CARGANDO PANEL...";


                // ==================================
                // IR AL PANEL
                // ==================================

                setTimeout(function () {

                    window.location.href =
                        "admin-panel.html";

                }, 500);


            } catch (error) {

                console.error(
                    "Error de inicio de sesión:",
                    error
                );


                mensajeLogin.textContent =
                    error.message ||
                    "No se pudo iniciar sesión.";

            }

        }
    );

}


// ==========================================
// VERIFICAR ACCESO AL PANEL
// ==========================================

const esPanelAdmin =
    document.body.classList.contains(
        "admin-panel-page"
    );


if (esPanelAdmin) {

    const token =
        obtenerTokenAdmin();


    if (!token) {

        window.location.href =
            "admin.html";

    }

}


// ==========================================
// CARGAR TASA USDT
// ==========================================

async function cargarTasaAdmin() {

    const inputTasa =
        document.getElementById("adminRate");


    if (!inputTasa) {
        return;
    }


    const token =
        obtenerTokenAdmin();


    if (!token) {
        return;
    }


    try {

        const respuesta =
            await fetch(
                `${SUPABASE_CONFIG_URL}?clave=eq.tasa_usdt&select=valor`,
                {
                    method: "GET",

                    headers: {
                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        if (!respuesta.ok) {

            throw new Error(
                `Error ${respuesta.status}`
            );

        }


        const datos =
            await respuesta.json();


        if (!datos.length) {

            throw new Error(
                "No se encontró la tasa USDT."
            );

        }


        inputTasa.value =
            datos[0].valor;


        console.log(
            "Tasa cargada:",
            datos[0].valor
        );


    } catch (error) {

        console.error(
            "Error cargando tasa:",
            error
        );

    }

}


// ==========================================
// GUARDAR TASA USDT
// ==========================================

async function guardarTasaAdmin() {

    const inputTasa =
        document.getElementById("adminRate");

    const mensaje =
        document.getElementById("rateMessage");


    if (!inputTasa || !mensaje) {
        return;
    }


    const nuevaTasa =
        Number(inputTasa.value);


    if (!nuevaTasa || nuevaTasa <= 0) {

        mensaje.textContent =
            "INTRODUCE UNA TASA VÁLIDA.";

        return;
    }


    const token =
        obtenerTokenAdmin();


    if (!token) {

        window.location.href =
            "admin.html";

        return;
    }


    mensaje.textContent =
        "GUARDANDO TASA...";


    try {

        const respuesta =
            await fetch(
                `${SUPABASE_CONFIG_URL}?clave=eq.tasa_usdt`,
                {
                    method: "PATCH",

                    headers: {
                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",

                        "Prefer":
                            "return=minimal"
                    },

                    body: JSON.stringify({
                        valor: nuevaTasa
                    })
                }
            );


        if (!respuesta.ok) {

            throw new Error(
                `Error ${respuesta.status}`
            );

        }


        mensaje.textContent =
            "✓ TASA ACTUALIZADA CORRECTAMENTE.";


    } catch (error) {

        console.error(
            "Error guardando tasa:",
            error
        );


        mensaje.textContent =
            "NO SE PUDO ACTUALIZAR LA TASA.";

    }

}


// ==========================================
// CARGAR PRODUCTOS
// ==========================================

async function cargarProductosAdmin() {

    const contenedor =
        document.getElementById(
            "adminProductsContainer"
        );


    if (!contenedor) {
        return;
    }


    const token =
        obtenerTokenAdmin();


    if (!token) {
        return;
    }


    try {

        const respuesta =
            await fetch(
                `${SUPABASE_PRODUCTOS_URL}?game=eq.Blood%20Strike&order=sort_order.asc`,
                {
                    method: "GET",

                    headers: {
                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        if (!respuesta.ok) {

            throw new Error(
                `Error ${respuesta.status}`
            );

        }


        const productos =
            await respuesta.json();


        contenedor.innerHTML = "";


        if (!productos.length) {

            contenedor.innerHTML = `
                <div class="admin-loading">
                    NO HAY PRODUCTOS.
                </div>
            `;

            return;
        }


        productos.forEach(
            function (producto) {

                const tarjeta =
                    document.createElement(
                        "div"
                    );


                tarjeta.className =
                    "admin-product-card";


                tarjeta.innerHTML = `

                    <div class="admin-product-info">

                        <h3>
                            ${producto.name}
                        </h3>

                        <p>
                            ${producto.category}
                        </p>

                    </div>


                    <div class="admin-product-fields">

                        <div>

                            <label>
                                PRECIO USDT
                            </label>

                            <input
                                type="number"
                                class="admin-product-price"
                                value="${producto.price}"
                                min="0"
                                step="0.01"
                            >

                        </div>


                        <div>

                            <label>
                                ORDEN
                            </label>

                            <input
                                type="number"
                                class="admin-product-order"
                                value="${producto.sort_order}"
                                min="0"
                                step="1"
                            >

                        </div>


                        <label class="admin-product-active">

                            <input
                                type="checkbox"
                                class="admin-product-active-checkbox"
                                ${producto.active ? "checked" : ""}
                            >

                            ACTIVO

                        </label>


                        <button
                            class="admin-save-product-button"
                        >
                            GUARDAR
                        </button>


                        <p class="admin-product-message"></p>

                    </div>

                `;


                const boton =
                    tarjeta.querySelector(
                        ".admin-save-product-button"
                    );


                boton.addEventListener(
                    "click",
                    function () {

                        guardarProductoAdmin(
                            producto.id,
                            tarjeta
                        );

                    }
                );


                contenedor.appendChild(
                    tarjeta
                );

            }
        );


    } catch (error) {

        console.error(
            "Error cargando productos:",
            error
        );


        contenedor.innerHTML = `
            <div class="admin-loading">
                NO SE PUDIERON CARGAR LOS PRODUCTOS.
            </div>
        `;

    }

}


// ==========================================
// GUARDAR PRODUCTO
// ==========================================

async function guardarProductoAdmin(
    productoId,
    tarjeta
) {

    const precioInput =
        tarjeta.querySelector(
            ".admin-product-price"
        );


    const ordenInput =
        tarjeta.querySelector(
            ".admin-product-order"
        );


    const activoInput =
        tarjeta.querySelector(
            ".admin-product-active-checkbox"
        );


    const mensaje =
        tarjeta.querySelector(
            ".admin-product-message"
        );


    const precio =
        Number(precioInput.value);


    const orden =
        Number(ordenInput.value);


    if (!precio || precio <= 0) {

        mensaje.textContent =
            "PRECIO INVÁLIDO.";

        return;
    }


    const token =
        obtenerTokenAdmin();


    if (!token) {

        window.location.href =
            "admin.html";

        return;
    }


    mensaje.textContent =
        "GUARDANDO...";


    try {

        const respuesta =
            await fetch(
                `${SUPABASE_PRODUCTOS_URL}?id=eq.${productoId}`,
                {
                    method: "PATCH",

                    headers: {
                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",

                        "Prefer":
                            "return=minimal"
                    },

                    body: JSON.stringify({

                        price: precio,

                        active:
                            activoInput.checked,

                        sort_order:
                            orden

                    })
                }
            );


        if (!respuesta.ok) {

            throw new Error(
                `Error ${respuesta.status}`
            );

        }


        mensaje.textContent =
            "✓ GUARDADO.";


    } catch (error) {

        console.error(
            "Error guardando producto:",
            error
        );


        mensaje.textContent =
            "NO SE PUDO GUARDAR.";

    }

}


// ==========================================
// CERRAR SESIÓN
// ==========================================

const botonLogout =
    document.getElementById(
        "adminLogoutButton"
    );


if (botonLogout) {

    botonLogout.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                STORAGE_SESSION
            );


            window.location.href =
                "admin.html";

        }
    );

}


// ==========================================
// INICIAR PANEL
// ==========================================
async function cargarEstadisticasAdmin() {

    const productosElemento =
        document.getElementById("statActiveProducts");

    const tasaElemento =
        document.getElementById("statUsdtRate");

    const juegosElemento =
        document.getElementById("statActiveGames");

    if (!productosElemento || !tasaElemento || !juegosElemento) {
        return;
    }

    const token = obtenerTokenAdmin();

    if (!token) {
        return;
    }

    try {

        /* ==============================
           OBTENER PRODUCTOS ACTIVOS
        ============================== */

        const respuestaProductos = await fetch(
            `${SUPABASE_PRODUCTOS_URL}?active=eq.true&select=id,game`,
            {
                method: "GET",

                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!respuestaProductos.ok) {
            throw new Error(
                `Error productos ${respuestaProductos.status}`
            );
        }

        const productos =
            await respuestaProductos.json();


        /* ==============================
           CONTAR PRODUCTOS
        ============================== */

        productosElemento.textContent =
            productos.length;


        /* ==============================
           CONTAR JUEGOS
        ============================== */

        const juegosUnicos =
            new Set(
                productos
                    .map(producto => producto.game)
                    .filter(Boolean)
            );

        juegosElemento.textContent =
            juegosUnicos.size;


        /* ==============================
           OBTENER TASA USDT
        ============================== */

        const respuestaTasa = await fetch(
            `${SUPABASE_CONFIG_URL}?clave=eq.tasa_usdt&select=valor`,
            {
                method: "GET",

                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!respuestaTasa.ok) {
            throw new Error(
                `Error tasa ${respuestaTasa.status}`
            );
        }

        const datosTasa =
            await respuestaTasa.json();


        if (datosTasa.length > 0) {

            const tasa =
                Number(datosTasa[0].valor);

            tasaElemento.textContent =
                `${tasa.toLocaleString("es-VE")} Bs`;
        }


    } catch (error) {

        console.error(
            "Error cargando estadísticas:",
            error
        );

        productosElemento.textContent = "—";
        tasaElemento.textContent = "—";
        juegosElemento.textContent = "—";
    }
}
if (esPanelAdmin) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            cargarTasaAdmin();

            cargarProductosAdmin();
        
            cargarEstadisticasAdmin();

            const botonGuardarTasa =
                document.getElementById(
                    "saveRateButton"
                );


            if (botonGuardarTasa) {

                botonGuardarTasa.addEventListener(
                    "click",
                    guardarTasaAdmin
                );

            }

        }
    );

}