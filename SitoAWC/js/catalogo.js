//MOSTRO I NEGOZI
function mostraNegozi() {
  var negozianti = JSON.parse(localStorage.getItem("negozianti"));
  var negozio = "";
  var count = 0;
  sessionStorage.removeItem("catalogo");
  for (let i = 0; i < negozianti.length; i++) {
    negozio = '<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-5 card" style="font-size: large;"><img src="image/poster' + count + '.jpeg"alt="Image" class="card-img-top" style="width:100%;">' +
      '<div class="card-body"><h3 class="card-title" style="color: #b90909;text-align:center;"><b>' + negozianti[i].nomeNegozio + '</b></h3></div>' +
      '<button class="btn btn-outline-secondary col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12" style="width:100%;" type="button"  id= "' + negozianti[i].nomeNegozio + '" onclick="mostraCatalogoNegozio(this.id )">Visita Negozio</button>';
    if (count == 10) {
      count = 0;
    } else {
      count += 1;
    }
    document.getElementById("galleria").innerHTML += negozio;
  }

}

//Visualizzo i film del negozio selezionato
function mostraCatalogoNegozio(nNegozio) {

  var carrello = {
    negozio: nNegozio,
    acquisti: [],
    noleggi: []
  }

  sessionStorage.setItem("carrello", JSON.stringify(carrello));

  document.getElementById("galleria").innerHTML = "";

  document.getElementById("nomeNegozio").innerHTML = nNegozio;
  document.getElementById("ricerca").innerHTML = '<input type="search" id="myInput" class="form-control" placeholder="Cerca.." aria-label="Search" onkeyup="filtraFilm(this.value);"></input>';
  document.getElementById("tastoIndietro").style.display = 'block';
  document.getElementById("tastoCarrello").style.display = 'block';

  mostraLocandina(nNegozio);

}

//PER RICHIAMARE LA FUNZIONE CHE RICHIEDE I FILM
function mostraLocandina(nNegozio) {

  document.getElementById("galleria").innerHTML = "";
  var negozianti = JSON.parse(localStorage.getItem("negozianti"));

  for (let i = 0; i < negozianti.length; i++) {
    if (negozianti[i].nomeNegozio == nNegozio) {
      var vetrina = negozianti[i].vetrina;
      if (vetrina.length == 0) {
        document.getElementById("ricerca").innerHTML = "";
        document.getElementById("galleria").innerHTML = '<p style="text-align:center;">Questo negoziante non ha ancora messo in vendita nessun film </p><br><br><br><br><br><br><br><br><br><br><br><br><br>';
      } else {
        for (let k = 0; k < vetrina.length; k++) {
          prendiDettagliFilm(vetrina[k]);
        }
      }
    }
  }

}

//VADO A PRENDERE ATTRAVERSO LE API I DETTAGLI DEI FILM
function prendiDettagliFilm(movieID) {
  var urlGenerico = "https://api.themoviedb.org/3/movie/";
  var urlDettagli = "?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";
  var urlDettagliFilm = urlGenerico + movieID + urlDettagli;

  var xmlhttpFilm = new XMLHttpRequest();
  xmlhttpFilm.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var dettagliFilm = JSON.parse(this.responseText);
      mostraFilm(dettagliFilm);

    }
  }

  xmlhttpFilm.open("GET", urlDettagliFilm, true);
  xmlhttpFilm.send();
}

