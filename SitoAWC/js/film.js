var PAGINA = 1;
//FUNZIONE CHE RICHIEDE I FILM
function richiestaFilm(num) {
    var urlFilm = "https://api.themoviedb.org/3/movie/now_playing?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it&page=";
    PAGINA = num;
    var urlFilm = urlFilm + num;

    var xmlhttpFilm = new XMLHttpRequest();

    xmlhttpFilm.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var paginaUno = JSON.parse(this.responseText);
            var movies = paginaUno.results;

            //VADO A RIEMPIRE IL MIO PALINSESTO
            for (i = 0; i < movies.length; i++) {
                mostraFilm(movies[i]);
            }

        }
    }

    xmlhttpFilm.open("GET", urlFilm, true);
    xmlhttpFilm.send();
}

//FUNZIONE CHE CHIEDE I DETTAGLI E MOSTRA I FILM
function mostraFilm(movie) {
    var urlGenerico = "https://api.themoviedb.org/3/movie/";
    var urlDettagli = "/credits?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";
    var urlProduzione = urlGenerico + movie.id + urlDettagli;
    var attori = "";
    var regista = "";
    var generi = JSON.parse(localStorage.getItem("generi"));
    var generiTradotti = "";
    var xmlhttpAttori = new XMLHttpRequest();

    xmlhttpAttori.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dettagliFilm = JSON.parse(this.responseText);
            var attore = dettagliFilm.cast;
            var produzione = dettagliFilm.crew;
            var locandine = "";

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

            //TRADUZIONE GENERI
            for (i = 0; i < generi.length; i++) {
                for (j = 0; j < movie.genre_ids.length; j++) {

                    if (movie.genre_ids[j] == generi[i].id) {
                        if (generiTradotti == "") {
                            generiTradotti = generi[i].name;
                        } else {
                            generiTradotti += ", " + generi[i].name;
                        }
                    }

                }
            }
            if (movie.poster_path == null) {
                locandine = '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-5" style="font-size: large;"> ' +
                    '<a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal' + movie.id + '"><img src="image/default.jpeg"' +
                    '" alt="Image" class="img-fluid" style="width:100%;"></a><br><div class="modal fade" id="exampleModal' + movie.id + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> <div class="modal-content">' +
                    '<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel" style="color: #b90909;"><b>' + movie.title +
                    '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
                    '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Anno di pubblicazione </b></h5><p style="text-align:center;">' + movie.release_date + '</p>' +
                    '<h5 style="text-align:center;"><b>Regista </b></h5><p style="text-align:center;">' + regista + '</p>' +
                    '<h5 style="text-align:center;"><b>Attori </b></h5><p style="text-align:center;">' + attori + '</p>' +
                    '<h5 style="text-align:center;"><b>Generi </b></h5><p style="text-align:center;">' + generiTradotti + '</p>';
                if (movie.overview == "") {
                    locandine += '<h5 style="text-align:center;"><b>Trama </b></h5><p style="text-align:center;">Non disponibile</p>' +
                        '</div></div></div></div>';
                } else {
                    locandine += '<h5 style="text-align:center;"><b>Trama </b></h5><p style="text-align:center;">' + movie.overview + '</p>' +
                        '</div></div></div></div>';
                }
            } else {
                locandine = '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-5" style="font-size: large;"> ' +
                    '<a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal' + movie.id + '"><img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + movie.poster_path +
                    '" alt="Image" class="img-fluid" style="width:100%;"></a><br><div class="modal fade" id="exampleModal' + movie.id + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> <div class="modal-content">' +
                    '<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel" style="color: #b90909;"><b>' + movie.title +
                    '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
                    '</b><div class="modal-body fs-6"><h5 style="text-align:center;"><b>Anno di pubblicazione </b></h5><p style="text-align:center;">' + movie.release_date + '</p>' +
                    '<h5 style="text-align:center;"><b>Regista </b></h5><p style="text-align:center;">' + regista + '</p>' +
                    '<h5 style="text-align:center;"><b>Attori </b></h5><p style="text-align:center;">' + attori + '</p>' +
                    '<h5 style="text-align:center;"><b>Generi </b></h5><p style="text-align:center;">' + generiTradotti + '</p>';
                if (movie.overview == "") {
                    locandine += '<h5 style="text-align:center;"><b>Trama </b></h5><p style="text-align:center;">Non disponibile</p>' +
                        '</div></div></div></div>';
                } else {
                    locandine += '<h5 style="text-align:center;"><b>Trama </b></h5><p style="text-align:center;">' + movie.overview + '</p>' +
                        '</div></div></div></div>';
                }
                //'<button type="button" id="bottone' + movie.id +'" class="btn btn-outline-secondary" style="width:100%;" onclick="aggiungi('+ movie.id +');">Aggiungi</button></div>' ;
            }
            var negozianteLoggato = sessionStorage.getItem("negozianteLoggato");
            var negozianti = JSON.parse(localStorage.getItem("negozianti"));
            var negoziante = "";
            var check = false;

            for (let i = 0; i < negozianti.length; i++) {
                if (negozianti[i].nomeNegozio == negozianteLoggato) {
                    negoziante = negozianti[i];
                    //Ciclo sulla vetrina per controllare se è contenuto il film
                    for (let j = 0; j < negoziante.vetrina.length; j++) {
                        if (negoziante.vetrina[j] == movie.id) {
                            check = true;
                        }
                    }
                }
            }
            //Check per aggiungere il tipo di bottone in base a se è contenuto nella vetrina o meno
            if (check == false) {
                locandine += '<button type="button" id="bottone' + movie.id + '" class="btn btn-outline-secondary" style="width:100%;" onclick="aggiungi(' + movie.id + ');">Aggiungi</button></div>';
            } else {
                locandine += '<button type="button" id="bottone' + movie.id + '" class="btn btn-danger" style="width:100%;" onclick="aggiungi(' + movie.id + ');">Rimuovi</button></div>';
            }

            document.getElementById("galleria").innerHTML += locandine;
        }
    }
    xmlhttpAttori.open("GET", urlProduzione, true);
    xmlhttpAttori.send();

}

