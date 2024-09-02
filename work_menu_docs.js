"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.querySelector("#fileInput");
    const uploadButton = document.querySelector("#uploadButton");
    const fileListElement = document.querySelector("#fileList");

    function renderFileList() {
        const files = getFiles();
        fileListElement.innerHTML = "";

        files.forEach(fileData => {
            const fileURL = URL.createObjectURL(fileData.file);
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${fileData.name}</td>
                <td><input type="text" class="doc-number" placeholder="Número do Documento"></td>
                <td><input type="email" class="author-email" placeholder="Email do Autor"></td>
                <td><input type="email" class="checker-email" placeholder="Email do Checador"></td>
                <td><input type="email" class="approver-email" placeholder="Email do Aprovador"></td>
                <td>
                    <select class="status-select">
                        <option value="analise">Análise</option>
                        <option value="aprovado">Aprovado</option>
                        <option value="reprovado">Reprovado</option>
                    </select>
                </td>
                <td>
                    <button class="delete" data-name="${fileData.name}">Excluir</button>
                </td>
                <td>
                    <a href="${fileURL}" download="${fileData.name}" class="download">Baixar</a>
                </td>
            `;

            fileListElement.appendChild(row);
        });
    }

    function getFiles() {
        const filesData = JSON.parse(localStorage.getItem("files") || "[]");
        return filesData.map(fileData => {
            return {
                name: fileData.name,
                file: new File([fileData.content], fileData.name, { type: fileData.type })
            };
        });
    }

    function addFile(file) {
        const files = getFiles();
        files.push(file);
        localStorage.setItem("files", JSON.stringify(files.map(f => ({
            name: f.name,
            content: f.file, // Aqui é onde precisamos corrigir
            type: f.file.type
        }))));
    }

    function deleteFile(fileName) {
        let files = getFiles();
        files = files.filter(file => file.name !== fileName);
        localStorage.setItem("files", JSON.stringify(files.map(f => ({
            name: f.name,
            content: f.file, // Aqui também precisamos corrigir
            type: f.file.type
        }))));
        renderFileList(); // Atualiza a lista na interface
    }

    uploadButton.addEventListener("click", () => {
        const files = Array.from(fileInput.files);
        if (files.length === 0) {
            alert("Por favor, selecione pelo menos um arquivo.");
            return;
        }

        files.forEach(file => {
            addFile({ name: file.name, file: file });
        });

        fileInput.value = ""; // Limpa o campo de arquivo após o upload
        renderFileList();
    });

    fileListElement.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const fileName = e.target.getAttribute("data-name");
            const confirmation = confirm(`Você realmente deseja excluir o arquivo "${fileName}" permanentemente?`);
            if (confirmation) {
                deleteFile(fileName);
            }
        }
    });

    renderFileList(); // Inicializa a lista de arquivos ao carregar a página
});