//FUNZIONE CHE CHIEDE I DETTAGLI DEGLI ATTORI E DEI REGISTI E MOSTRA I FILM
function mostraFilm(movie) {
  var urlGenerico = "https://api.themoviedb.org/3/movie/";
  var urlDettagli = "/credits?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";
  var urlProduzione = urlGenerico + movie.id + urlDettagli;
  var attori = "";
  var regista = "";
  var locandine = "";
  var generi = "";
  var xmlhttpAttori = new XMLHttpRequest();

  xmlhttpAttori.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var dettagliFilm = JSON.parse(this.responseText);
      var attore = dettagliFilm.cast;
      var produzione = dettagliFilm.crew;

      //PER PRENDERE GLI ATTORI
      for (i = 0; i < attore.length; i++) {
        if (attori == "") {
          attori = attore[0].name;
        } else {
          attori += ", " + attore[i].name;
        }
      }
      //RICERCA DEL REGISTA
      for (i = 0; i < produzione.length; i++) {
        if (produzione[i].job == "Director") {
          regista = produzione[i].name;
        }
      }

      var filmPreferiti = false;
      var clienteLoggato = sessionStorage.getItem("clienteLoggato");
      var clienti = JSON.parse(localStorage.getItem("clienti"));
      var dettagliCliente = "";

      for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].email == clienteLoggato) {
          dettagliCliente = clienti[i];
        }
      }
      var arrayGenere = [];
      //CICLO SUI GENERI
      for (let i = 0; i < movie.genres.length; i++) {
        if (i == (movie.genres.length - 1)) {
          generi += movie.genres[i].name;
        } else {
          generi += movie.genres[i].name + ", ";
        }
        arrayGenere.push(movie.genres[i].name);
      }

      //PER METTERE IN EVIDENZA I FILM DEL GENERE PREFERITO DAL CLIENTE
      for (let i = 0; i < movie.genres.length; i++) {
        if (movie.genres[i].name == dettagliCliente.genere) {
          filmPreferiti = true;
        }
      }

      //INIZIALIZZO SESSION STORAGE DI CATALOGO
      if (typeof (sessionStorage.catalogo) == "undefined") {
        sessionStorage.catalogo = "[]";
      }

      var c = JSON.parse(sessionStorage.catalogo);
      var nextPosizione = c.length;

      var catalogo = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        regista: regista,
        attori: attori,
        generi: arrayGenere
      }
      //RIEMPIO IL SESSION STORAGE
      c[nextPosizione] = catalogo;
      sessionStorage.catalogo = JSON.stringify(c);

      if (filmPreferiti == true) {
        locandine += '<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-5 card text-dark border-1 border-dark h-100" style="font-size: large;background-color:#e4e8ff;"><div class="row g-0"><div class="col-xl-4 col-lg-3 col-md-3 col-sm-4 col-3">' +
          '<a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal' + movie.id + '"><img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + movie.poster_path +
          '" alt="Image" class="card-img-top" style="width:100%;"></a> </div><div class="col-xl-8 col-lg-9 col-md-7 col-sm-8 col-9"> <div class="card-body">' +
          '<h5 class="card-title" style="color: #b90909;"><b>' + movie.title + '</b></h5>' +
          '<div class="modal fade" id="exampleModal' + movie.id + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
          '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> <div class="modal-content"> <div class="modal-header"><h5 class="modal-title" id="exampleModalLabel" style="color: #b90909;"><b>' + movie.title +
          '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';

        if (movie.overview == "") {
          locandine += '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Trama</b></h5> <p style="text-align:center;">Non Disponibile</p>' +
            '<h5 style="text-align:center;"><b>Attori</b></h5><p style="text-align:center;">' + attori + '</p>' + '</div></div></div></div>' +
            '<p class="card-text fs-6"><b>Anno di pubblicazione:</b>&nbsp;' + movie.release_date + '<br>' + '<b>Regista:</b>&nbsp;' + regista + '<br>' +
            '<b>Generi:</b>&nbsp;' + generi + '</p></div></div>';
        } else {
          locandine += '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Trama </b></h5><p style="text-align:center;">' + movie.overview + '</p>' +
            '<h5 style="text-align:center;"><b>Attori</b></h5><p style="text-align:center;">' + attori + '</p>' + '</div></div></div></div>' +
            '<p class="card-text fs-6"><b>Anno di pubblicazione:</b>&nbsp;' + movie.release_date + '<br>' + '<b>Regista:</b>&nbsp;' + regista + '<br>' +
            '<b>Generi:</b>&nbsp;' + generi + '</p></div></div>';
        }

      } else {
        locandine += '<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-5 card h-100" style="font-size: large;"><div class="row g-0"><div class="col-xl-4 col-lg-3 col-md-3 col-sm-4 col-3">' +
          '<a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal' + movie.id + '"><img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + movie.poster_path +
          '" alt="Image" class="card-img-top" style="width:100%;"></a> </div><div class="col-xl-8 col-lg-9 col-md-7 col-sm-8 col-9"> <div class="card-body">' +
          '<h5 class="card-title" style="color: #b90909;"><b>' + movie.title + '</b></h5>' +
          '<div class="modal fade" id="exampleModal' + movie.id + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
          '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> <div class="modal-content"> <div class="modal-header"><h5 class="modal-title" id="exampleModalLabel" style="color: #b90909;"><b>' + movie.title +
          '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';

        if (movie.overview == "") {
          locandine += '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Trama</b></h5><p style="text-align:center;"> Non Disponibile</p>' +
            '<h5 style="text-align:center;"><b>Attori</b></h5><p style="text-align:center;">' + attori + '</p>' + '</div></div></div></div>' +
            '<p class="card-text fs-6"><b>Anno di pubblicazione:</b>&nbsp;' + movie.release_date + '<br>' + '<b>Regista:</b>&nbsp;' + regista + '<br>' +
            '<b>Generi:</b>&nbsp;' + generi + '</p></div></div>';
        } else {
          locandine += '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Trama </b></h5><p style="text-align:center;">' + movie.overview + '</p>' +
            '<h5 style="text-align:center;"><b>Attori</b></h5><p style="text-align:center;">' + attori + '</p>' + '</div></div></div></div>' +
            '<p class="card-text fs-6"><b>Anno di pubblicazione:</b>&nbsp;' + movie.release_date + '<br>' + '<b>Regista:</b>&nbsp;' + regista + '<br>' +
            '<b>Generi:</b>&nbsp;' + generi + '</p></div></div>';
        }
      }


      var carrello = JSON.parse(sessionStorage.getItem("carrello"));
      var ordini = JSON.parse(localStorage.getItem("ordini"));
      var clienteLoggato = sessionStorage.getItem("clienteLoggato");
      var checkNoleggio = false;
      var checkAcquisto = false;
      var checkAcquistoPerpetuo = false;
      var checkNoleggioValido = false;
      const dataAttuale = new Date();

      //Ciclo sul carrello per controllare se è contenuto il film
      for (let j = 0; j < carrello.acquisti.length; j++) {
        if (carrello.acquisti[j] == movie.id) {
          checkAcquisto = true;
        }
      }
      for (let j = 0; j < carrello.noleggi.length; j++) {
        if (carrello.noleggi[j] == movie.id) {
          checkNoleggio = true;
        }
      }

      //Controllo se ho già comprato o noleggiato il film per vedere se poterlo riacquistare oppure no
      for (let j = 0; j < ordini.length; j++) {
        if (ordini[j].cliente == clienteLoggato) {
          for (let k = 0; k < ordini[j].acquisti.length; k++) {
            if (ordini[j].acquisti[k] == movie.id) {
              checkAcquistoPerpetuo = true;
            }
          }
          for (let k = 0; k < ordini[j].noleggi.length; k++) {
            if (ordini[j].noleggi[k] == movie.id) {
              var dataOrdine = new Date(ordini[j].data);
              var diffData = new Date(dataAttuale - dataOrdine);
              if (Math.floor(diffData / 1000 / 60 / 60) < 72) {
                checkNoleggioValido = true;
              }
            }
          }
        }
      }

      //Check per aggiungere il tipo di bottone in base a se è contenuto nel carrello/nello storico ordini o meno
      if (checkAcquistoPerpetuo == true) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + movie.id + '" class="btn btn-secondary" disabled>Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + movie.id + '" class="btn btn-secondary" onclick="acquistoNonDisponibile(' + movie.id + ');" disabled>Acquista 12,99€</button></div></div></div>';
      } else if (checkNoleggioValido == true) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + movie.id + '" class="btn btn-secondary" onclick="acquistoNonDisponibile(' + movie.id + ');" disabled>Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + movie.id + '" class="btn btn-secondary" disabled>Acquista 12,99€</button></div></div></div>';
      } else if (checkNoleggio == false && checkAcquisto == false) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + movie.id + '" class="btn btn-warning" onclick="noleggia(' + movie.id + ');">Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + movie.id + '" class="btn btn-warning" onclick="acquista(' + movie.id + ');">Acquista 12,99€</button></div></div></div>';
      } else if (checkAcquisto == true) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + movie.id + '" class="btn btn-warning" disabled>Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + movie.id + '" class="btn btn-secondary" onclick="acquista(' + movie.id + ');">Acquista 12,99€</button></div></div></div>';
      } else if (checkNoleggio == true) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + movie.id + '" class="btn btn-secondary" onclick="noleggia(' + movie.id + ');">Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + movie.id + '" class="btn btn-warning" disabled>Acquista 12,99€</button></div></div></div>';
      }

      document.getElementById("galleria").innerHTML += locandine;
    }
  }
  xmlhttpAttori.open("GET", urlProduzione, true);
  xmlhttpAttori.send();

}

