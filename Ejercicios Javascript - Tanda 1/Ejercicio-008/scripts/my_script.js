/***************************************************************************************************************
 *
 *   Objetivo: Reflexionar sobre el tipo de estructura de programación a emplear que permita resolver la tarea
 *             de la forma más eficiente
 * 
 *   Tarea: Solicitar al usuario el porcentaje de acierto en un examen tipo test 
 *          Mostrar la cualificación según la nota según la siguiente tabla
 *
 *                Cualificación    Porcentaje
 *                     A             90-100
 *                     B             80-90
 *                     C             70-79
 *                     D             60-69
 *                     F             0-59
 *
 *   Entrada : número entero entre 0 y 100 (ambos incluidos): nota
 *
 *   Salida  : El examen se cualifica con un XXX
 *
 ***************************************************************************************************************/
/*
function resultado(nota){
    let msg="F"
    //if (nota >= 90) {
    //    msg = "A";
    //} else if (nota >= 80) {
    //    msg = "B";
    //} else if (nota >= 70) {
    //    msg = "C";
    //} else if (nota >= 60) {
    //    msg = "D";
    //}
    switch(nota){
        case nota<=59:
            msg="F"
            break
        case nota>=60&&nota<=69:
            msg="D"
            break
        case nota>=70&&nota<=79:
            msg="C"
            break
        case nota>=80&&nota<=89:
            msg="B"
            break
        case nota>=90&&nota<=100:
            msg="A"
            break
    }
    return msg
}*/

const cualificaciones=[
    {
        cal:"A",
        min:90,
        max:100
    },
    {
        cal:"B",
        min:80,
        max:89
    },
    {
        cal:"C",
        min:70,
        max:79
    },
    {
        cal:"D",
        min:60,
        max:69
    },
    {
        cal:"F",
        min:0,
        max:59
    }
]

let nota=parseInt(prompt("Numero de aciertos: "))
while(isNaN(nota)||nota<0||nota>100||nota===""){
    nota=parseInt(prompt("Numero de aciertos: "))
}
let letra=cualificaciones.find(el=>nota>=el.min&&nota<el.max).cal
console.log(`El examen se cualifica con una ${letra}`)


/*let msg=resultado(nota)
console.log(`El examen se cualifica con una ${msg}`)*/