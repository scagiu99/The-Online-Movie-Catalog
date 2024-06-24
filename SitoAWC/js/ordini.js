//FUNZIONE PER MOSTRARE LO STORICO ORDINI
function mostraStoricoOrdini() {
    var ordini = JSON.parse(localStorage.getItem("ordini"));
    var clienteLoggato = sessionStorage.getItem("clienteLoggato");

    //VADO A RICHIEDERE I FILM ACQUISTATI
    for (let i = 0; i < ordini.length; i++) {
        if (ordini[i].cliente == clienteLoggato) {
            document.getElementById("ordini").innerHTML = "";
            for (let j = 0; j < ordini[i].acquisti.length; j++) {
                prendiFilmAcquistato(ordini[i].acquisti[j]);
            }
        }
    }

    //VADO A RICHIEDERE I FILM NOLEGGIATI
    const dataAttuale = new Date();
    for (let i = 0; i < ordini.length; i++) {
        if (ordini[i].cliente == clienteLoggato) {
            var dataOrdine = new Date(ordini[i].data);
            var diffData = new Date(dataAttuale - dataOrdine);
            var tempoMancante = 72 - Math.floor(diffData / 1000 / 60 / 60);
            if (Math.floor(diffData / 1000 / 60 / 60) < 72) {
                for (let j = 0; j < ordini[i].noleggi.length; j++) {
                    prendiFilmNoleggiato(ordini[i].noleggi[j], tempoMancante);
                }
            } else {
                for (let j = 0; j < ordini[i].noleggi.length; j++) {
                    prendiFilmScaduto(ordini[i].noleggi[j]);
                }
            }
        }
    }

}


//RICHIESTA DEI FILM ACQUISTATI
function prendiFilmAcquistato(movieID) {
    var urlGenerico = "https://api.themoviedb.org/3/movie/";
    var urlDettagli = "?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";
    var urlDettagliFilm = urlGenerico + movieID + urlDettagli;

    var xmlhttpFilm = new XMLHttpRequest();
    xmlhttpFilm.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dettagliFilm = JSON.parse(this.responseText);

            document.getElementById("acquistiTitolo").innerHTML = '<h3 class="col-6 tm-text-dark" style="font-family: Georgia, Times New Roman, Times, serif; margin-top: 1%; text-align: center;"><b>Acquisti</b></h3>';

            document.getElementById("acquisti").innerHTML += '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-5" style="font-size: large;"> ' +
            '<img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + dettagliFilm.poster_path + '" alt="Image" class="img-fluid" style="width:100%;"></div>';

        }
    }

    xmlhttpFilm.open("GET", urlDettagliFilm, true);
    xmlhttpFilm.send();
}

//RICHIESTA DEI FILM NOLEGGIATI
function prendiFilmNoleggiato(movieID, tempoMancante) {
    var urlGenerico = "https://api.themoviedb.org/3/movie/";
    var urlDettagli = "?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";
    var urlDettagliFilm = urlGenerico + movieID + urlDettagli;

    var xmlhttpFilm = new XMLHttpRequest();
    xmlhttpFilm.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dettagliFilm = JSON.parse(this.responseText);

            document.getElementById("noleggiTitolo").innerHTML = '<h3 class="col-6 tm-text-dark" style="font-family: Georgia, Times New Roman, Times, serif; margin-top: 1%; text-align: center;"><b>Noleggi</b></h3>';
         
            document.getElementById("noleggi").innerHTML += '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-5" style="font-size: large;"> ' +
            '<img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + dettagliFilm.poster_path + '" alt="Image" class="img-fluid" style="width:100%;"><p>Scade fra '+ tempoMancante + 'h' +'</p></div>';

        }
    }

    xmlhttpFilm.open("GET", urlDettagliFilm, true);
    xmlhttpFilm.send();
}

//RICHIESTA DEI FILM NOLEGGIATI SCADUTI
function prendiFilmScaduto(movieID) {
    var urlGenerico = "https://api.themoviedb.org/3/movie/";
    var urlDettagli = "?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";
    var urlDettagliFilm = urlGenerico + movieID + urlDettagli;

    var xmlhttpFilm = new XMLHttpRequest();
    xmlhttpFilm.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dettagliFilm = JSON.parse(this.responseText);

            document.getElementById("noleggiScadutiTitolo").innerHTML = '<h3 class="col-6 tm-text-dark" style="font-family: Georgia, Times New Roman, Times, serif; margin-top: 1%; text-align: center;"><b>Noleggi Scaduti</b></h3>';

            document.getElementById("noleggiScaduti").innerHTML += '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-5" style="font-size: large;"> ' +
            '<img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + dettagliFilm.poster_path + '" alt="Image" class="img-fluid" style="width:100%;"></div>';

        }
    }

    xmlhttpFilm.open("GET", urlDettagliFilm, true);
    xmlhttpFilm.send();
}