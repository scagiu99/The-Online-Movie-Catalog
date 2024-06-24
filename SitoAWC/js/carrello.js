//PER VISUALIZZARE IL CARRELLO
function visualizzaCarrello() {

  document.getElementById("titoloCarrello").innerHTML = "Carrello";
  document.getElementById("carrello").innerHTML = "";
  document.getElementById("totale").innerHTML = "<p>Non hai nessun articolo nel tuo carrello<br><br><br><br><br><br><br><br><br><br><br><br><br></p>";
 
  var carrello = JSON.parse(sessionStorage.getItem("carrello"));
  var costo = "";
  var totale = 0;

  for (let i = 0; i < carrello.acquisti.length; i++) {
    costo = "12.99€";
    totale += parseFloat(costo);
    richiediLocandine(carrello.acquisti[i], costo);
  }

  for (let i = 0; i < carrello.noleggi.length; i++) {
    costo = "4.99€";
    totale += parseFloat(costo);
    richiediLocandine(carrello.noleggi[i], costo);
  }
  if (totale != 0) {
    totale = totale.toFixed(2) + "€";
    document.getElementById("totale").innerHTML = "Totale: " + totale;
  } 


  //PAGAMENTO
  document.getElementById("bottoni").innerHTML = '<button id="tastoIndietro" type="button" class="btn btn-secondary" style="float: left;" onclick="tornaAiNegozi();return false;">Indietro</button>' +
    '<button id="tastoProsegui" type="button" class="btn btn-warning" style="float: right;" data-bs-toggle="modal" data-bs-target="#exampleModal">Procedi</button><div style="line-height: 10%;"><br></div>' +
    '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog dialog-center">' +
    '<div class="modal-content"><div class="modal-header"><h5 class="modal-title" style="color: darkcyan;" id="exampleModalLabel"><b>Pagamento</b></h5>' +
    '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">' +
    '<div id="formArea" class="mx-auto col-xl-6 col-lg-6 col-md-6 col-sm-8 col-8"><form class="row g-3" id="formId">' +
    '<div class="col-md-12"><label for="nCarta" class="form-label">Numero Carta</label><input type="number" class="form-control" id="nCarta" placeholder="0000-0000-0000-0000" required autofocus>' +
    '</div><div class="col-md-8 col-sm-8 col-8"><label class="form-label">Scadenza</label></div><div class="col-md-4 col-sm-4 col-4"><label for="cvv" class="form-label">CVV</label></div>'+
    '<div class="col-md-4 col-sm-4 col-4" style="margin-top: 0%;"><input type="number" class="form-control" id="mese" placeholder="mm" required autofocus></div>'+
    '<div class="col-md-4 col-sm-4 col-4" style="margin-top: 0%;"><input type="number" class="form-control" id="anno" placeholder="aa" required autofocus>' +
    '</div><div class="col-md-4 col-sm-4 col-4" style="margin-top: 0%;"><input type="number" class="form-control" id="cvv" placeholder="cvv" required></div>' +
    '</form></div></div> <div class="modal-footer"><button id="bottoneAcquista" type="button" class="btn btn-warning" onclick="acquista();return false;">Acquista</button></div></div></div></div>';

    //PER DISABILITARE IL PAGAMENTO IN CASO DI CARRELLO VUOTO
    if (document.getElementById("totale").innerHTML == "<p>Non hai nessun articolo nel tuo carrello<br><br><br><br><br><br><br><br><br><br><br><br><br></p>") {
      document.getElementById("bottoneAcquista").disabled = true;
    }
  
    //MOSTRO I DATI DELLA CARTA SALVATI
  var clienteLoggato = sessionStorage.getItem("clienteLoggato");
  var clienti = JSON.parse(localStorage.getItem("clienti"));
  var dettagliCliente = "";

  for (let i = 0; i < clienti.length; i++) {
    if (clienti[i].email == clienteLoggato) {
      dettagliCliente = clienti[i];
    }
  }
  document.getElementById("nCarta").value = dettagliCliente.numCarta;
  document.getElementById("mese").value = dettagliCliente.mese;
  document.getElementById("anno").value = dettagliCliente.anno;
  document.getElementById("cvv").value = dettagliCliente.cvv;
}

