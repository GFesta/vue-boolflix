const apiUrlPrincipale = 'https://api.themoviedb.org/3/';
const apiMyKey = '28fd8bc3a7d1855c34222ce81dae240e';


var app = new Vue({
    el: '#app',
    data: {
        trovati: [],
        ricerca: '',
        titolo: '',
        ricercaInCorso: false,
        
    },
    methods: {
        ricercaFilm() {

            if(this.ricerca.trim() != '') {
                this.ricercaInCorso = true;

                //azzero container input e risultati
                this.trovati = [];
                let textUser = this.textSearch;
                this.textSearch = '';

                //inserisco il testo cercato nel titolo
                this.titolo = textUser;

                let parameters = {
                    params: {
                        apiMyKey: apiMyKey,
                        query: textUser
                    }
                };

                //richiamo ajax a TMBD e trovo films
                axios
                .get(apiUrlPrincipale + 'search/movie', parameters)
                .then((risp) => {
                    this.trovati = this.trovati.concat(risp.data.results);
                    //console.log(risp.data.results);
                    this.ricercaInCorso = false;
                });
                //richiamo ajax a TMBD e trovo le serie TV
                axios
                .get(apiUrlPrincipale + 'search/tv', parameters)
                .then((risp) => {
                    this.trovati = this.trovati.concat(risp.data.results);
                    this.ricercaInCorso = false;
                })
            }
            
        },
        get_numero_stelle(voto) {
            return Math.ceil(voto / 2);
        },
        
    },
});