//FUNZIONE PER FILTRARE LA RICERCA
function filtraFilm(ricerca) {
  document.getElementById("galleria").innerHTML = "<br><br><br><br><br><br><br><br><br>";

  var locandine = "";
  var catalogo = JSON.parse(sessionStorage.getItem("catalogo"));


  var clienteLoggato = sessionStorage.getItem("clienteLoggato");
  var clienti = JSON.parse(localStorage.getItem("clienti"));
  var dettagliCliente = "";

  for (let i = 0; i < clienti.length; i++) {
    if (clienti[i].email == clienteLoggato) {
      dettagliCliente = clienti[i];
    }
  }

  for (let i = 0; i < catalogo.length; i++) {
    if (catalogo[i].title.toLowerCase().includes(ricerca.toLowerCase())) {
      //PER METTERE IN EVIDENZA I FILM DEL GENERE PREFERITO DAL CLIENTE
      var filmPreferiti = false;
      for (let j = 0; j < catalogo[i].generi.length; j++) {
        if (catalogo[i].generi[j] == dettagliCliente.genere) {
          filmPreferiti = true;
        }
      }

      if (filmPreferiti == true) {
        locandine += '<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-5 card text-dark border-1 border-dark h-100" style="font-size: large;background-color:#e4e8ff;"><div class="row g-0"><div class="col-xl-4 col-lg-3 col-md-3 col-sm-4 col-3">' +
          '<a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal' + catalogo[i].id + '"><img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + catalogo[i].poster_path +
          '" alt="Image" class="card-img-top" style="width:100%;"></a> </div><div class="col-xl-8 col-lg-9 col-md-7 col-sm-8 col-9"> <div class="card-body">' +
          '<h5 class="card-title" style="color: #b90909;"><b>' + catalogo[i].title + '</b></h5>' +
          '<div class="modal fade" id="exampleModal' + catalogo[i].id + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
          '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> <div class="modal-content"> <div class="modal-header"><h5 class="modal-title" id="exampleModalLabel" style="color: #b90909;"><b>' + catalogo[i].title +
          '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';

        if (catalogo[i].overview == "") {
          locandine += '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Trama</b></h5> <p style="text-align:center;">Non Disponibile</p>' +
            '<h5 style="text-align:center;"><b>Attori</b></h5><p style="text-align:center;">' + catalogo[i].attori + '</p>' + '</div></div></div></div>' +
            '<p class="card-text fs-6"><b>Anno di pubblicazione:</b>&nbsp;' + catalogo[i].release_date + '<br>' + '<b>Regista:</b>&nbsp;' + catalogo[i].regista + '<br>' +
            '<b>Generi:</b>&nbsp;' + catalogo[i].generi + '</p></div></div>';
        } else {
          locandine += '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Trama </b></h5><p style="text-align:center;">' + catalogo[i].overview + '</p>' +
            '<h5 style="text-align:center;"><b>Attori</b></h5><p style="text-align:center;">' + catalogo[i].attori + '</p>' + '</div></div></div></div>' +
            '<p class="card-text fs-6"><b>Anno di pubblicazione:</b>&nbsp;' + catalogo[i].release_date + '<br>' + '<b>Regista:</b>&nbsp;' + catalogo[i].regista + '<br>' +
            '<b>Generi:</b>&nbsp;' + catalogo[i].generi + '</p></div></div>';
        }

      } else {
        locandine += '<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-5 card h-100" style="font-size: large;"><div class="row g-0"><div class="col-xl-4 col-lg-3 col-md-3 col-sm-4 col-3">' +
          '<a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal' + catalogo[i].id + '"><img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + catalogo[i].poster_path +
          '" alt="Image" class="card-img-top" style="width:100%;"></a> </div><div class="col-xl-8 col-lg-9 col-md-7 col-sm-8 col-9"> <div class="card-body">' +
          '<h5 class="card-title" style="color: #b90909;"><b>' + catalogo[i].title + '</b></h5>' +
          '<div class="modal fade" id="exampleModal' + catalogo[i].id + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
          '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> <div class="modal-content"> <div class="modal-header"><h5 class="modal-title" id="exampleModalLabel" style="color: #b90909;"><b>' + catalogo[i].title +
          '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';

        if (catalogo[i].overview == "") {
          locandine += '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Trama</b></h5><p style="text-align:center;"> Non Disponibile</p>' +
            '<h5 style="text-align:center;"><b>Attori</b></h5><p style="text-align:center;">' + catalogo[i].attori + '</p>' + '</div></div></div></div>' +
            '<p class="card-text fs-6"><b>Anno di pubblicazione:</b>&nbsp;' + catalogo[i].release_date + '<br>' + '<b>Regista:</b>&nbsp;' + catalogo[i].regista + '<br>' +
            '<b>Generi:</b>&nbsp;' + catalogo[i].generi + '</p></div></div>';
        } else {
          locandine += '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Trama </b></h5><p style="text-align:center;">' + catalogo[i].overview + '</p>' +
            '<h5 style="text-align:center;"><b>Attori</b></h5><p style="text-align:center;">' + catalogo[i].attori + '</p>' + '</div></div></div></div>' +
            '<p class="card-text fs-6"><b>Anno di pubblicazione:</b>&nbsp;' + catalogo[i].release_date + '<br>' + '<b>Regista:</b>&nbsp;' + catalogo[i].regista + '<br>' +
            '<b>Generi:</b>&nbsp;' + catalogo[i].generi + '</p></div></div>';
        }
      }

      var carrello = JSON.parse(sessionStorage.getItem("carrello"));
      var ordini = JSON.parse(localStorage.getItem("ordini"));
      var clienteLoggato = sessionStorage.getItem("clienteLoggato");
      var checkNoleggio = false;
      var checkAcquisto = false;
      var checkAcquistoPerpetuo = false;
      var checkNoleggioValido = false;
      const dataAttuale = new Date();

      //Ciclo sul carrello per controllare se è contenuto il film
      for (let j = 0; j < carrello.acquisti.length; j++) {
        if (carrello.acquisti[j] == catalogo[i].id) {
          checkAcquisto = true;
        }
      }
      for (let j = 0; j < carrello.noleggi.length; j++) {
        if (carrello.noleggi[j] == catalogo[i].id) {
          checkNoleggio = true;
        }
      }

      //Controllo se ho già comprato o noleggiato il film per vedere se poterlo riacquistare oppure no
      for (let j = 0; j < ordini.length; j++) {
        if (ordini[j].cliente == clienteLoggato) {
          for (let k = 0; k < ordini[j].acquisti.length; k++) {
            if (ordini[j].acquisti[k] == catalogo[i].id) {
              checkAcquistoPerpetuo = true;
            }
          }
          for (let k = 0; k < ordini[j].noleggi.length; k++) {
            if (ordini[j].noleggi[k] == catalogo[i].id) {
              var dataOrdine = new Date(ordini[j].data);
              var diffData = new Date(dataAttuale - dataOrdine);
              if (Math.floor(diffData / 1000 / 60 / 60) < 72) {
                checkNoleggioValido = true;
              }
            }
          }
        }
      }

      //Check per aggiungere il tipo di bottone in base a se è contenuto nel carrello/nello storico ordini o meno
      if (checkAcquistoPerpetuo == true) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + catalogo[i].id + '" class="btn btn-secondary" disabled>Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + catalogo[i].id + '" class="btn btn-secondary" onclick="acquistoNonDisponibile(' + catalogo[i].id + ');" disabled>Acquista 12,99€</button></div></div></div>';
      } else if (checkNoleggioValido == true) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + catalogo[i].id + '" class="btn btn-secondary" onclick="acquistoNonDisponibile(' + catalogo[i].id + ');" disabled>Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + catalogo[i].id + '" class="btn btn-secondary" disabled>Acquista 12,99€</button></div></div></div>';
      } else if (checkNoleggio == false && checkAcquisto == false) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + catalogo[i].id + '" class="btn btn-warning" onclick="noleggia(' + catalogo[i].id + ');">Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + catalogo[i].id + '" class="btn btn-warning" onclick="acquista(' + catalogo[i].id + ');">Acquista 12,99€</button></div></div></div>';
      } else if (checkAcquisto == true) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + catalogo[i].id + '" class="btn btn-warning" disabled>Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + catalogo[i].id + '" class="btn btn-secondary" onclick="acquista(' + catalogo[i].id + ');">Acquista 12,99€</button></div></div></div>';
      } else if (checkNoleggio == true) {
        locandine += '<div class="card-footer bg-transparent"><button type="button" style="float:left;" id="noleggia' + catalogo[i].id + '" class="btn btn-secondary" onclick="noleggia(' + catalogo[i].id + ');">Noleggia 4,99€</button>' +
          '<button type="button" style="float:right;" id="acquista' + catalogo[i].id + '" class="btn btn-warning" disabled>Acquista 12,99€</button></div></div></div>';
      }
    }
  }

  if (ricerca == undefined) {
    mostraCatalogoNegozio(document.getElementById("nomeNegozio").value);
  } else if (locandine == "" && ricerca != undefined) {
    document.getElementById("galleria").innerHTML = '<p style="text-align:center;"">La ricerca non ha prodotto alcun risultato</p><br><br><br><br><br><br><br><br><br><br><br><br>';
  } else {
    document.getElementById("galleria").innerHTML += locandine;
  }

}


