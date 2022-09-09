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

function risoluzioneSemplice(array) {
    //questa variabile verra usata spesso per
    //creare un array filtrata o con operazioni
    //svolte per poi farla coincidere con l'array originale
    let memoriaTransitoria;

    //array partenza
    // console.log("array partenza")
    // console.log(array);
    //ANCHOR POTENZA E RADICE

    //lo stato ci servirà per il ciclo while
    let stato3 = false;

    //questo ci servirà per evitare bug se non ci fossero * o :
    if (
        array.some((element) => element == "^") == false &&
        array.some((element) => element == "√") == false
    ) {
        stato3 = true;
    }

    //ecco il ciclo vero e proprio
    while (stato3 == false) {
        let trovatorePotenza = array.indexOf("^");
        let trovatoreRadice = array.indexOf("√");
        let trovatore;
        if (trovatorePotenza < trovatoreRadice && trovatorePotenza != -1) {
            trovatore = trovatorePotenza;
            array[trovatore] = array[trovatore - 1] ** array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if (trovatorePotenza > trovatoreRadice && trovatoreRadice == -1) {
            trovatore = trovatorePotenza;
            array[trovatore] = array[trovatore - 1] ** array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if (trovatorePotenza > trovatoreRadice && trovatoreRadice != -1) {
            trovatore = trovatoreRadice;
            array[trovatore] = Math.sqrt(array[trovatore + 1]);
            array[trovatore + 1] = "rifiuto";
        } else if (trovatorePotenza < trovatoreRadice && trovatorePotenza == -1) {
            trovatore = trovatoreRadice;
            array[trovatore] = Math.sqrt(array[trovatore + 1]);
            array[trovatore + 1] = "rifiuto";
        } else if (trovatorePotenza == -1 && trovatoreRadice == -1) {
            stato3 = true;
        }
        memoriaTransitoria = array.filter((valore) => valore != "rifiuto");
        array = memoriaTransitoria;
        memoriaTransitoria = [];
    }

    //dopo potenza e radice
    // console.log("dopo potenza e radice");
    // console.log(array)
    // ANCHOR somma - e +
    //prima semplificazione

    //lo stato ci servirà per il ciclo while
    let stato1 = false;


    //questo ci servirà per evitare bug se non ci fossero + o -
    if (
        array.some((element) => element == "+") == false &&
        array.some((element) => element == "-") == false
    ) {
        stato1 = true;
    }


    //il ciclo vero e proprio della prima semplificazione
    while (stato1 == false) {
        for (i = 0; i < array.length; i++) {
            if (array[i] == "-" && array[i + 1] == "-") {
                array[i] = "+";
                array[i + 1] = "rifiuto";
            } else if ((array[i] == "-" || array[i] == "+") && array[i + 1] == "+") {
                array[i + 1] = "rifiuto";
            } else if (
                (array[i + 1] == "-" || array[i + 1] == "+") &&
                array[i] == "+"
            ) {
                array[i] = "rifiuto";
            }
        }
        if (array.some((element) => element == "rifiuto") == false) {
            stato1 = true;
        } else {
            memoriaTransitoria = array.filter((valore) => valore != "rifiuto");

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
    memoriaTransitoria = array.filter((valore) => valore != "+");
    array = memoriaTransitoria;
    memoriaTransitoria = [];

    //riduciamo i - in questa configurazione : "-", ":/*", "-"
    for (i = 0; i < array.length; i++) {
        if (array[i] == "*" || array[i] == ":") {
            if (array[i - 1] == "-" && array[i + 1] == "-") {
                array[i - 1] = "rifiuto";
            }
        }
    }
    memoriaTransitoria = array.filter((valore) => valore != "rifiuto");
    array = memoriaTransitoria;
    memoriaTransitoria = [];

    //spostiamo i -: "-", "*/:", "number"
    for (i = 0; i < array.length; i++) {
        if (array[i] == "*" || array[i] == ":") {
            if (array[i - 1] == "-" && isNaN(array[i + 1]) == false) {
                array[i - 1] = array[i];
                array[i] = "-";
            }
        }
    }

    memoriaTransitoria = array.filter((valore) => valore != "rifiuto");
    array = memoriaTransitoria;
    memoriaTransitoria = [];

    //diamo i valori negativi ai numeri
    for (i = 0; i < array.length; i++) {
        if (isNaN(array[i]) == false && array[i - 1] == "-") {
            array[i] = -array[i];
        }
    }

    //rimuoviamo i -
    memoriaTransitoria = array.filter((valore) => valore != "-");
    array = memoriaTransitoria;
    memoriaTransitoria = [];


    //semplificazione
    // console.log("semplificazione");
    // console.log(array)

    //semplificazione - e + finita

    //ANCHOR MOLTIPLICAZIONI E DIVISIONI

    //lo stato ci servirà per il ciclo while
    let stato2 = false;

    //questo ci servirà per evitare bug se non ci fossero * o :
    if (
        array.some((element) => element == "*") == false &&
        array.some((element) => element == ":") == false
    ) {
        stato2 = true;
    }

    //ecco il ciclo vero e proprio
    while (stato2 == false) {
        let trovatoreMoltiplicazione = array.indexOf("*");
        let trovatoreDivisioni = array.indexOf(":");
        let trovatore;
        if (
            trovatoreMoltiplicazione < trovatoreDivisioni &&
            trovatoreMoltiplicazione != -1
        ) {
            trovatore = trovatoreMoltiplicazione;
            array[trovatore] = array[trovatore - 1] * array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if (
            trovatoreMoltiplicazione > trovatoreDivisioni &&
            trovatoreDivisioni == -1
        ) {
            trovatore = trovatoreMoltiplicazione;
            array[trovatore] = array[trovatore - 1] * array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if (
            trovatoreMoltiplicazione > trovatoreDivisioni &&
            trovatoreDivisioni != -1
        ) {
            trovatore = trovatoreDivisioni;
            array[trovatore] = array[trovatore - 1] / array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if (
            trovatoreMoltiplicazione < trovatoreDivisioni &&
            trovatoreMoltiplicazione == -1
        ) {
            trovatore = trovatoreDivisioni;
            array[trovatore] = array[trovatore - 1] / array[trovatore + 1];
            array[trovatore - 1] = "rifiuto";
            array[trovatore + 1] = "rifiuto";
        } else if (trovatoreMoltiplicazione == -1 && trovatoreDivisioni == -1) {
            stato2 = true;
        }
        memoriaTransitoria = array.filter((valore) => valore != "rifiuto");
        array = memoriaTransitoria;
        memoriaTransitoria = [];
    }

    // //moltiplicazioni e divisioni
    // console.log("moltiplicazioni e divisioni");
    // console.log(array)

    function sommaArray(total, num) {
        return total + num;
    }

    array = array.reduce(sommaArray);

    // //somma
    // console.log("somma");
    // console.log(array)

    return array;
}

//ANCHOR PARENTESI (non funziona)
function risoluzioneComplessa(array) {
    if (array.some((element) => element == "(") == false) {
        let risposta = risoluzioneSemplice(array);
        array = risposta;
        console.log("risposta " + array);
        return array;
    } else {
        while (array.some((element) => element == "(") == true) {
            let aperturaParentesi = array.lastIndexOf("(");
            let chiusuraParentesi = array.indexOf(")", aperturaParentesi);
            let arrayTransitoria = array;
            arrayTransitoria = arrayTransitoria.slice(
                aperturaParentesi + 1,
                chiusuraParentesi
            );

            let arrayTransitoria2 = risoluzioneSemplice(arrayTransitoria);

            array.splice(
                aperturaParentesi,
                chiusuraParentesi - aperturaParentesi + 1,
                arrayTransitoria2
            );

            //Controllo
            // console.log("fine parentesi");
            // console.log(array);
        }

        let risposta = risoluzioneSemplice(array);
        array = risposta;
        console.log("risposta " + array);
        return array;
    }
}

let arrayProva = ["-", "-", 3, "*", 5, "^", 2, "-", "√", 9];

let provax = [8, ":", 2, "*", "(", 2, "+", 2, ")"]

// risoluzioneSemplice(arrayProva);

let arrayProva2 = [
    "(",
    5,
    "-",
    3,
    ")",
    "^",
    "(",
    "-",
    "-",
    3,
    ")",
    "-",
    "√",
    "(",
    7,
    "+",
    3,
    "-",
    3,
    "^",
    "(",
    2,
    ")",
    ")",
];
risoluzioneComplessa(provax);
