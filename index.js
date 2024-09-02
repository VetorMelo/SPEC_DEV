document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Fazendo uma requisição para o arquivo JSON
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                // Login autorizado
                alert("Login bem-sucedido!");
                window.location.href = 'workflow.html'; // Redireciona para a página do sistema
            } else {
                // Login não autorizado - exibe mensagem de erro
                document.getElementById("errorMessage").style.display = "block";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
        });
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const loginButton = document.getElementById("loginButton");

            // Desativa o botão para evitar múltiplos envios
            loginButton.disabled = true;

            // Fazendo uma requisição para o arquivo JSON
            fetch('users.json')
                .then(response => response.json())
                .then(users => {
                    const user = users.find(user => user.email === email && user.password === password);
                    if (user) {
                        // Login autorizado
                        alert("Login bem-sucedido!");
                        window.location.href = 'workflow.html'; // Redireciona para a página do sistema
                    } else {
                        // Login não autorizado - exibe mensagem de erro
                        document.getElementById("errorMessage").style.display = "block";
                        loginButton.disabled = false; // Reativa o botão
                    }
                })
                .catch(error => {
                    console.error("Erro ao carregar o arquivo JSON:", error);
                    loginButton.disabled = false; // Reativa o botão em caso de erro
                });
        });

        // Protege contra mudanças na URL
        window.addEventListener('popstate', function(event) {
            if (document.location.pathname !== '/login.html') {
                window.location.href = '/login.html';
            }
        });