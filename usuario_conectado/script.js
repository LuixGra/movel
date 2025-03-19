document.addEventListener("DOMContentLoaded", () => {
    // Modo Escuro
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    darkModeToggle.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        if (isDarkMode) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.removeItem("darkMode");
        }
    });

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

    // Variáveis de controle
    let totalPrice = 0;
    let pedido = []; // Certifique-se de declarar a variável no escopo apropriado

    // Função para formatar o preço
    function formatPrice(price) {
        return price.toFixed(2).replace('.', ',');
    }

    // Função para atualizar o total do carrinho
    function updateTotalPrice() {
        const totalPriceElement = document.getElementById("total-price");
        totalPriceElement.textContent = `R$ ${formatPrice(totalPrice)}`;
    }

    // Adicionar ao carrinho
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const productElement = button.closest(".product");
            const priceElement = productElement.querySelector(".price");
            const priceText = priceElement.textContent.trim();
            const price = parseFloat(priceText.replace('R$', '').replace('.', '').replace(',', '.'));

            totalPrice += price;
            updateTotalPrice();

            // Armazena o nome do produto no array pedido
            const productName = productElement.querySelector("h3").textContent;
            pedido.push(productName);

            // Abre o modal de confirmação
            const modal = document.getElementById("popup-modal");
            const modalPrice = document.getElementById("modal-item-price");
            modalPrice.textContent = `R$ ${formatPrice(price)}`;
            modal.style.display = "block";
        });
    });

    // Fechar modal
    const closeModal = () => {
        document.getElementById("popup-modal").style.display = "none";
    };
    document.getElementById("modal-confirm-btn").addEventListener("click", closeModal);
    document.getElementById("modal-cancel-btn").addEventListener("click", closeModal);
    document.querySelector(".close").addEventListener("click", closeModal);

    // Atualiza dados do usuário
    const nome = localStorage.getItem("nome");
    const email = localStorage.getItem("email");
    const endereco = localStorage.getItem("endereco");
    document.getElementById("user-name").textContent = nome ? nome : "-";
    document.getElementById("user-address").textContent = endereco ? endereco : "-";
    document.getElementById("user-email").textContent = email ? email : "-";

    // Finalizar pedido
    const botao_finalizar = document.querySelector('#checkout-btn');
    botao_finalizar.addEventListener('click', () => {
        const userName = localStorage.getItem("nome") || "-";
        const userEmail = localStorage.getItem("email") || "-";
        const userEndereco = localStorage.getItem("endereco") || "-";

        console.log("Pedido Finalizado:");
        console.log("Produtos:", pedido);
        console.log("Nome:", userName);
        console.log("Email:", userEmail);
        console.log("Endereço:", userEndereco);
        console.log("Total: R$", totalPrice); 

        // Reseta o carrinho e o array de pedidos
        totalPrice = 0;
        updateTotalPrice();
        pedido = [];
    });
});
