sessionStorage.clear();

//PER AVERE LA LISTA DI GENERI DA MOSTRARE AL CLIENTE NELLE PREFERENZE
function listaGeneri() {
    var generi = JSON.parse(localStorage.getItem("generi"));
    var listaGeneri = "<option>Inserisci Genere</option>";
    
    for(i = 0; i < generi.length; i++) {
        listaGeneri += '<option>' + generi[i].name + '</option>';
        document.getElementById("genere").innerHTML = listaGeneri;
    }
}

//REGISTRAZIONE CLIENTE
function registraCliente() {
    var nome = document.getElementById("inputName").value;
    var cognome = document.getElementById("inputSurname").value;
    var email = document.getElementById("inputEmail").value;
    var genere = document.getElementById("genere").value;
    var password = document.getElementById("inputPassword").value;
    

    if (nome.length == 0 ) {
        alert("Inserisci il nome!");
        return false;
    }
    var check=/[0-9]/;
    var check2=/[$-/:-?{-~!"^_`\[\]]/;
    if((check.test(nome) || check2.test(nome)) && nome.length > 0 ){
        alert("Il nome non può contenere né numeri né simboli");
        return false;
    }

    if ( cognome.length == 0) {
        alert("Inserisci il cognome!");
        return false;
    }

    if((check.test(cognome) || check2.test(cognome)) && cognome.length > 0){
        alert("Il cognome non può contenere né numeri né simboli");
        return false;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        alert("Inserisci un'email valida");
        return false;
    }

    if (genere == "Inserisci Genere") {
        alert("Seleziona il genere per poter proseguire!");
        return false;
    }

    if (password.length == 0) {
        alert("Inserisci la password!");
        return false;
    }

    var check3=/\s\S/;
    if(check3.test(password) && password.length > 0){
       alert("La password non può contenere spazi vuoti.");
       return false;

    }
    if( password.length < 8 && password.length > 0){
        alert("La password deve contenere almeno 8 caratteri");
        return false;
     }

    //CHECK SUI TERMINI DI SERVIZIO
    var terminiServizio = document.getElementById("customCheck");
    if (!terminiServizio.checked){
        alert("Per continuare devi accettare i termini di servizio!");
        return false;
    }
   
    //CONTROLLO SE IL LOCAL STORAGE È VUOTO O MENO E INIZIALIZZO L'ARRAY DI CLIENTI
    if (typeof(localStorage.clienti) == "undefined") {
        localStorage.clienti="[]";
    }

    var c = JSON.parse(localStorage.clienti);
    var nextPosizione = c.length;

    var cliente = {
        nome : nome,
        cognome : cognome,
        email : email,
        password : password,
        genere : genere,
        numCarta : "",
        mese : "",
        anno : "",
        cvv : ""
    };

    //CONTROLLO SUL CLIENTE
    for (i=0;i<nextPosizione;i++) {
        if(clientiUguali(c[i],cliente)) {
            alert("Cliente già esistente!");
            return false;
        }
    }
    //AGGIUNGO IL NUOVO CLIENTE
    reinderizzaCliente();
    c[nextPosizione] = cliente;
    localStorage.clienti = JSON.stringify(c);
    sessionStorage.setItem("clienteLoggato", email);
    return true;

}

//CONTROLLO CHE NON CI SIANO 2 CLIENTI CON GLI STESSI DATI
function clientiUguali(c,cliente){
    if ((c.nome==cliente.nome)&&(c.cognome==cliente.cognome)&&(c.email.toLowerCase()==cliente.email.toLowerCase())) {
      return true;
    } else if((c.email==cliente.email)) {
        return true;
    }
    return false;
}

//PASSA ALLA PAGINA DEL CATALOGO CLIENTE
function reinderizzaCliente() {
    window.location = "catalogo.html";
}

//REGISTRAZIONE NEGOZIANTE
function registraNegoziante() {
    var nomeNegozio = document.getElementById("inputName").value;
    var telefono = document.getElementById("inputTel").value;
    var indirizzo = document.getElementById("inputAddress").value;
    var pIVA = document.getElementById("inputIVA").value;
    var password = document.getElementById("inputPassword").value;

    if (nomeNegozio.length == 0 ) {
        alert("Inserisci il nome del Negozio!");
        return false;
    }

    var check2=/[$-/:-?{-~!"^_`\[\]]/;
    if(check2.test(nomeNegozio) && nome.length > 0 ){
        alert("Il nome non può contenere né numeri né simboli");
        return false;
    }
    if (telefono.length == 0 ) {
        alert("Inserisci il numero di telefono");
        return false;
    }

    if((telefono.length < 9 || telefono.length > 11) && telefono > 0) {
        alert("Inserisci un numero di telefono valido");
        return false;
    }

    if (indirizzo.length == 0 ) {
        alert("Inserisci l'indirizzo del Negozio");
        return false;
    }

    if (pIVA.length == 0 ) {
        alert("Inserisci la partita IVA");
        return false;
    }

    if ( (pIVA.length < 11 || pIVA.length > 11)  && (pIVA > 0) ){
        alert("Inserisci una partita IVA valida");
        return false;
    }

    if (password.length == 0) {
        alert("Inserisci la password!");
        return false;
    }

    var check3=/\s\S/;
    if(check3.test(password) && password.length > 0){
       alert("La password non può contenere spazi vuoti.");
       return false;

    }
    if( password.length < 8 && password.length > 0){
        alert("La password deve contenere almeno 8 caratteri");
        return false;
    }

    //CHECK SUI TERMINI DI SERVIZIO
    var terminiServizio = document.getElementById("customCheck");
    if (!terminiServizio.checked){
        alert("Per continuare devi accettare i termini di servizio!");
        return false;
    }
   
     //CONTROLLO SE IL LOCAL STORAGE È VUOTO O MENO E INIZIALIZZO L'ARRAY DI NEGOZIANTI
     if (typeof(localStorage.negozianti) == "undefined") {
        localStorage.negozianti="[]";
    }

    var n = JSON.parse(localStorage.negozianti);
    var nextPosizione = n.length;

    var negoziante = {
        nomeNegozio : nomeNegozio,
        telefono : telefono,
        indirizzo : indirizzo,
        pIVA : pIVA,
        password : password,
        vetrina : []
    };

    //CONTROLLO SUL NEGOZIANTE
    for (i=0;i<nextPosizione;i++) {
        if(negoziantiUguali(n[i],negoziante)) {
            alert("Negoziante già esistente!");
            return false;
        }
    }
    //AGGIUNGO IL NUOVO NEGOZIANTE
    reinderizzaNegoziante();
    //alert("Dati inseriti correttamente");
    n[nextPosizione] = negoziante;
    localStorage.negozianti = JSON.stringify(n);
    sessionStorage.setItem("negozianteLoggato", nomeNegozio);
    return true;
    
}

//CONTROLLO CHE NON CI SIANO 2 CLIENTI CON GLI STESSI DATI
function negoziantiUguali(n,negoziante){
    if ((n.nomeNegozio.toLowerCase()==negoziante.nomeNegozio.toLowerCase())||(n.telefono==negoziante.telefono) || (n.pIVA==negoziante.pIVA)) {
        return true;
    } else if((n.nomeNegozio.toLowerCase()==negoziante.nomeNegozio.toLowerCase())) {
        return true;
    }
    return false;
}

//PASSA ALLA PAGINA DEI FILM NEGOZIANTE
function reinderizzaNegoziante() {
    window.location = "film.html";
}