function calculateAverage(row) {
    const nota1Input = row.cells[1].querySelector('input');
    const nota2Input = row.cells[2].querySelector('input');

    const nota1 = parseFloat(nota1Input.value);
    const nota2 = parseFloat(nota2Input.value);

    const inputOutOfRange = nota => nota > 10 || nota < 0;

    if (inputOutOfRange(nota1)) {
        nota1Input.outerHTML = '<input type="number" min="0" max="10" step="0.1" placeholder="NP1" onchange="calculateAverage(this.parentNode.parentNode)">';
    }

    if (inputOutOfRange(nota2)) {
        nota2Input.outerHTML = '<input type="number" min="0" max="10" step="0.1" placeholder="NP2" onchange="calculateAverage(this.parentNode.parentNode)">';
    }

    if (nota1 > 0 && nota2 > 0) {
        const media = (nota1 + nota2) / 2;
        const exameRequired = media < 7;
        const aux = exameRequired ? (10 - media).toFixed(1) : '';
        const statusText = exameRequired ? '⚠️ NECESÁRIO EXAME ⚠️' : '✅ APROVADO ✅';
        const backgroundColor = exameRequired ? '#ff000030' : '#00800030';
        const textColor = exameRequired ? '#ff0000' : '#008000';

        row.cells[3].textContent = media.toFixed(1);
        row.cells[4].textContent = statusText;
        row.cells[5].innerHTML = aux;
        row.cells[4].style.backgroundColor = backgroundColor;
        row.cells[5].style.backgroundColor = backgroundColor;
        row.cells[4].style.color = textColor;
        row.cells[5].style.color = textColor;
    }
}

function addRow() {
    const table = document.getElementById('table');
    const row = table.insertRow(table.rows.length);
    const inputsHTML = '<input type="number" class="input__data" min="0" max="10" step="0.1" placeholder="NP1" onchange="calculateAverage(this.parentNode.parentNode)">';

    row.insertCell(0).innerHTML = '<input type="text" class="input__data" placeholder="Matéria">';
    row.insertCell(1).innerHTML = inputsHTML;
    row.insertCell(2).innerHTML = inputsHTML;
    row.insertCell(3);
    row.insertCell(4);
    row.insertCell(5);
}

function getStandardTextSize() {
    const screenWidth = window.innerWidth;
    return screenWidth < 1000 ? 10 : 25;
}

const textSize = getStandardTextSize() + 'px';

function exportToPDF() {
    const pdf = new jsPDF();
    const x = 15;
    const y = 15;
    const table = document.getElementById('table');
    const inputElements = document.querySelectorAll('.input__data');

    table.style.fontSize = textSize;

    for (const inputElement of inputElements) {
        inputElement.style.fontSize = textSize;
        inputElement.style.width = '95%';
        inputElement.style.height = '95%';
        inputElement.style.backgroundColor = 'transparent';
        inputElement.style.textAlign = 'center';
    }

    html2canvas(table).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        pdf.text('Notas UNIP - por @pedro.hrqe', x, y);
        pdf.addImage(imgData, 'PNG', x, y + 10, 180, 0);

        pdf.text('@pedro.hrqe', 90, 290);
        pdf.save('Notas_UNIP.pdf');
    });
}