//TORNA INDIETRO E NASCONDE I PULSANTI
function tornaAiNegozi() {
  document.getElementById("galleria").innerHTML = "";
  document.getElementById("nomeNegozio").innerHTML = "Negozi";
  document.getElementById("tastoIndietro").style.display = 'none';
  document.getElementById("tastoCarrello").style.display = 'none';
  sessionStorage.removeItem("carrelloAcquisti");
  sessionStorage.removeItem("carrelloNoleggi");
  mostraNegozi();
}

/**************************************************************************************************************************************/


//TI RIMANDA AL CARRELLO
function vaiAlCarrello() {
  window.location = "carrello.html";

}

//BOTTONE PER ACQUISTARE E TOGLIERE I FILM
function acquista(movieID) {
  var acquisti = [];
  var carrello = JSON.parse(sessionStorage.getItem("carrello"));

  acquisti = carrello.acquisti;

  //Cambio il tipo di bottone al click 
  var bottoneAcquisto = document.getElementById("acquista" + movieID);
  var bottoneNoleggio = document.getElementById("noleggia" + movieID);

  if (bottoneAcquisto.className == "btn btn-warning") {
    bottoneAcquisto.className = "btn btn-secondary";
    bottoneNoleggio.disabled = true;
    acquisti.push(movieID);
  } else {
    bottoneAcquisto.className = "btn btn-warning";
    bottoneNoleggio.disabled = false;
    //Elimino il film dagli acquisti
    for (let i = 0; i < acquisti.length; i++) {
      if (acquisti[i] == movieID) {
        acquisti.splice(i, 1);
      }
    }
  }

  //Aggiorno gli acquisti del cliente con la variabile dei film acquistati
  carrello.acquisti = acquisti;

  sessionStorage.setItem("carrello", JSON.stringify(carrello));

}

