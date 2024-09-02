document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginButton = document.querySelector("button[type='submit']");
    const errorMessage = document.getElementById("errorMessage");

    // Desativa o botão para evitar múltiplos envios
    loginButton.disabled = true;

    // Requisição ao arquivo JSON local
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
                errorMessage.style.display = "block";
                loginButton.disabled = false; // Reativa o botão
            }
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
            loginButton.disabled = false; // Reativa o botão em caso de erro
        });
});


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginButton = document.querySelector("button[type='submit']");
    const errorMessage = document.getElementById("errorMessage");

    loginButton.disabled = true; // Desativa o botão para evitar múltiplos envios

    // Requisição para o servidor de autenticação
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Armazena o token no localStorage
            localStorage.setItem('token', data.token);
            alert("Login bem-sucedido!");
            window.location.href = 'workflow.html'; // Redireciona para a página do sistema
        } else {
            // Login não autorizado - exibe mensagem de erro
            errorMessage.style.display = "block";
        }
    })
    .catch(error => {
        console.error("Erro ao fazer login:", error);
    })
    .finally(() => {
        loginButton.disabled = false; // Reativa o botão após o processo
    });
});


// Função para proteger páginas restritas
function checkAuthentication() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html'; // Redireciona para a página de login
    } else {
        fetch('/protected', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token'); // Remove o token inválido
                window.location.href = 'index.html'; // Redireciona para a página de login
            }
        })
        .catch(error => {
            console.error("Erro ao verificar a autenticação:", error);
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });
    }
}

// Chama a função ao carregar uma página protegida
if (window.location.pathname === '/workflow.html') {
    checkAuthentication();
}
