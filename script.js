function isValidGrade(grade) {
    return grade >= 0 && grade <= 10;
}

function calculateAverage(row) {
    var inputNota1 = row.cells[1].querySelector('input');
    var inputNota2 = row.cells[2].querySelector('input');

    var nota1 = parseFloat(inputNota1.value);
    var nota2 = parseFloat(inputNota2.value);

    if (!isValidGrade(nota1)) {
        inputNota1.value = '';
    }
    if (!isValidGrade(nota2)) {
        inputNota2.value = '';
    }

    if (isValidGrade(nota1) && isValidGrade(nota2)) {
        var media = (nota1 + nota2) / 2;
        var exame = (10 - media);
        var backgroundColor, textColor, resultText;

        if (media < 7) {
            backgroundColor = '#ff000030';
            textColor = '#ff0000';
            resultText = "&#9888; NECESÁRIO EXAME &#9888;"; // ⚠️
            row.cells[5].innerHTML = exame.toFixed(1);
        } else {
            backgroundColor = '#00800030';
            textColor = '#008000';
            resultText = "&#9989; APROVADO &#9989;"; // ✅
            row.cells[5].innerHTML = resultText;
        }

        row.cells[3].textContent = media.toFixed(1);
        row.cells[4].innerHTML = resultText;
        row.cells[4].style.backgroundColor = backgroundColor;
        row.cells[5].style.backgroundColor = backgroundColor;
        row.cells[4].style.color = textColor;
        row.cells[5].style.color = textColor;
    }
}

function addRow() {
    const table = document.getElementById('table');
    const row = table.insertRow(table.rows.length);
    row.insertCell(0).innerHTML = '<input type="text" class="input__data" placeholder="Matéria">';
    row.insertCell(1).innerHTML = '<input type="number" class="input__data" min="0" max="10" step="0.1" placeholder="NP1" onchange="calculateAverage(this.parentNode.parentNode)">';
    row.insertCell(2).innerHTML = '<input type="number" class="input__data" min="0" max="10" step="0.1" placeholder="NP2" onchange="calculateAverage(this.parentNode.parentNode)">';
    row.insertCell(3);
    row.insertCell(4);
    row.insertCell(5);
}

function getStandardTextSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Defina o tamanho padrão de acordo com a largura da tela (exemplo)
    let standardSize = 25; // Tamanho de fonte padrão

    if (screenWidth < 1000) {
        standardSize = 10;
    }

    return standardSize;
}

const textSize = getStandardTextSize() + 'px';

function exportToPDF() {
    const pdf = new jsPDF();
    const x = 15;
    const y = 15;
    const table = document.getElementById('table');
    const inputElements = document.querySelectorAll('.input__data');
    const currentFontSize = window.getComputedStyle(table).fontSize;

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

        table.style.fontSize = currentFontSize;
        for (const inputElement of inputElements) {
            inputElement.style.fontSize = currentFontSize;
            inputElement.style.width = '';
            inputElement.style.height = '';
            inputElement.style.backgroundColor = '';
            inputElement.style.textAlign = '';
        }
    });
}