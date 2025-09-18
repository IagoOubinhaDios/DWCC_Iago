/***************************************************************************************************************
 *
 *   Objetivo: Aprender a solicitar datos al usuario mediante métodos del objeto window
 *
 *   Tarea: Solicitar al usuario que visita la página su nombre 
 *          Mostrar un mensaje de bienvenida en la consola del navegador
 *
 *   Entrada : cadena de caracteres (nombre de la persona)
 *
 *   Salida  : Bienvenido a mi página, XXXX   (XXXX será el nombre del usuario que visita la página)
 *
 ***************************************************************************************************************/
let pregunta=prompt("Cuál es tu nombre?")
console.log(`Bienvenido a mi página, ${pregunta}`)

/*let confirma=confirm("Confirma que has leído el mensaje")
console.log(confirma);

let msg=confirma?"Has leído el mensaje":"Lee el mensaje, por favor"
alert(msg)*/
