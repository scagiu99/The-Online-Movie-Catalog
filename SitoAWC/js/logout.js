function logout() {
    sessionStorage.clear();
}

var clienteLoggato = sessionStorage.getItem("clienteLoggato");
var negozianteLoggato = sessionStorage.getItem("negozianteLoggato");

if (clienteLoggato == undefined && negozianteLoggato == undefined) {
    window.location = 'index.html';
}

