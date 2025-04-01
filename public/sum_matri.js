function generarMatrices(){
    let filas = document.getElementById("filas").value;
    let columnas = document.getElementById("columnas").value;
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

        for (let f = 0; f < filas; f++){
            for(let c = 0; c < columnas; c++){
                let input = document.createElement('input');
                input.type='number';
                input.className=`matriz${i}`;
                matrizDiv.appendChild(input);
            }
        }
        matricesDiv.appendChild(matrizDiv);
    }
}

function sumarMatrices(){
    let matriz1 = Array.from(document.querySelectorAll('.matriz1')).map(input => Number(input.value));
    let matriz2 = Array.from(document.querySelectorAll('.matriz2')).map(input => Number(input.value));

    if (matriz1.some(isNaN) || matriz2.some(isNaN)){
        alert("Ingrese solo valores númericos");
        return;
    }

    if (matriz1.length !== matriz2.length){
        alert("Las matrices deben tener el mismo orden");
        return;
    }

    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    resultadoDiv.style.gridTemplateColumns = document.querySelector('.matriz').style.gridTemplateColumns;

    for(let i = 0; i < matriz1.length; i++){
        let cell = document.createElement('div-matriz');
        cell.textContent = matriz1[i] + matriz2[i];
        resultadoDiv.appendChild(cell);
    }
}