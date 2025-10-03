/***************************************************************************************************************
 *
 *   Objetivo: Practicar la lógica de programación
 *             Practicar en el uso de arrow functions
 *             Reforzar el aprendizaje sobre arrays
 *
 *   Tarea: Números romanos y arábicos
 *          Se nos presenta un número formados por pares DL, siendo D un dígito numérico 0-9 y L una letra entre I,V,L,C,M
 *          El valor decimal de DL es D veces el valor romano de L. 
 *                Ejemplo: 5V = 5*5 = 25
 *          El valor del par se suma al del siguiente si L del primer par es mayor o igual al del siguiente par 
 *          o se resta en caso contrario.
 *                Ejemplo: 3C4X = 3*100+4*10 = 340 
 *                         4X3C = - 4 * 10 + 3 * 100 = 260
 * 
 *          Tenemos que transformar el número romano en decimal
 * 
 *   Entrada : Cadena de caracteres con formato DL donde D es un digito numérico 0-9 y L una letra entre I,V,L,C,M
 *             Ejemplo: 2I3I2X9V1X
 *
 *   Salida  : -16       
 *
 ***************************************************************************************************************/