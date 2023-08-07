function calculateAverage(row) {
    var nota1 = parseFloat(row.cells[1].querySelector('input').value);
    var nota2 = parseFloat(row.cells[2].querySelector('input').value);

    if (parseFloat(row.cells[1].querySelector('input').value) > 10 || parseFloat(row.cells[1].querySelector('input').value) < 0) {
        row.cells[1].innerHTML = '<input type="number" min="0" max="10" step="0.1" placeholder="NP1" onchange="calculateAverage(this.parentNode.parentNode)">';
    }

    if (parseFloat(row.cells[2].querySelector('input').value) > 10 || parseFloat(row.cells[2].querySelector('input').value) < 0) {
        row.cells[2].innerHTML = '<input type="number" min="0" max="10" step="0.1" placeholder="NP2" onchange="calculateAverage(this.parentNode.parentNode)">';
    }

    if (parseFloat(row.cells[1].querySelector('input').value) > 0 && parseFloat(row.cells[2].querySelector('input').value) > 0) {
        var media = (nota1 + nota2) / 2;
        row.cells[3].textContent = media.toFixed(1);

        if (row.cells[5].textContent = media < 7) {
            aux = (10 - media);
            row.cells[5].innerHTML = aux.toFixed(1);
            row.cells[4].textContent = "⚠️ NECESÁRIO EXAME ⚠️";
            row.cells[4].style.backgroundColor = '#ff000030';
            row.cells[5].style.backgroundColor = '#ff000030';
            row.cells[4].style.color = '#ff0000';
            row.cells[5].style.color = '#ff0000';
        }
        else {
            row.cells[4].textContent = "✅ APROVADO ✅";
            row.cells[5].innerHTML = '✅ APROVADO ✅';
            row.cells[4].style.backgroundColor = '#00800030';
            row.cells[5].style.backgroundColor = '#00800030';
            row.cells[4].style.color = '#008000';
            row.cells[5].style.color = '#008000';
        }
    }
}

function addRow() {
    var table = document.getElementById('table');
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = '<input type="text" placeholder="Matéria">';
    cell2.innerHTML = '<input type="number" min="0" max="10" step="0.1" placeholder="NP1" onchange="calculateAverage(this.parentNode.parentNode)">';
    cell3.innerHTML = '<input type="number" min="0" max="10" step="0.1" placeholder="NP2" onchange="calculateAverage(this.parentNode.parentNode)">';
    cell4.innerHTML = '-';
    cell5.textContent = '-';
    cell6.textContent = '-';
}

function removeRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}