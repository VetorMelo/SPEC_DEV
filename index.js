// script.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const allowedEmails = ["autor@gmail.com", "checador@gmail.com", "aprovador@gmail.com", "contatomelo2@gmail.com"];
    const correctPassword = "mudar123";

    if (allowedEmails.includes(email) && password === correctPassword) {
        alert("Login bem-sucedido!");
        window.location.href = "sistema.html"; // Redireciona para o sistema de cadastro de documentos
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
});


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const allowedEmails = ["autor@gmail.com", "checador@gmail.com", "aprovador@gmail.com", "contatomelo2@gmail.com"];
    const correctPassword = "mudar123";

    if (allowedEmails.includes(email) && password === correctPassword) {
        // Login autorizado - redireciona para workflow.html
        window.location.href = 'workflow.html';
    } else {
        // Login não autorizado - exibe mensagem de erro
        document.getElementById("errorMessage").style.display = "block";
    }
});