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

    // Função para abrir o modal
    window.openPopup = function() {
        document.getElementById("popup-modal").style.display = "flex"; // Exibe o modal
        document.body.classList.add("no-scroll"); // Impede o scroll quando o modal estiver aberto
    }

    // Função para fechar o modal
    function closePopup() {
        document.getElementById("popup-modal").style.display = "none"; // Esconde o modal
        document.body.classList.remove("no-scroll"); // Permite o scroll novamente
    }

    // Adiciona evento de clique para fechar o modal
    document.querySelector(".popup-modal .close").addEventListener("click", closePopup);
    
    // Filtro de Pesquisa
    const searchInput = document.getElementById("search-input");
    const products = document.querySelectorAll(".product");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            product.style.display = productName.includes(searchTerm) ? "block" : "none";
        });
    });

    // Filtro por Categoria
    const categoryButtons = document.querySelectorAll(".category-btn");
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            products.forEach(product => {
                product.style.display = (category === "todos" || product.dataset.category === category) ? "block" : "none";
            });
        });
    });

    // Slider do Banner Principal
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function changeSlide(next = true) {
        slides[currentSlide].classList.remove("active");
        currentSlide = next ? (currentSlide + 1) % slides.length : (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    prevButton.addEventListener("click", () => changeSlide(false));
    nextButton.addEventListener("click", () => changeSlide());
    setInterval(() => changeSlide(), 5000);
});