//VADO A PRENDERE ATTRAVERSO LE API I DETTAGLI DEI FILM
function richiediLocandine(movieID, costo) {
  var urlGenerico = "https://api.themoviedb.org/3/movie/";
  var urlDettagli = "?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";
  var urlDettagliFilm = urlGenerico + movieID + urlDettagli;
  var locandine = "";


  var xmlhttpFilm = new XMLHttpRequest();
  xmlhttpFilm.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var dettagliFilm = JSON.parse(this.responseText);

      locandine += '<div class="card mb-5" style="max-width: 600px;"><div class="row g-0"><div class="col-md-4 col-sm-4 col-5">' +
        '<img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + dettagliFilm.poster_path +
        '" alt="Image" class="img-fluid rounded-start" style="width:100%;"> </div><div class="col-md-8 col-sm-8 col-7"><div class="card-body">' +
        '<h5 class="card-title" style="color: #b90909;"><b>' + dettagliFilm.title + '</b></h5><p style="color: black;float:right;">' + costo + '</p><br></div>' +
        '<div class="card-footer bg-transparent"><button type="button" style="float:right;" id="rimuovi' + dettagliFilm.id +
        '" class="btn btn-danger" onclick="rimuovi(' + dettagliFilm.id + ');">Rimuovi</button></div></div></div></div></div>';

      document.getElementById("carrello").innerHTML += locandine;
    }
  }

  xmlhttpFilm.open("GET", urlDettagliFilm, true);
  xmlhttpFilm.send();
}

//FUNZIONE PER RIMUOVERE I FILM DAL CARRELLO E RIAGGIORNARE LA PAGINA CON I FILM RIMASTI
function rimuovi(movieID) {
  var carrello = JSON.parse(sessionStorage.getItem("carrello"));

  acquisti = carrello.acquisti;
  noleggi = carrello.noleggi;

  for (let i = 0; i < acquisti.length; i++) {
    if (acquisti[i] == movieID) {
      acquisti.splice(i, 1);
    }
  }
  for (let i = 0; i < noleggi.length; i++) {
    if (noleggi[i] == movieID) {
      noleggi.splice(i, 1);
    }
  }

  carrello.acquisti = acquisti;
  carrello.noleggi = noleggi;

  sessionStorage.setItem("carrello", JSON.stringify(carrello));
  document.getElementById("carrello").innerHTML = "";
  visualizzaCarrello();
}

//TI RIMANDA ALLA PAGINA DEI NEGOZI
function tornaAiNegozi() {
  window.location = "catalogo.html";

}

//FUNZIONE CHE SALVA L'ACQUISTO E IL PAGAMENTO
function acquista() {
  var nCarta = document.getElementById("nCarta").value;
  var mese = document.getElementById("mese").value;
  var anno = document.getElementById("anno").value;
  var cvv = document.getElementById("cvv").value;

  const data = new Date();

  if ((nCarta.length != 16 && nCarta.length > 0) || nCarta.length == 0) {
    alert("La carta deve contenere 16 numeri");
    return false;
  }

  if (mese.length != 2 && mese.length > 0 || !(mese >= "01" && mese <= "12")) {
    alert("Il mese non è valido");
    return false;
  }

  if (anno.length != 4 && anno.length > 0) {
    alert("L'anno non è valido");
    return false;
  }

  if ((anno == data.getFullYear() && mese < data.getMonth()) || (anno < data.getFullYear() && mese >= "01" && mese <= "12")) {
    alert("La carta è scaduta! Inserire una carta valida");
    return false;
  }


  if ((cvv.length != 3 && cvv.length > 0) || cvv.length == 0) {
    alert("Il cvv deve contenere 3 numeri");
    return false;
  }


  var carrello = JSON.parse(sessionStorage.getItem("carrello"));
  var cliente = sessionStorage.getItem("clienteLoggato");
  var clienti = JSON.parse(localStorage.getItem("clienti"));

  for (let i = 0; i < clienti.length; i++) {
    if (clienti[i].email == cliente) {
      clienti[i].numCarta = document.getElementById("nCarta").value;
      clienti[i].mese = document.getElementById("mese").value;
      clienti[i].anno = document.getElementById("anno").value;
      clienti[i].cvv = document.getElementById("cvv").value;
      localStorage.setItem("clienti", JSON.stringify(clienti));
    }
  }

  //CONTROLLO SE IL LOCAL STORAGE È VUOTO O MENO E INIZIALIZZO L'ARRAY DI  ORDINI
  if (typeof (localStorage.ordini) == "undefined") {
    localStorage.ordini = "[]";
  }

  var o = JSON.parse(localStorage.ordini);
  var nextPosizione = o.length;

  var ordini = {
    data, data,
    negozio: carrello.negozio,
    cliente: cliente,
    acquisti: carrello.acquisti,
    noleggi: carrello.noleggi
  }

  //AGGIUNGO IL NUOVO CLIENTE
  o[nextPosizione] = ordini;
  localStorage.ordini = JSON.stringify(o);
  reinderizzaOrdini();
  return true;

}

function reinderizzaOrdini() {
  window.location = "ordini.html";
  sessionStorage.removeItem("carrello");
}