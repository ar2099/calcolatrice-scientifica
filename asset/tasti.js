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

//creiamo ora una variabile per la moltiplicazione e 
//la divisione (spiegazione più avanti)
let statoOperatore1 = false

//creiamo ora una funzione
//per prendere il valore di un tasto-numero
//quando cliccato

function digitNumber(item) {

    item.addEventListener("click", function () {

        schermo.innerText += item.innerText;
        memoriaBreve = memoriaBreve + item.innerText;
        //spiegazione più avanti
        statoOperatore1 = true;
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
        statoPunto = false;
        //spiegazione più avanti
        statoOperatore1 = true
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
        //se esiste
        if(memoriaBreve !== ""){
            memoriaLunga.push(Number(memoriaBreve));
        }
       
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

// costante per selezionare  gli operatori * e :

const operatore1 = document.querySelectorAll(".operatore1");

//quello che facciamo ora è far si che
//ogni volta che viene cliccato * e :
//il numero creato nella memoria breve venga messo
//in un array più l'operazione eseguita
//attenzione: bisogna anche convertirlo da stringa a numero

function digitOperatore1(item) {

    item.addEventListener("click", function () {

        //ora usiamo lo statoOperatore1
        //è impostato su falso inizialmente,
        //in maniera che non si possa iniziare
        //l'operazione con una moltiplicazione
        //o divisione, e diventa vero
        //quando c'è un numero nell'array
        if(statoOperatore1 == false){
            alert("errore di digitazione. Digita prima un numero")
        } else {
            if((memoriaLunga[memoriaLunga.length -1] == "(")
            && (memoriaBreve === "")){
                alert("errore di digitazione. Digita prima un numero")
            } else
            {
                schermo.innerText += item.innerText;
                //pushiamo il valore convertito nell'array
                if(memoriaBreve !== ""){
                    memoriaLunga.push(Number(memoriaBreve));
                }
                
                //pushiamo l'operatore nell'array
                memoriaLunga.push(item.innerText);

                //puliamo la memoria breve
                memoriaBreve = "";

                //cambiamo lo stato del punto
                statoPunto = true;

                //cambiamo lo stato del operatore1
                //in maniera che non si possa mettere due moltipli
                //o divi di fila
                statoOperatore1 = false;

                // console.log("valore cliccato: " + item.innerText)
                console.log("valore memoria lunga:");
                console.log(memoriaLunga);
            }
           
        }
        
    });
}

//ora usiamo il foreach per applicarla
//a tutti i tasti

operatore1.forEach(digitOperatore1);

// costante per selezionare  l'operatore √

const radice = document.getElementById("radice");

//quello che facciamo ora è far si che
//ogni volta che viene cliccato √
//il numero creato nella memoria breve venga messo
//in un array più l'operazione eseguita
//attenzione: bisogna anche convertirlo da stringa a numero


radice.addEventListener("click", function(){
   
    //Prima del click,
    //se è stato digitato un numero
    //se l'ultimo elemento nella memoria non è un numero
    //se l'array memoria non è vuota
    if ((memoriaBreve !== "") 
    && (isNaN(memoriaLunga[memoriaLunga.length - 1]) == true) 
    && (memoriaLunga[memoriaLunga.length - 1] != 0)){

        //pushiamo il valore convertito nell'array
        memoriaLunga.push(Number(memoriaBreve));
        memoriaLunga.push("+");
        memoriaLunga.push("√");
        memoriaLunga.push("(");

        //puliamo la memoria breve
        memoriaBreve = "";
    }
     //Prima del click,
    //se non è stato digitato un numero
    //se l'array memoria è vuota
    else if ((memoriaBreve === "")
        && (memoriaLunga.length == 0)) {

        //pushiamo il valore convertito nell'array
        memoriaLunga.push("√");
        memoriaLunga.push("(");

        //puliamo la memoria breve
        memoriaBreve = "";
    }

    //Prima del click,
    //se non è stato digitato un numero
    //se l'array memoria non è vuota
    //se l'ultimo elemento nella memoria non è un numero
    else if ((memoriaBreve === "") 
        && (memoriaLunga.length != 0)
        && (isNaN(memoriaLunga[memoriaLunga.length - 1]) == true)) {

        //pushiamo il valore convertito nell'array
        memoriaLunga.push("√");
        memoriaLunga.push("(");

        //puliamo la memoria breve
        memoriaBreve = "";
    }

    
    //puliamo la memoria breve
    memoriaBreve = "";

    //scriviamo tutto a schermo
    schermo.innerText = (memoriaLunga.toString()).replace(/,/g, "");

    
console.log(memoriaLunga)
    
});

// costante per selezionare  l'operatore ^

const potenza = document.getElementById("potenza");

//quello che facciamo ora è far si che
//ogni volta che viene cliccato ^
//il numero creato nella memoria breve venga messo
//in un array più l'operazione eseguita
//attenzione: bisogna anche convertirlo da stringa a numero

potenza.addEventListener("click", function () {
    //Prima del click,
    //se non è stato digitato un numero
    //se l'array memoria è vuota
    if ((memoriaBreve === "")
        && (memoriaLunga.length == 0)) {

        alert("non si può iniziare con un elevamento a potenza")
    }
    //Prima del click,
    //se non è stato digitato un numero
    //se l'array memoria non è vuota
    //se l'ultimo elemento nella memoria non è un numero
    //se l'ultimo elemento nella memoria non è una parentesi
    else if ((memoriaBreve === "")
        && (memoriaLunga.length != 0)
        && (isNaN(memoriaLunga[memoriaLunga.length - 1]) == true)
        && (memoriaLunga[memoriaLunga.length - 1] != ")")) {

        alert("la potenza deve essere attaccata a un numero o a una parentesi")
    }

    //Prima del click,
    //se è stato digitato un numero 
    //o
    //una parentesi
    else if ((memoriaBreve !== "")
        || (memoriaLunga[memoriaLunga.length - 1] == ")")) {

        if (memoriaBreve !== "") {
            memoriaLunga.push(Number(memoriaBreve));
        }
        memoriaLunga.push("^")
        memoriaLunga.push("(")
        schermo.innerText = (memoriaLunga.toString()).replace(/,/g, "");
        console.log(memoriaLunga)

        //puliamo la memoria breve
        memoriaBreve = "";
    }

    
})


// costante per selezionare  l'operatore (
const aperturaParentesi = document.getElementById("aperturaParentesi");

// costante per selezionare  l'operatore )
const chiusuraParentesi = document.getElementById("chiusuraParentesi");