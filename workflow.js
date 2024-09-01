// Função para inicializar o banco de dados IndexedDB
function initializeDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("DocumentStorage", 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("documents")) {
                db.createObjectStore("documents", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject("Erro ao inicializar IndexedDB: " + event.target.errorCode);
        };
    });
}

// Função para salvar arquivo no IndexedDB
function saveFileToIndexedDB(file) {
    return initializeDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["documents"], "readwrite");
            const store = transaction.objectStore("documents");

            const reader = new FileReader();
            reader.onload = function(event) {
                const fileData = event.target.result;
                const fileRecord = { fileName: file.name, fileData };
                const request = store.add(fileRecord);
                request.onsuccess = function() {
                    resolve();
                };
                request.onerror = function() {
                    reject("Erro ao salvar o arquivo no IndexedDB");
                };
            };
            reader.readAsDataURL(file);
        });
    });
}

document.getElementById("documentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const docName = document.getElementById("docName").value;
    const docNumber = document.getElementById("docNumber").value;
    const authorEmail = document.getElementById("authorEmail").value;
    const checkerEmail = document.getElementById("checkerEmail").value;
    const approverEmail = document.getElementById("approverEmail").value;
    const docFile = document.getElementById("docFile").files[0];

    // Verifica se um arquivo foi selecionado
    if (!docFile) {
        alert("Por favor, selecione um arquivo.");
        return;
    }

    // Armazena o documento no localStorage e IndexedDB
    const newDocument = {
        docName,
        docNumber,
        authorEmail,
        checkerEmail,
        approverEmail,
        docFileName: docFile.name,
        status: "Anexado"
    };

    saveFileToIndexedDB(docFile).then(() => {
        saveDocumentToLocalStorage(newDocument);
        updateStatusMessage(docName, newDocument.status);
        alert(`Documento "${docName}" cadastrado. Status: ${newDocument.status}`);

        // Simulação de notificações por email
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
    }).catch(error => {
        console.error(error);
        alert("Erro ao salvar o documento.");
    });
});

// Carregar documentos armazenados ao recarregar a página
function loadDocuments() {
    const documents = JSON.parse(localStorage.getItem('documents')) || [];
    const documentListElement = document.getElementById("documentList");

    documents.forEach(document => {
        const listItem = document.createElement("li");
        listItem.textContent = `Documento: ${document.docName}, Status: ${document.status}`;
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download";
        downloadButton.onclick = () => downloadDocument(document.docFileName);
        listItem.appendChild(downloadButton);
        documentListElement.appendChild(listItem);
    });
}

// Função para baixar um documento
function downloadDocument(fileName) {
    initializeDB().then(db => {
        const transaction = db.transaction(["documents"], "readonly");
        const store = transaction.objectStore("documents");
        const request = store.getAll();

        request.onsuccess = function(event) {
            const documents = event.target.result;
            const fileRecord = documents.find(doc => doc.fileName === fileName);

            if (fileRecord) {
                const link = document.createElement("a");
                link.href = fileRecord.fileData;
                link.download = fileRecord.fileName;
                link.click();
            } else {
                alert("Documento não encontrado.");
            }
        };
    });
}

// Função para salvar os documentos no localStorage
function saveDocumentToLocalStorage(document) {
    let documents = JSON.parse(localStorage.getItem('documents')) || [];
    documents = documents.filter(doc => doc.docFileName !== document.docFileName); // Remove duplicatas
    documents.push(document);
    localStorage.setItem('documents', JSON.stringify(documents));
}

// Chamada para carregar documentos quando a página é carregada
document.addEventListener("DOMContentLoaded", loadDocuments);
