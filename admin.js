// ==========================================
// LOGIN DEL ADMINISTRADOR
// ==========================================

const SUPABASE_AUTH_URL = `${SUPABASE_URL}/auth/v1/token?grant_type=password`;


// ==========================================
// FORMULARIO DE LOGIN
// ==========================================

const formularioLogin = document.getElementById("adminLoginForm");

const mensajeLogin = document.getElementById("adminLoginMessage");


formularioLogin.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();

    const password = document.getElementById("adminPassword").value;


    mensajeLogin.textContent = "INICIANDO SESIÓN...";


    try {

        const respuesta = await fetch(
            SUPABASE_AUTH_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const datos = await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                datos.error_description ||
                datos.msg ||
                "Correo o contraseña incorrectos."
            );

        }


        // Guardar la sesión
        localStorage.setItem(
            "phoenix_admin_session",
            JSON.stringify(datos)
        );


        mensajeLogin.textContent =
            "ACCESO CORRECTO. CARGANDO PANEL...";


        // Por ahora solamente mostraremos esto
        setTimeout(function () {

            alert("Inicio de sesión correcto.");

        }, 500);


    } catch (error) {

        console.error(
            "Error de inicio de sesión:",
            error
        );


        mensajeLogin.textContent =
            error.message || "No se pudo iniciar sesión.";

    }

});