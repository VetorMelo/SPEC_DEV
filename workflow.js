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

    // Armazenar o documento no localStorage
    function saveDocumentToLocalStorage(document) {
        let documents = JSON.parse(localStorage.getItem('documents')) || [];
        documents.push(document);
        localStorage.setItem('documents', JSON.stringify(documents));
    }

    // Adicionar o documento ao localStorage
    const newDocument = {
        docName,
        docNumber,
        authorEmail,
        checkerEmail,
        approverEmail,
        docFileName: docFile.name,
        status: "Anexado"
    };

    saveDocumentToLocalStorage(newDocument);
    updateStatusMessage(docName, newDocument.status);

    // Simulação de notificações por email
    alert(`Documento "${docName}" cadastrado. Status: ${newDocument.status}`);

    // Fluxo de verificação e aprovação
    setTimeout(() => {
        newDocument.status = "Checado";
        alert(`Documento "${docName}" verificado. Status: ${newDocument.status}`);
        updateStatusMessage(docName, newDocument.status);
        saveDocumentToLocalStorage(newDocument);
    }, 3000);

    setTimeout(() => {
        newDocument.status = "Aprovado";
        alert(`Documento "${docName}" aprovado. Status: ${newDocument.status}`);
        updateStatusMessage(docName, newDocument.status);
        saveDocumentToLocalStorage(newDocument);
    }, 6000);
});

// Carregar documentos armazenados ao recarregar a página
function loadDocuments() {
    const documents = JSON.parse(localStorage.getItem('documents')) || [];
    const documentListElement = document.getElementById("documentList");

    documents.forEach(document => {
        const listItem = document.createElement("li");
        listItem.textContent = `Documento: ${document.docName}, Status: ${document.status}`;
        documentListElement.appendChild(listItem);
    });
}

// Chamada para carregar documentos quando a página é carregada
document.addEventListener("DOMContentLoaded", loadDocuments);
