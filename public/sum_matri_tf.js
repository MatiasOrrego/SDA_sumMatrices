//Arhivo js que utiliza TensorFlow.js para sumar matrices de forma aleatoria y mostrar el resultado en la página web

tf.setBackend('cpu').then(() => {
    console.log('Backend configurado a CPU');
});

function generarMatrices(){
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);
    let matricesDiv = document.getElementById("matrices");
    matricesDiv.innerHTML = '';

    if (filas <= 0 || columnas <= 0){
        alert("Ingrese valores válidos para filas y columnas");
        return;
    }

for (let i = 1; i <= 2; i++){
        let matrizDiv = document.createElement("div");
        matrizDiv.className = "matriz";
        matrizDiv.style.display = "grid";
        matrizDiv.style.gridTemplateColumns=`repeat(${columnas},auto)`;

        // Generar matriz aleatoria con TensorFlow
        let matriz = tf.randomUniform([filas, columnas], 0, 10, 'int32').arraySync();
        for (let f = 0; f < filas; f++){
            for(let c = 0; c < columnas; c++){
                let input = document.createElement('input');
                input.type='number';
                input.className=`matriz${i}`;
                input.value = matriz[f][c];
                matrizDiv.appendChild(input);
            }
        }
        matricesDiv.appendChild(matrizDiv);
    }
}    

function sumarMatrices() {
    // Obtener los valores de las matrices desde los inputs
    let matriz1 = Array.from(document.querySelectorAll('.matriz1')).map(cell => Number(cell.value));
    let matriz2 = Array.from(document.querySelectorAll('.matriz2')).map(cell => Number(cell.value));

    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);

    if (matriz1.length !== matriz2.length) {
        alert("Las matrices deben tener el mismo orden");
        return;
    }

    // Convertir las matrices a tensores
    let tensor1 = tf.tensor2d(matriz1, [filas, columnas]);
    let tensor2 = tf.tensor2d(matriz2, [filas, columnas]);

    // Sumar las matrices con TensorFlow
    let resultado = tf.add(tensor1, tensor2).arraySync();

    // Mostrar el resultado
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    resultadoDiv.style.gridTemplateColumns = `repeat(${columnas}, auto)`;

    resultado.forEach(fila => {
        fila.forEach(valor => {
            let cell = document.createElement('div');
            cell.textContent = valor;
            resultadoDiv.appendChild(cell);
        });
    });
}