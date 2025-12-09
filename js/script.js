// Theme Management
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateLogos(newTheme);
}

function updateLogos(theme) {
    const logos = document.querySelectorAll('.logo-img');
    const logoSrc = theme === 'dark' ? 'assets/logo-dark.png' : 'assets/logo-light.png';
    logos.forEach(img => img.src = logoSrc);
}

// Initialize Theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateLogos(savedTheme);

    // Initialize Anonymous Listener if element exists
    const anonymousCheckbox = document.getElementById('anonymous');
    if (anonymousCheckbox) {
        anonymousCheckbox.addEventListener('change', function () {
            const ageInput = document.getElementById('age');
            const genreSelect = document.getElementById('genre');

            if (this.checked) {
                ageInput.disabled = true;
                genreSelect.disabled = true;
                ageInput.value = '';
                genreSelect.value = '';
            } else {
                ageInput.disabled = false;
                genreSelect.disabled = false;
            }
        });
    }

    // Custom Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isActive = header.classList.contains('active');

            // Close all other items
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                header.classList.add('active');
                const body = header.nextElementSibling;
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });
});

// Navigation Functions
function navigateToProfile() {
    const checkbox = document.getElementById('accept-terms');
    if (checkbox && !checkbox.checked) {
        alert('Veuillez accepter les conditions de confidentialité pour continuer.');
        return;
    }
    window.location.href = 'profile.html';
}

function navigateToMain() {
    window.location.href = 'main.html';
}

function navigateToSocial() {
    window.location.href = 'social.html';
}

function skipProfile() {
    window.location.href = 'main.html';
}

function navigateToAlerts() {
    window.location.href = 'alerts.html';
}

function navigateToStatistics() {
    window.location.href = 'statistics.html';
}

function navigateToCommunity() {
    window.location.href = 'community.html';
}

function connectSocial(network) {
    const statusId = 'status-' + network.toLowerCase();
    const statusEl = document.getElementById(statusId);
    const card = event.currentTarget;
    const button = card.querySelector('.btn-connect');

    if (statusEl.textContent === 'Non connecté') {
        // Simulation de connexion
        setTimeout(() => {
            statusEl.textContent = 'Connecté ✓';
            statusEl.classList.add('connected');
            button.textContent = 'Déconnecter';
            button.classList.add('connected');
            alert(`${network} connecté avec succès! La surveillance est maintenant active.`);
        }, 500);
    } else {
        // Déconnexion
        statusEl.textContent = 'Non connecté';
        statusEl.classList.remove('connected');
        button.textContent = 'Connecter';
        button.classList.remove('connected');
        alert(`${network} déconnecté.`);
    }
}
