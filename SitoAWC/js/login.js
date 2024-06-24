sessionStorage.clear();

//LOGIN CLIENTE
function loginCliente() {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var clienti = JSON.parse(localStorage.getItem("clienti"));
    var clienteTrovato = false;

    for (let i = 0; i < clienti.length; i++){ 
        
        if (email == clienti[i].email && password == clienti[i].password) {
            sessionStorage.setItem("clienteLoggato", email);
            clienteTrovato = true;
            reinderizzaCliente();
            //alert("Cliente loggato con successo!");
            break;
        } else if (email == clienti[i].email && password != clienti[i].password) {
            clienteTrovato = true;
            alert("Password inserita non corretta");
            break;
        } 

    }
    if (clienteTrovato == false) {
        alert("Cliente non trovato!");
    }
    
}

//PASSA ALLA PAGINA DEL CATALOGO CLIENTE
function reinderizzaCliente() {
    window.location = "catalogo.html";
}


//LOGIN NEGOZIANTE
function loginNegoziante() {
    var nomeNegozio = document.getElementById("inputNegozio").value;
    var password = document.getElementById("inputPassword").value;
    var negozianti = JSON.parse(localStorage.getItem("negozianti"));
    var negozianteTrovato = false;

    for (let i = 0; i < negozianti.length; i++){ 
       
        if (nomeNegozio == negozianti[i].nomeNegozio && password == negozianti[i].password) {
            sessionStorage.setItem("negozianteLoggato", nomeNegozio);
            negozianteTrovato = true;
            reinderizzaNegoziante();
            //alert("Negoziante loggato con successo!");
            break;
        } else if (nomeNegozio == negozianti[i].nomeNegozio && password != negozianti[i].password) {
            negozianteTrovato = true;
            alert("Password inserita non corretta");
            break;
        } 

    }
    if (negozianteTrovato == false) {
        alert("Negoziante non trovato!");
    }
    
}
//PASSA ALLA PAGINA DEI FILM DEL NEGOZIANTE
function reinderizzaNegoziante() {
    window.location = "film.html";
}