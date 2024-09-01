document.getElementById("documentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const docName = document.getElementById("docName").value;
    const docNumber = document.getElementById("docNumber").value;
    const authorEmail = document.getElementById("authorEmail").value;
    const checkerEmail = document.getElementById("checkerEmail").value;
    const approverEmail = document.getElementById("approverEmail").value;
    const docFile = document.getElementById("docFile").files[0];

    // Função para atualizar a mensagem de status
    function updateStatusMessage(docName, status) {
        const statusMessageElement = document.getElementById("statusMessage");
        statusMessageElement.innerText = `Documento "${docName}" cadastrado. Status: ${status}`;
        statusMessageElement.style.display = "block";
    }

    // Simulação de armazenamento de documento e fluxo de trabalho
    let documentStatus = "Anexado";
    updateStatusMessage(docName, documentStatus);

    // Simulação de notificações por email
    alert(`Documento "${docName}" cadastrado. Status: ${documentStatus}`);

    // Fluxo de verificação e aprovação
    setTimeout(() => {
        documentStatus = "Checado";
        alert(`Documento "${docName}" verificado. Status: ${documentStatus}`);
        // Notificar checador por email
        updateStatusMessage(docName, documentStatus);
    }, 3000);

    setTimeout(() => {
        documentStatus = "Aprovado";
        alert(`Documento "${docName}" aprovado. Status: ${documentStatus}`);
        // Notificar aprovador por email
        updateStatusMessage(docName, documentStatus);
    }, 6000);
});
