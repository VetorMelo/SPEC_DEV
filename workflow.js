// workflow.js
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
    document.getElementById("statusMessage").innerText = `Documento "${docName}" cadastrado. Status: ${documentStatus}`;
    document.getElementById("statusMessage").style.display = "block";

    // Simulação de notificações por email
    alert(`Documento "${docName}" cadastrado. Status: ${documentStatus}`);

    // Fluxo de verificação e aprovação
    setTimeout(() => {
        documentStatus = "Checado";
        alert(`Documento "${docName}" verificado. Status: ${documentStatus}`);
        // Notificar checador por email
    }, 3000);

    setTimeout(() => {
        documentStatus = "Aprovado";
        alert(`Documento "${docName}" aprovado. Status: ${documentStatus}`);
        // Notificar aprovador por email
    }, 6000);
});
