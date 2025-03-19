// Código para alternar o modo escuro
document.addEventListener("DOMContentLoaded", () => {
     // Modo Escuro
     const darkModeToggle = document.getElementById("dark-mode-toggle");

     // Verifica se o modo escuro está ativado no localStorage
     if (localStorage.getItem("darkMode") === "enabled") {
         document.body.classList.add("dark-mode");
     }
 
     darkModeToggle.addEventListener("click", () => {
         const isDarkMode = document.body.classList.toggle("dark-mode");
         
         // Armazena a escolha do usuário no localStorage
         if (isDarkMode) {
             localStorage.setItem("darkMode", "enabled");
         } else {
             localStorage.removeItem("darkMode");
         }
     });
});

// Função para o envio do formulário
document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio do formulário

    // Pega os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const endereco = document.getElementById("endereco").value;

    // Salva os dados no localStorage
    localStorage.setItem("nome", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("endereco", endereco);

    // Redireciona para a próxima página
    window.location.href = "usuario_conectado/index.html";
});
