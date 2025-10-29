// app.js

document.addEventListener("DOMContentLoaded", function() {
    // Busca el espacio reservado en el HTML
    const menuPlaceholder = document.getElementById("menu-placeholder");

    // Si encuentra el espacio, carga el menú
    if (menuPlaceholder) {
        fetch("/menu.html") // "Llama" a tu archivo de menú
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el menú.");
                }
                return response.text();
            })
            .then(data => {
                // Inyecta el código del menú dentro del div
                menuPlaceholder.innerHTML = data;
                // Una vez cargado el menú, activa los dropdowns
                initializeDropdowns();
            })
            .catch(error => {
                console.error("Error:", error);
                menuPlaceholder.innerHTML = "<p>Error al cargar el menú.</p>";
            });
    }
});

function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.navbar .dropdown');

    dropdowns.forEach(dropdown => {
        // Eventos para mostrar/ocultar en hover (escritorio) y click (móvil)
        dropdown.addEventListener('mouseenter', () => dropdown.classList.add('active'));
        dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('active'));
        
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (event) => {
            // Previene el comportamiento por defecto en móviles para abrir el menú
            if (window.innerWidth <= 768) {
                if (!dropdown.classList.contains('active')) {
                    event.preventDefault();
                    // Cierra otros menús antes de abrir el nuevo
                    dropdowns.forEach(d => d.classList.remove('active'));
                    dropdown.classList.add('active');
                }
            }
        });
    });
}