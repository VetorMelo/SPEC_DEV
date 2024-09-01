// Função para carregar documentos armazenados no servidor
function loadDocuments() {
    fetch('http://localhost:3000/documents')
        .then(response => response.json())
        .then(files => {
            const documentListElement = document.getElementById("documentList");
            files.forEach(file => {
                const listItem = document.createElement("li");
                listItem.classList.add("document-item");

                const link = document.createElement("a");
                link.href = `http://localhost:3000/download/${file}`;
                link.textContent = file;
                listItem.appendChild(link);

                // Botão de status
                const statusButton = document.createElement('button');
                statusButton.classList.add('status-button');
                statusButton.textContent = 'Status';
                statusButton.onclick = () => toggleStatus(file, statusButton);
                listItem.appendChild(statusButton);

                // Botão de exclusão
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
                deleteButton.textContent = "X";
                deleteButton.onclick = () => confirmDeletion(file, listItem);
                listItem.appendChild(deleteButton);

                documentListElement.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar documentos:', error);
        });
}

// Função para confirmar exclusão
function confirmDeletion(file, listItem) {
    const confirmation = confirm(`Você realmente deseja excluir o documento "${file}" permanentemente?`);
    if (confirmation) {
        // Lógica para remover o arquivo do servidor
        fetch(`http://localhost:3000/delete/${encodeURIComponent(file)}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    listItem.remove();
                    alert(`O documento "${file}" foi excluído com sucesso.`);
                } else {
                    alert('Erro ao excluir o documento.');
                }
            })
            .catch(error => {
                console.error('Erro ao excluir o documento:', error);
                alert('Erro ao excluir o documento.');
            });
    }
}

// Função para alternar o status
function toggleStatus(file, button) {
    const newStatus = prompt('Defina o novo status: Checado, Aprovado ou Reprovado', 'Checado');
    if (newStatus === 'Checado' || newStatus === 'Aprovado' || newStatus === 'Reprovado') {
        button.textContent = newStatus;
        button.className = `status-button ${newStatus.toLowerCase()}`;
        // Lógica para atualizar o status no servidor, se necessário
        fetch(`http://localhost:3000/update-status/${encodeURIComponent(file)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        }).catch(error => console.error('Erro ao atualizar o status:', error));
    } else {
        alert('Status inválido. Por favor, escolha entre Checado, Aprovado ou Reprovado.');
    }
}

document.addEventListener("DOMContentLoaded", loadDocuments);
