var punteggio;
var volte;
var sequenza;
var sequenza_inserita;
var finito;

/*
* Funzione visualizzata all'inizio. Visualizziamo le regole del gioco e facciamo iniziare il gioco tramite la funzione inizia_gioco().
*/
function rules() {
	var rules="Premere sui pulsanti nella stessa sequenza in cui si spengono\n Il gioco inizierà appena chiusa questa finestra!\n Inserisci il tuo nome:";
	var nome = prompt(rules);
	nome = ((nome==null) ? 'Ospite' : nome);
	document.getElementById("nome").innerHTML = document.getElementById("nome").innerHTML.concat(nome);
	inizio_gioco();
}

/*
* Inizializziamo le variabili globali. Il punteggio a zero e il numero di volte che devono lampeggiare i quadrati
*/
function inizio_gioco() {
	punteggio=0;
	volte=3;
	aggiungiListener();
	inizia(volte);
}

/*
* Inizializziamo a vuoto la sequenza inserita e quella generata, richiamiamo la funzione per inizializzare l'array di controllo.
* Richiamiamo la funzione per visualizzare la sequenza.
*/
function inizia(volte) {
	sequenza_inserita="";
	sequenza="";
	inizializza_array(volte);
	colora(volte);
}

/*
* Inizializziamo l'array di controllo a falso
*/
function inizializza_array(volte) {
	var i=0;
	finito = new Array();
	for(i=0;i<volte;i++) {
		finito.push(false);
	}
}

/*
* Funzione che tiene conto dei quadrati visualizzati
*/
function ritorna_true() {
	var i=0;
	for(i=0;i<finito.length;i++) {
		if(finito[i] == false) {
			finito[i] = true;
			break;
		}
	}
}

/*
* Funzione per testare l'array di controllo è completamente pieno
*/
function testa_array() {
	var tutti_true=true;
	var i=0;
	for(i=0;i<finito.length;i++) {
		if(finito[i] == false) {
			tutti_true=false;
		}
	}
	return tutti_true;
}

/*
* Funzione che aggiunge i listener (registrano il fatto che il componente possa essere cliccato). 
* Così ogni quadrato quando cliccato aggiunge un numero 
*/
function aggiungiListener() {
	//alert("arrivato!");
	document.getElementById("q1").addEventListener("click", function() {aggiungi_seq_ins("1");});
	document.getElementById("q2").addEventListener("click", function() {aggiungi_seq_ins("2");});
	document.getElementById("q3").addEventListener("click", function() {aggiungi_seq_ins("3");});
	document.getElementById("q4").addEventListener("click", function() {aggiungi_seq_ins("4");});
}

/*
* Testo l'array di controllo per vedere se ho finito di fare la sequenza. Se la sequenza è finita, controllo che
* la lunghezza della stringa generata dai click del giocatore sia uguale a quella generata dal computer. Se lo è,
* finalmente confronto le due stringhe e controllo che il giocatore abbia inserito la sequenza esatta. Se è esatta
* rinizio il gioco con un passo in più, altrimemti stampo il punteggio. 
*/
function aggiungi_seq_ins(numero) {
	if(testa_array()) {
		sequenza_inserita+=numero;
		if(sequenza_inserita.length == sequenza.length) {
			if(sequenza_inserita==sequenza) {
				alert("Perfetto sequenza indovinata!");
				punteggio += 100;
				var testo = "Punteggio Attuale: ";
				document.getElementById("p_attuale").innerHTML = testo.concat(punteggio);
				volte+=1;
				inizia(volte);
			} else {
				 alert("Hai perso! \nIl tuo punteggio è: ");
				 document.getElementById('button_restart').style.display = 'block';
			}
		}
	}	
}

/*
* Funziona che colora un quadrato e lo riporta al suo colore originale dopo mezzo secondo. Lo fa per il numero di volte passato in parametro,
* generando la sequenza casuale.
*/
function colora(volte) {
	var i=0;
	var millis = 0;
	for(i=0;i<volte;i++) {
		millis=1000*i;
		setTimeout(function() {colora_quadrato();}, millis);
		setTimeout(function() {colora_originale();}, millis+500);
	}
	setTimeout(function(){alert('Tocca a te!');},millis+1000);
}

/*
*Funzione che colora tutti i quadrati del loro colore di partenza
*/
function colora_originale() {
	document.getElementById( "q1" ).style.backgroundColor = "red";
	document.getElementById( "q2" ).style.backgroundColor = "green";
	document.getElementById( "q3" ).style.backgroundColor = "blue";
	document.getElementById( "q4" ).style.backgroundColor = "yellow";
}

/*
* Funzione che colora di bianco un quadrato a caso. Richiamata più volte, genera l'effettiva sequenza.
*/
function colora_quadrato() {
	var quad = (Math.random()*100);
	var id="q";
	if(quad<25) {
		id+="1";
		sequenza += "1";
		}
	if(quad>=25 && quad <50) {
		id+="2";
		sequenza+="2";
	}
	if(quad>=50 && quad <75) {
		id+="3";
		sequenza+="3";
	}
	if(quad>=75) {
		sequenza+="4";
		id+="4";
	}
	var div = document.getElementById( id );
	div.style.backgroundColor = 'white';
	ritorna_true();
}

