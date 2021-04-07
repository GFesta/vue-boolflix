const api_url_base = 'https://api.themoviedb.org/3/';
const api_key = '28fd8bc3a7d1855c34222ce81dae240e';
const url_base_locandina = 'https://image.tmdb.org/t/p/';
const dimensione_locandina = 'w342';
const locandina_default = 'img/netflix.png';

var app = new Vue({
    el: '#app',
    data: {
        risultati: [],
        testo_ricerca: '',
        testo_titolo: '',
        ricerca_in_corso: false,
        bandiere_disponibili: ['it', 'en', 'ro']
    },
    methods: {
        ricerca() {

            if(this.testo_ricerca.trim() != '') {

                this.ricerca_in_corso = true;

                //azzero container input e risultati
                this.risultati = [];
                let testo_utente = this.testo_ricerca;
                this.testo_ricerca = '';
                //inserisco il testo cercato nel titolo
                this.testo_titolo = testo_utente;

                let parameters = {
                    params: {
                        api_key: api_key,
                        query: testo_utente
                    }
                };

                //richiamo ajax a TMBD e trovo films
                axios.get(api_url_base + 'search/movie', parameters)
                    .then((risp) => {
                    console.log(risp.data.results);
                    this.risultati = this.risultati.concat(risp.data.results);
                    this.ricerca_in_corso = false;
                });

                // richiamo ajax a TMBD e trovo le serie TV
                axios.get(api_url_base + 'search/tv', parameters)
                    .then((risp) => {
                    // console.log(risp.data.results);
                    this.risultati = this.risultati.concat(risp.data.results);
                    this.ricerca_in_corso = false;
                });

            }
        },
        //voto stars
        getStars(voto) {
            return Math.ceil(voto / 2);
        },
        //flags + languages
        getFlags(lingua) {
            return 'flags/' + lingua + '.png';
        },
        //poster film + dimensione + path
        getPoster(poster_path) {
            if(poster_path) {
                return url_base_locandina + dimensione_locandina + poster_path;
            }
            return locandina_default;
        }
    },
});