//BOTTONE PER AGGIUNGERE E TOGLIERE I FILM
function aggiungi(movieID) {
    var negozianteLoggato = sessionStorage.getItem("negozianteLoggato");
    var negozianti = JSON.parse(localStorage.getItem("negozianti"));
    var filmEsposti = [];

    //Inizializzo la variabile film esposti con la vetrina del negozio
    for (let i = 0; i < negozianti.length; i++) {
        if (negozianti[i].nomeNegozio == negozianteLoggato) {
            filmEsposti = negozianti[i].vetrina;
        }
    }

    //Cambio il tipo di bottone al click 
    var bottone = document.getElementById("bottone" + movieID);
    if (bottone.innerHTML == 'Aggiungi') {
        bottone.innerHTML = 'Rimuovi';
        bottone.className = "btn btn-danger";
        filmEsposti.push(movieID);
    } else {
        bottone.innerHTML = 'Aggiungi';
        bottone.className = "btn btn-outline-secondary";
        //Elimino il film dalla vetrina
        for (let i = 0; i < filmEsposti.length; i++) {
            if (filmEsposti[i] == movieID) {
                filmEsposti.splice(i, 1);
            }
        }
    }

    //Aggiorno la vetrina del negozio con la variabile dei film esposti 
    for (let i = 0; i < negozianti.length; i++) {
        if (negozianti[i].nomeNegozio == negozianteLoggato) {
            negozianti[i].vetrina = filmEsposti;
        }
        localStorage.setItem("negozianti", JSON.stringify(negozianti));
    }

}

//SVUOTO LA GALLERIA E LA RIAGGIORNO CON I FILM DELLA NUOVA PAGINA
function svuotaAggiornaGalleria(num) {
    document.getElementById("galleria").innerHTML = "";
    if ((PAGINA + num > 0) && (PAGINA + num < 1001)) {
        document.getElementById("tastoIndietro").disabled = false;
        document.getElementById("numPagina").innerHTML = PAGINA + num;
        if (PAGINA + num <= 1) {
            document.getElementById("tastoIndietro").disabled = true;
        }
        richiestaFilm(PAGINA + num);
    } else {
        document.getElementById("tastoIndietro").disabled = true;
        richiestaFilm(1);

    }

}

//PREMENDO IL TASTO ENTER MI FA LA RICERCA
function keyCode(event) {
    var x = event.keyCode;
    if (x == 13) {
        if (document.getElementById("myInput").value != "") {
            filtraFilm(document.getElementById("myInput").value);
        } else {
            document.getElementById("galleria").innerHTML = "";
            richiestaFilm(1);
        }

    }

}

//MI FILTRA I FILM IN BASE ALLA MIA RICERCA
function filtraFilm(ricerca) {

    var urlCercaFilm = "https://api.themoviedb.org/3/search/movie?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it&query=";

    for (let i = 0; i < ricerca.length; i++) {
        if (ricerca[i] == " ") {
            urlCercaFilm += "%20";
        } else {
            urlCercaFilm += ricerca[i];
        }
    }

    var xmlhttpFilm = new XMLHttpRequest();

    xmlhttpFilm.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("galleria").innerHTML = "";
            var film = JSON.parse(this.responseText);

            if (film.results.length == 0) {
                document.getElementById("galleria").innerHTML = '<p style="text-align:center;"">La ricerca non ha prodotto alcun risultato</p><br><br><br><br><br><br><br><br><br><br><br><br>';
            } else {
                for (i = 0; i < film.results.length; i++) {
                    mostraFilm(film.results[i]);
                }
            }
        }
    }

    xmlhttpFilm.open("GET", urlCercaFilm, true);
    xmlhttpFilm.send();
}