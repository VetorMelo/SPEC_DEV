document.getElementById("documentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const docName = document.getElementById("docName").value;
    const docNumber = document.getElementById("docNumber").value;
    const authorEmail = document.getElementById("authorEmail").value;
    const checkerEmail = document.getElementById("checkerEmail").value;
    const approverEmail = document.getElementById("approverEmail").value;
    const docFile = document.getElementById("docFile").files[0];

    // Simulação de armazenamento de documento e fluxo de trabalho
    let documentStatus = "Anexado";
    document.getElementById("statusMessage").innerText = `Documento "${docName}" cadastrado. Status: ${document