//BOTTONE PER NOLEGGIARE E TOGLIERE I FILM
function noleggia(movieID) {
  var noleggi = [];
  var carrello = JSON.parse(sessionStorage.getItem("carrello"));

  noleggi = carrello.noleggi;

  //Cambio il tipo di bottone al click 
  var bottoneNoleggio = document.getElementById("noleggia" + movieID);
  var bottoneAcquisto = document.getElementById("acquista" + movieID);

  if (bottoneNoleggio.className == "btn btn-warning") {
    bottoneNoleggio.className = "btn btn-secondary";
    bottoneAcquisto.disabled = true;
    noleggi.push(movieID);
  } else {
    bottoneNoleggio.className = "btn btn-warning";
    bottoneAcquisto.disabled = false;
    //Elimino il film dai noleggi
    for (let i = 0; i < noleggi.length; i++) {
      if (noleggi[i] == movieID) {
        noleggi.splice(i, 1);
      }
    }
  }

  //Aggiorno i noleggi del cliente con la variabile dei film noleggiati
  carrello.noleggi = noleggi;

  sessionStorage.setItem("carrello", JSON.stringify(carrello));

}

//Se il film è già stato comprato, non è più comprabile
function acquistoNonDisponibile(movieID) {
  var bottoneNoleggio = document.getElementById("noleggia" + movieID);
  var bottoneAcquisto = document.getElementById("acquista" + movieID);
  bottoneAcquisto.disabled = true;
  bottoneNoleggio.disabled = true;

}