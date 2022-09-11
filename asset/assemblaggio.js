//creiamo il tasto =
const uguale = document.getElementById("uguale")

//creiamo il il valore di approssimazione

const approssimazione = document.getElementById("apr");

//impostiamo la funzione uguale per risolvere l'equazione
uguale.addEventListener("click", function(){
    //aggiungiamo all'array memoriaLunga l'eventuale ultimo numero
    if(memoriaBreve !== ""){
        memoriaLunga.push(Number(memoriaBreve))

        //azzeriamo la memoria breve
        memoriaBreve = ""
    }

    //mettiamo i controlli affinchè si posso eseguire l'operazione
    //1) la memoria lunga non deve essere vuota
    if(memoriaLunga.length == 0){
        alert("nessun valore digitato")
    } else{
        //il conto parentesi deve essere uguale a 0
        if(contoParentesi != 0){
            alert("parentesi ancora aperte")
        } else {
            //l'ultimo valore nell'array lunga deve essere o una chiusura parentesi o un numero
            if ((memoriaLunga[memoriaLunga.length - 1] == ")") || (isNaN(memoriaLunga[memoriaLunga.length - 1]) == false)){
                let soluzione = (Math.round(risoluzioneComplessa(memoriaLunga) * (10 ** approssimazione.value))) / 10 ** (approssimazione.value) ;
                console.log(soluzione);
                schermo.innerText = soluzione;
                memoriaLunga = [];
                memoriaBreve = "";
                memoriaLunga.push(soluzione);
                console.log(approssimazione.value)
            } else {
                alert("non puoi chiudere una operazione così")
            }
        }
    }

})