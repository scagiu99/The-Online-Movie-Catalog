//FUNZIONE PER MOSTRARE LE STATISTICHE
function mostraStatistiche() {

    var ordini = JSON.parse(localStorage.getItem("ordini"));
    var negozianteLoggato = sessionStorage.getItem("negozianteLoggato");
    const acquisti = new Map();
    const noleggi = new Map();

    //VADO A RIEMPIRE LE MAPPE METTENDO COME VALORE IL CONTEGGIO DI QUANTE VOLTE È STATO PRESO UN FILM
    for (let i = 0; i < ordini.length; i++) {
        if (ordini[i].negozio == negozianteLoggato) {
            document.getElementById("statisticheAssenti").innerHTML = "";
            for (let j = 0; j < ordini[i].acquisti.length; j++) {
                if (acquisti.get(ordini[i].acquisti[j]) == null) {
                    acquisti.set(ordini[i].acquisti[j], 1);
                } else {
                    acquisti.set(ordini[i].acquisti[j], acquisti.get(ordini[i].acquisti[j]) + 1);
                }
            }
            for (let j = 0; j < ordini[i].noleggi.length; j++) {
                if (noleggi.get(ordini[i].noleggi[j]) == null) {
                    noleggi.set(ordini[i].noleggi[j], 1);
                } else {
                    noleggi.set(ordini[i].noleggi[j], noleggi.get(ordini[i].noleggi[j]) + 1);
                }
            }
        }
    }

    var filmA = "";
    var maxA = 0;

    for (let [k, v] of acquisti) {
        if (v > maxA) {
            filmA = k;
            maxA = v;
        }
    }
    prendiFilmAcquistato(filmA);

    var filmN = "";
    var maxN = 0;

    for (let [k, v] of noleggi) {
        if (v > maxN) {
            filmN = k;
            maxN = v;
        }
    }
    prendiFilmNoleggiato(filmN);

    //CONTEGGIO ULTIMI 7 GIORNI
    var count = 0;
    const dataAttuale = new Date();
    for (let i = 0; i < ordini.length; i++) {
        if (ordini[i].negozio == negozianteLoggato) {
            var dataOrdine = new Date(ordini[i].data);
            var diffData = new Date(dataAttuale - dataOrdine);
            if (Math.floor(diffData / 1000 / 60 / 60) < 168) {
                count += 1;
            }
        }
    }
    for (let i = 0; i < ordini.length; i++) {
        if (ordini[i].negozio == negozianteLoggato) {
            document.getElementById("settimanali").innerHTML = '<label style="color: #b90909;"><b>Ordini totali degli ultimi 7 giorni: </b></label><br>' + count + '<br>';
        }
    }
    //CALCOLO DEL GIORNO CON PIù VENDITE
    giorno = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    var settimana = new Map();
    for (let i = 0; i < ordini.length; i++) {
        if (ordini[i].negozio == negozianteLoggato) {
            var dataOrdine = new Date(ordini[i].data);
            var diffData = new Date(dataAttuale - dataOrdine);
            if (Math.floor(diffData / 1000 / 60 / 60) < 168) {
                if (settimana.get(giorno[dataOrdine.getDay()]) == null) {
                    settimana.set(giorno[dataOrdine.getDay()], 1);
                } else {
                    settimana.set(giorno[dataOrdine.getDay()], settimana.get(giorno[dataOrdine.getDay()]) + 1);
                }
            }
        }
    }

    var giornoMax = "";
    var maxG = 0;

    for (let [k, v] of settimana) {
        if (v > maxG) {
            giornoMax = k;
            maxG = v;
        }
    }
    for (let i = 0; i < ordini.length; i++) {
        if (ordini[i].negozio == negozianteLoggato) {
            document.getElementById("giornoMax").innerHTML = '<label style="color: #b90909;"><b>Giorno della settimana con più ordini: </b></label><br>' + giornoMax;
        }
    }
}

//RICHIESTA DEL FILM ACQUISTATO
function prendiFilmAcquistato(movieID) {
    var urlGenerico = "https://api.themoviedb.org/3/movie/";
    var urlDettagli = "?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";
    var urlDettagliFilm = urlGenerico + movieID + urlDettagli;

    var xmlhttpFilm = new XMLHttpRequest();
    xmlhttpFilm.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dettagliFilm = JSON.parse(this.responseText);


            document.getElementById("acquistoMax").innerHTML = '<label style="color: #b90909;"><b>Il film più venduto è: </b></label><br>' + dettagliFilm.title + '<br>';

        }
    }

    xmlhttpFilm.open("GET", urlDettagliFilm, true);
    xmlhttpFilm.send();
}

//RICHIESTA DEL FILM NOLEGGIATO
function prendiFilmNoleggiato(movieID) {
    var urlGenerico = "https://api.themoviedb.org/3/movie/";
    var urlDettagli = "?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";
    var urlDettagliFilm = urlGenerico + movieID + urlDettagli;

    var xmlhttpFilm = new XMLHttpRequest();
    xmlhttpFilm.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dettagliFilm = JSON.parse(this.responseText);

            document.getElementById("noleggioMax").innerHTML = '<label style="color: #b90909;"><b>Il film più noleggiato è: </b></label><br>' + dettagliFilm.title + '<br>';

        }
    }

    xmlhttpFilm.open("GET", urlDettagliFilm, true);
    xmlhttpFilm.send();
}