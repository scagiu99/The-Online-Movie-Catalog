//PER AVERE LA LISTA DI GENERI DA MOSTRARE AL CLIENTE NELLE PREFERENZE
function listaGeneri() {
    var generi = JSON.parse(localStorage.getItem("generi"));
    var listaGeneri = "";

    for (i = 0; i < generi.length; i++) {
        listaGeneri += '<option>' + generi[i].name + '</option>';
        document.getElementById("genere").innerHTML = listaGeneri;
    }
}

//FUNZIONE PER MOSTRARE NELLE IMPOSTAZIONI I DATI DEI CLIENTI
function mostraDatiCliente() {
    var clienteLoggato = sessionStorage.getItem("clienteLoggato");
    var clienti = JSON.parse(localStorage.getItem("clienti"));
    var dettagliCliente = "";

    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].email == clienteLoggato) {
            dettagliCliente = clienti[i];
        }
    }
    document.getElementById("nome").value = dettagliCliente.nome;
    document.getElementById("cognome").value = dettagliCliente.cognome;
    document.getElementById("email").value = dettagliCliente.email;
    document.getElementById("genere").value = dettagliCliente.genere;

}

//AL CLICK SUL BOTTONE ELIMINO IL CLIENTE
function eliminaCliente() {
    var clienteLoggato = sessionStorage.getItem("clienteLoggato");
    var clienti = JSON.parse(localStorage.getItem("clienti"));

    if (confirm("Sei sicuro di voler eliminare l'account?")) {

        for (let i = 0; i < clienti.length; i++) {
            if (clienti[i].email == clienteLoggato) {
                clienti.splice(i, 1);
                localStorage.setItem("clienti", JSON.stringify(clienti));
            }
        }
        sessionStorage.clear();
        window.location = "index.html";
    }
}

//AL CLICK SUL BOTTONE SALVO LE NUOVE MODIFICHE DEL CLIENTE
function salvaModificheCliente() {
    var clienteLoggato = sessionStorage.getItem("clienteLoggato");
    var clienti = JSON.parse(localStorage.getItem("clienti"));

    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].email == clienteLoggato) {
            clienti[i].genere = document.getElementById("genere").value;

            if (clienti[i].password == document.getElementById("password").value) {

                if (document.getElementById("nPassword").value.length == 0) {
                    alert("Inserisci la password!");
                    return false;
                }

                var check3 = /\s\S/;
                if (check3.test(document.getElementById("nPassword").value) && document.getElementById("nPassword").value.length > 0) {
                    alert("La password non può contenere spazi vuoti.");
                    return false;

                }
                if (document.getElementById("nPassword").value.length < 8 && document.getElementById("nPassword").value.length > 0) {
                    alert("La password deve contenere almeno 8 caratteri");
                    return false;
                }

                clienti[i].password = document.getElementById("nPassword").value;
            }
            localStorage.setItem("clienti", JSON.stringify(clienti));
        }
    }
}

//FUNZIONE PER MOSTRARE NELLE IMPOSTAZIONI I DATI DEI NEGOZIANTI
function mostraDatiNegoziante() {
    var negozianteLoggato = sessionStorage.getItem("negozianteLoggato");
    var negozianti = JSON.parse(localStorage.getItem("negozianti"));
    var dettagliNegoziante = "";

    for (let i = 0; i < negozianti.length; i++) {
        if (negozianti[i].nomeNegozio == negozianteLoggato) {
            dettagliNegoziante = negozianti[i];
        }
    }
    document.getElementById("nomeNegozio").value = dettagliNegoziante.nomeNegozio;
    document.getElementById("telefono").value = dettagliNegoziante.telefono;
    document.getElementById("indirizzo").value = dettagliNegoziante.indirizzo;
    document.getElementById("pIVA").value = dettagliNegoziante.pIVA;

}

//AL CLICK SUL BOTTONE ELIMINO IL NEGOZIANTE
function eliminaNegoziante() {
    var negozianteLoggato = sessionStorage.getItem("negozianteLoggato");
    var negozianti = JSON.parse(localStorage.getItem("negozianti"));

    if (confirm("Sei sicuro di voler eliminare l'account?")) {

        for (let i = 0; i < negozianti.length; i++) {
            if (negozianti[i].nomeNegozio == negozianteLoggato) {
                negozianti.splice(i, 1);
                localStorage.setItem("negozianti", JSON.stringify(negozianti));
            }
        }
        sessionStorage.clear();
        window.location = "index.html";
    }
}

//AL CLICK SUL BOTTONE SALVO LE NUOVE MODIFICHE DEL NEGOZIANTE
function salvaModificheNegoziante() {
    var negozianteLoggato = sessionStorage.getItem("negozianteLoggato");
    var negozianti = JSON.parse(localStorage.getItem("negozianti"));

    for (let i = 0; i < negozianti.length; i++) {
        if (negozianti[i].nomeNegozio == negozianteLoggato) {

            if (document.getElementById("telefono").value.length == 0) {
                alert("Inserisci il numero di telefono");
                return false;
            }

            if ((document.getElementById("telefono").value.length < 9 || document.getElementById("telefono").value.length > 11) && document.getElementById("telefono").value > 0) {
                alert("Inserisci un numero di telefono valido");
                return false;
            }

            if (document.getElementById("indirizzo").value.length == 0) {
                alert("Inserisci l'indirizzo del Negozio");
                return false;
            }

            negozianti[i].telefono = document.getElementById("telefono").value;
            negozianti[i].indirizzo = document.getElementById("indirizzo").value;

            if (negozianti[i].password == document.getElementById("password").value) {

                if (document.getElementById("nPassword").value.length == 0) {
                    alert("Inserisci la password!");
                    return false;
                }

                var check3 = /\s\S/;
                if (check3.test(document.getElementById("nPassword").value) && document.getElementById("nPassword").value.length > 0) {
                    alert("La password non può contenere spazi vuoti.");
                    return false;

                }
                if (document.getElementById("nPassword").value.length < 8 && document.getElementById("nPassword").value.length > 0) {
                    alert("La password deve contenere almeno 8 caratteri");
                    return false;
                }
                negozianti[i].password = document.getElementById("nPassword").value;
            }
            localStorage.setItem("negozianti", JSON.stringify(negozianti));
        }
    }
}