sessionStorage.clear();

//RICHIEDO I GENERI DEI FILM E LI SALVO NEL LOCAL STORAGE
function caricaGeneri() {
    var urlGeneri = "https://api.themoviedb.org/3/genre/movie/list?api_key=d3231592f48b2779d8324c6f653e0eaf&language=it";

    var xmlhttpGeneri = new XMLHttpRequest();

    xmlhttpGeneri.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var genere = JSON.parse(this.responseText);
            var generi = genere.genres;

            //INIZIALIZZO LOCAL STORAGE DI GENERI
            if (typeof (localStorage.generi) == "undefined") {
                localStorage.generi = "[]";
            }

            var g = JSON.parse(localStorage.generi);

            //RIEMPIO IL LOCAL STORAGE CON I GENERI
            for (i = 0; i < generi.length; i++) {
                g[i] = generi[i];
                localStorage.generi = JSON.stringify(g);
            }

        }
    }
    xmlhttpGeneri.open("GET", urlGeneri, true);
    xmlhttpGeneri.send();

}

//CARICO LO STORAGE ALL'AVVIO
function caricaStorage() {
    var urlClienti = "http://localhost:8888/ProgettoAWC/database/clienti.json";

    var xmlhttpClienti = new XMLHttpRequest();

    xmlhttpClienti.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var clienti = JSON.parse(this.responseText);

            if (typeof (localStorage.clienti) == "undefined") {
                localStorage.setItem("clienti", JSON.stringify(clienti));
            }

        }
    }
    xmlhttpClienti.open("GET", urlClienti, true);
    xmlhttpClienti.send();


    var urlNegozianti = "http://localhost:8888/ProgettoAWC/database/negozianti.json";

    var xmlhttpNegozianti = new XMLHttpRequest();

    xmlhttpNegozianti.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var negozianti = JSON.parse(this.responseText);

            if (typeof (localStorage.negozianti) == "undefined") {
                localStorage.setItem("negozianti", JSON.stringify(negozianti));
            }

        }
    }
    xmlhttpNegozianti.open("GET", urlNegozianti, true);
    xmlhttpNegozianti.send();


    var urlOrdini = "http://localhost:8888/ProgettoAWC/database/ordini.json";

    var xmlhttpOrdini = new XMLHttpRequest();

    xmlhttpOrdini.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ordini = JSON.parse(this.responseText);

            if (typeof (localStorage.ordini) == "undefined") {
                localStorage.setItem("ordini", JSON.stringify(ordini));
            }

        }
    }
    xmlhttpOrdini.open("GET", urlOrdini, true);
    xmlhttpOrdini.send();
}