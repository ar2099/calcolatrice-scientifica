/*
ANCHOR MACRO SPIEGAZIONE 1
Per prima cosa dobbiamo creare una funzione che
risolva equazioni semplici (senza parentesi), per
poi utilizzarla per risolvere in ordine le parentesi.
La funzione dovrà rispettare le regole
matematiche dell'ordine di risoluzione delle operazioni
e delle semplificazioni in questo ordine
-) sommare i vari - e + fino ad associarli ai numeri rimuovendo i doppi -- e ++
-) risolvere radici e potenze 
-) risolvere da sinistra a destra moltiplicazioni e divisioni
-) sommare tutti i numeri
*/

function risoluzioneSemplice(array){

    //questa variabile verra usata spesso per
    //creare un array filtrata o con operazioni
    //svolte per poi farla coincidere con l'array originale
    let memoriaTransitoria;

    // ANCHOR somma - e +
    //prima semplificazione

    //lo stato ci servirà per il ciclo while
    let stato1 = false;

    //questo ci servirà per evitare bug se non ci fossero + o -
    if (array.some((element) => element == "+") == false) {
        stato1 = true;
    } else if (array.some((element) => element == "-") == false) {
        stato1 = true;
    }

    //il ciclo vero e proprio della prima semplificazione
    while(stato1 == false){
        for (i = 0; i < array.length; i++) {
            if (array[i] == "-" && array[i + 1] == "-") {
                array[i] = "+";
                array[i + 1] = "rifiuto"
            } else if ((array[i] == "-" || array[i] == "+") && (array[i + 1] == "+")) {
                array[i + 1] = "rifiuto"
            } else if ((array[i + 1] == "-" || array[i + 1] == "+") && (array[i] == "+")) {
                array[i] = "rifiuto"
            }
            
        }
        if (array.some((element) => element == "rifiuto") != true) {
            stato1 = true;
        } else {
            memoriaTransitoria = array.filter(valore => valore != "rifiuto");
            array = memoriaTransitoria;
            memoriaTransitoria = [];
        }
    }
    
   

    //FUNZIONA
    //ora dobbiamo fare un ulteriore filtraggio:
    //come avrai notato se metti un array tipo [10,"-", "-", "*", "-", "+", 5, "+", "-", 7]
    //otterrai questo risultato = [10, '+', '*', '-', 5, '-', 7];
    //ora dobbiamo semplificare questi
    
    //rimuoviamo i +
    memoriaTransitoria = array.filter(valore => valore != "+");
    array = memoriaTransitoria;
    memoriaTransitoria = [];

     //riduciamo i - in questa configurazione : "-", ":/*", "-"
     for(i = 0; i < array.length; i++){
        if((array[i] == "*") || (array[i] == ":")) {
            if ((array[i - 1] == "-") && (array[i + 1] == "-")){
                array[i-1] = "rifiuto"
            }
        }
        }
    memoriaTransitoria = array.filter(valore => valore != "rifiuto");
    array = memoriaTransitoria;
    memoriaTransitoria = [];

    //spostiamo i -: "-", "*/:", "number"
    for (i = 0; i < array.length; i++) {
        if ((array[i] == "*") || (array[i] == ":")) {
            if ((array[i - 1] == "-") && (isNaN(array[i + 1])  == false)) {
                array[i - 1] = array[i];
                array[i] = "-"
            }
        }
    }

    memoriaTransitoria = array.filter(valore => valore != "rifiuto");
    array = memoriaTransitoria;
    memoriaTransitoria = [];


    //diamo i valori negativi ai numeri
    for (i = 0; i < array.length; i++){
        if ((isNaN(array[i]) == false) && (array[i -1] == "-")){
            array[i] = - array[i]
        }
    }

    //rimuoviamo i -
    memoriaTransitoria = array.filter(valore => valore != "-");
    array = memoriaTransitoria;
    memoriaTransitoria = [];


    //semplificazione - e + finita

    //ANCHOR MOLTIPLICAZIONI E DIVISIONI

    //lo stato ci servirà per il ciclo while
    let stato2 = false;

    //questo ci servirà per evitare bug se non ci fossero * o :
    if ((array.some((element) => element == "*") == false) && (array.some((element) => element == ":") == false)) {
        stato2 = true;
    } 

    //ecco il ciclo vero e proprio
    while(stato2 == false){
        let trovatoreMoltiplicazione = array.indexOf("*");
        let trovatoreDivisioni = array.indexOf(":");
        let trovatore;
        if((trovatoreMoltiplicazione < trovatoreDivisioni) && ( trovatoreMoltiplicazione != -1)){
            trovatore = trovatoreMoltiplicazione;
           array[trovatore] = array[trovatore - 1] * array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if ((trovatoreMoltiplicazione > trovatoreDivisioni) && (trovatoreDivisioni == -1)){
            trovatore = trovatoreMoltiplicazione;
            array[trovatore] = array[trovatore - 1] * array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if ((trovatoreMoltiplicazione > trovatoreDivisioni) && (trovatoreDivisioni != -1)) {
            trovatore = trovatoreDivisioni;
            array[trovatore] = array[trovatore - 1] / array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if ((trovatoreMoltiplicazione < trovatoreDivisioni) && (trovatoreMoltiplicazione == -1)) {
            trovatore = trovatoreDivisioni;
            array[trovatore] = array[trovatore - 1] / array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if ((trovatoreMoltiplicazione == -1) && (trovatoreDivisioni == -1)){
            stato2 = true
        }
        memoriaTransitoria = array.filter(valore => valore != "rifiuto");
        array = memoriaTransitoria;
        memoriaTransitoria = [];

        
    }


    

    return array;
}

let arrayProva = [10, "*", 5, "*", "-", 0.5, "-", "-", "-", ":", 5, "-", 10];
console.log(arrayProva)
console.log(risoluzioneSemplice(arrayProva))
