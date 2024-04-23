
function mostrarBienvenida() {
    const nombre = document.getElementById('nombreInput').value.trim();
    const apellido = document.getElementById('apellidoInput').value.trim();

    if (nombre === "" || apellido === "") {
        alert("Por favor, ingresa tu nombre y apellido.");
        return;
    }

    alert("¡Bienvenido, " + nombre + " " + apellido + "! Este es el simulador de contador de kilómetros.");
}

function agregarDatos() {
    const dia = document.getElementById('diaInput').value.trim().toUpperCase();
    const kilometros = parseFloat(document.getElementById('kilometrosInput').value.trim());

    if (!['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'].includes(dia)) {
        alert("Por favor, ingresa un día de la semana válido.");
        return;
    }

    if (isNaN(kilometros) || kilometros <= 0) {
        alert("Por favor, ingresa una cantidad válida de kilómetros.");
        return;
    }

    let datosPorDia = JSON.parse(localStorage.getItem('datosPorDia')) || [];
    datosPorDia.push({ dia: dia, kilometros: kilometros });
    localStorage.setItem('datosPorDia', JSON.stringify(datosPorDia));

    document.getElementById('diaInput').value = "";
    document.getElementById('kilometrosInput').value = "";
}

function mostrarResultados() {
    let datosPorDia = JSON.parse(localStorage.getItem('datosPorDia')) || [];
    let totalKilometros = 0;
    let promedioKilometros = 0;

    let resultadosHTML = "";
    datosPorDia.forEach(dato => {
        resultadosHTML += `<p>${dato.dia}: ${dato.kilometros.toFixed(2)} km</p>`;
        totalKilometros += dato.kilometros;
    });

    if (datosPorDia.length > 0) {
        promedioKilometros = totalKilometros / datosPorDia.length;
    }

    document.getElementById('datosPorDia').innerHTML = resultadosHTML;
    document.getElementById('totalKilometros').textContent = `Total de kilómetros caminados: ${totalKilometros.toFixed(2)} km`;
    document.getElementById('promedioKilometros').textContent = `Promedio de kilómetros caminados: ${promedioKilometros.toFixed(2)} km`;

    document.getElementById('resultados').style.display = 'block';
}