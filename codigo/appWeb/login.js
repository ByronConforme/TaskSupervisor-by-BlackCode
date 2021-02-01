document.getElementById("login-error-msg").style.display = "none";
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "123") {
        alert("Usuario y contraseña correctos.");
        location.reload();
    } else {
        document.getElementById("login-error-msg").style.display = "block";
    }
})

function datosAdmin(){
    alert("DATOS DE CONTACTO DE SU ADMINISTRADOR\nNombre: Admin.\nCargo: Administrador de sistemas.\nCelular: 0987654321\nCorreo: admin@correo.com")
}