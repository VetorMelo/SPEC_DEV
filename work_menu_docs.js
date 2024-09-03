"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.querySelector("#fileInput");
    const uploadButton = document.querySelector("#uploadButton");
    const fileListElement = document.querySelector("#fileList");
    const statusFilter = document.querySelector(".header-select");

    function renderFileList(statusFilterValue = '') {
        const files = getFiles();
        fileListElement.innerHTML = "";

        files.forEach(fileData => {
            // Filtra com base no status se for especificado
            if (statusFilterValue && fileData.status !== statusFilterValue) {
                return; // Não renderiza a linha se o status não corresponder ao filtro
            }

            const fileURL = URL.createObjectURL(fileData.file);
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${fileData.name}</td>
                <td><input type="text" id="doc-info" placeholder="Número do Documento"></td>
                <td><input type="email" id="doc-info" placeholder="Email do Autor"></td>
                <td><input type="email" id="doc-info" placeholder="Email do Checador"></td>
                <td><input type="email" id="doc-info" placeholder="Email do Aprovador"></td>
                <td>
                    <select id="doc-info" data-status="${fileData.status}">
                        <option value="analise" ${fileData.status === 'analise' ? 'selected' : ''}>Análise</option>
                        <option value="aprovado" ${fileData.status === 'aprovado' ? 'selected' : ''}>Aprovado</option>
                        <option value="reprovado" ${fileData.status === 'reprovado' ? 'selected' : ''}>Reprovado</option>
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
                file: new File([fileData.content], fileData.name, { type: fileData.type }),
                status: fileData.status || 'analise' // Adiciona status se não existir
            };
        });
    }

    function addFile(file) {
        const files = getFiles();
        files.push(file);
        localStorage.setItem("files", JSON.stringify(files.map(f => ({
            name: f.name,
            content: f.file,
            type: f.file.type,
            status: f.status // Adiciona status ao armazenamento
        }))));
    }

    function deleteFile(fileName) {
        let files = getFiles();
        files = files.filter(file => file.name !== fileName);
        localStorage.setItem("files", JSON.stringify(files.map(f => ({
            name: f.name,
            content: f.file,
            type: f.file.type,
            status: f.status // Adiciona status ao armazenamento
        }))));
        renderFileList(statusFilter.value); // Atualiza a lista na interface
    }

    uploadButton.addEventListener("click", () => {
        const files = Array.from(fileInput.files);
        if (files.length === 0) {
            alert("Por favor, selecione pelo menos um arquivo.");
            return;
        }

        files.forEach(file => {
            addFile({ name: file.name, file: file, status: 'analise' }); // Define um status padrão para arquivos novos
        });

        fileInput.value = ""; // Limpa o campo de arquivo após o upload
        renderFileList(statusFilter.value); // Renderiza a lista com base no filtro atual
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

    statusFilter.addEventListener("change", () => {
        renderFileList(statusFilter.value); // Renderiza a lista com base no filtro selecionado
    });

    renderFileList(); // Inicializa a lista de arquivos ao carregar a página
});
