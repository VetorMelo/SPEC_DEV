// script.js
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById("docFile");
    
    formData.append('docFile', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("statusMessage").textContent = data;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById("statusMessage").textContent = 'Erro ao enviar o arquivo.';
    });
});
