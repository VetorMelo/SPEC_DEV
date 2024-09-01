"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.querySelector("#fileInput");
    const uploadButton = document.querySelector("#uploadButton");
    const fileListElement = document.querySelector("#fileList");

    function renderFileList() {
        const files = getFiles();
        fileListElement.innerHTML = "";

        files.forEach(file => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${file.name}</td>
                <td>
                    <button class="delete" data-name="${file.name}">Excluir</button>
                </td>
            `;

            fileListElement.appendChild(row);
        });
    }

    function getFiles() {
        return JSON.parse(localStorage.getItem("files") || "[]");
    }

    function addFile(file) {
        const files = getFiles();
        files.push(file);
        localStorage.setItem("files", JSON.stringify(files));
    }

    function deleteFile(fileName) {
        let files = getFiles();
        // Filtra os arquivos, removendo apenas o que corresponde ao nome especificado
        files = files.filter(file => file.name !== fileName);
        localStorage.setItem("files", JSON.stringify(files));
        renderFileList(); // Atualiza a lista na interface
    }

    uploadButton.addEventListener("click", () => {
        const files = Array.from(fileInput.files);
        if (files.length === 0) {
            alert("Por favor, selecione pelo menos um arquivo.");
            return;
        }

        files.forEach(file => {
            addFile({ name: file.name });
        });

        fileInput.value = ""; // Limpa o campo de arquivo após o upload
        renderFileList();
    });

    fileListElement.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const fileName = e.target.getAttribute("data-name");
            const confirmation = confirm(`Você realmente deseja excluir o arquivo "${fileName}" permanentemente?`);
            if (confirmation) {
                deleteFile(fileName); // Chama a função de exclusão com o nome do arquivo correto
            }
        }
    });

    renderFileList(); // Inicializa a lista de arquivos ao carregar a página
});
