var optA = ["0", "1", "2", "3"];
var optB = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

let ruletaA = new Ruleta("ruletaA", optA);
ruletaA.Dibujar();

let ruletaB = new Ruleta("ruletaB", optB);
ruletaB.Dibujar();

let ruletaC = new Ruleta("ruletaC", optB);
ruletaC.Dibujar();

let ruletaD = new Ruleta("ruletaD", optB);
ruletaD.Dibujar();


let ruletaE = new Ruleta("ruletaE", optA);
ruletaE.Dibujar();

let ruletaF = new Ruleta("ruletaF", optB);
ruletaF.Dibujar();

let ruletaG = new Ruleta("ruletaG", optB);
ruletaG.Dibujar();

let ruletaH = new Ruleta("ruletaH", optB);
ruletaH.Dibujar();

function Girar(){
    ruletaA.Girar(1200);
    ruletaB.Girar(1200);
    ruletaC.Girar(1500);
    ruletaD.Girar(2000)

    ruletaE.Girar(1300);
    ruletaF.Girar(1300);
    ruletaG.Girar(1400);
    ruletaH.Girar(1800)
    setTimeout('pintar()', 10000)
 

}

function pintar(){
    console.log( resultados);
}


