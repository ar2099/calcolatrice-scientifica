// costante per selezionare tutti i numeri
const tuttiNumeri = document.querySelectorAll(".numero");

//costante per selezionare il punto
const punto = document.getElementById("punto");

//costante per selezionare il display dove mostrare
//le operazioni e i risultati
const schermo = document.getElementById("schermo");

//creiamo l'array dove raccogliere i numeri

let memoriaLunga = [];

//creiamo una variabile che contenga
//il numero che stiamo attualmente digitando
let memoriaBreve = "";

//creiamo ora una funzione
//per prendere il valore di un tasto-numero
//quando cliccato

function digitNumber(item) {

    item.addEventListener("click", function () {

        schermo.innerText += item.innerText;
        memoriaBreve = memoriaBreve + item.innerText;

            // console.log( "valore cliccato: " + item.innerText)
            // console.log("valore memoria breve: " + memoriaBreve)
    });
}

//ora usiamo il foreach per applicarla
//a tutti i tasti

tuttiNumeri.forEach(digitNumber);

//creiamo ora una variabile booleana
//per il punto e la funzione per aggiungerlo. 
//Quando viene cliccato
//il punto essa diventa falsa, impedendo che 
//ci siano due punti nello stesso numero

let statoPunto = true;

punto.addEventListener("click", function () {
    if ((statoPunto == true) && (memoriaBreve != "")) {

        schermo.innerText += punto.innerText;
        memoriaBreve = memoriaBreve + punto.innerText;
        statoPunto = false
        // console.log("valore cliccato: " + punto.innerText)
        // console.log("valore memoria breve: " + memoriaBreve)

    } 
    //questo if serve se non è ancora stato digitato nessun numero
    //e cosi aggiunge uno 0
    else if ((statoPunto == true) && (memoriaBreve == "")) {

        schermo.innerText += "0" + punto.innerText;
        memoriaBreve = memoriaBreve + "0" + punto.innerText;
        statoPunto = false
        // console.log("valore cliccato: " + punto.innerText)
        // console.log("valore memoria breve: " + memoriaBreve)

    } else {
        alert("non ci possono essere due punti nello stesso numero")
    }

});

// costante per selezionare  gli operatori + e -

const somma = document.querySelectorAll(".somma");

//quello che facciamo ora è far si che
//ogni volta che viene cliccato + e -
//il numero creato nella memoria breve venga messo
//in un array più l'operazione eseguita
//attenzione: bisogna anche convertirlo da stringa a numero

function digitSomma(item) {

    item.addEventListener("click", function () {

        schermo.innerText += item.innerText;
        //pushiamo il valore convertito nell'array
        memoriaLunga.push(Number(memoriaBreve));
        //pushiamo l'operatore nell'array
        memoriaLunga.push(item.innerText);

        //puliamo la memoria breve
        memoriaBreve = "";

        //cambiamo lo stato del punto
        statoPunto = true;

        // console.log("valore cliccato: " + item.innerText)
        console.log("valore memoria lunga:");
        console.log(memoriaLunga);
    });
}

//ora usiamo il foreach per applicarla
//a tutti i tasti

somma.forEach(digitSomma);
