// Real-time date and time display
function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    const dateTimeElement = document.getElementById('currentDateTime');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}

// Update date/time every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        const isDark = document.body.classList.contains('dark-mode');
        toggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        toggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
}

// Load dark mode preference
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeIcon();
}

// Search functionality
function searchContent() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    const allContent = document.body.textContent.toLowerCase();
    const sentences = document.body.textContent.split(/[.!?]+/);

    resultsContainer.innerHTML = '';

    if (query.length < 3) {
        resultsContainer.innerHTML = '<p>Please enter at least 3 characters to search.</p>';
        return;
    }

    const matches = sentences.filter(sentence =>
        sentence.toLowerCase().includes(query)
    ).slice(0, 10); // Limit to 10 results

    if (matches.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    matches.forEach(match => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'search-result';
        resultDiv.innerHTML = highlightText(match.trim(), query);
        resultsContainer.appendChild(resultDiv);
    });
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Reading progress indicator
function updateReadingProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Simple encryption demo
function simpleEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            result += String.fromCharCode(((charCode - 65 + key) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            result += String.fromCharCode(((charCode - 97 + key) % 26) + 97);
        } else {
            // Non-alphabetic characters remain unchanged
            result += text[i];
        }
    }
    return result;
}

function simpleDecrypt(text, key) {
    return simpleEncrypt(text, 26 - key);
}

// Risk assessment calculator
function calculateRisk() {
    const sensitivity = parseInt(document.getElementById('dataSensitivity').value);
    const exposure = parseInt(document.getElementById('exposureLevel').value);
    const controls = parseInt(document.getElementById('securityControls').value);

    const riskScore = (sensitivity * exposure) / controls;
    let riskLevel = '';

    if (riskScore < 2) riskLevel = 'Low';
    else if (riskScore < 5) riskLevel = 'Medium';
    else if (riskScore < 8) riskLevel = 'High';
    else riskLevel = 'Critical';

    document.getElementById('riskResult').innerHTML = `
        <div class="alert alert-${riskLevel.toLowerCase() === 'low' ? 'success' : riskLevel.toLowerCase() === 'medium' ? 'warning' : 'danger'}">
            <strong>Risk Score: ${riskScore.toFixed(2)}</strong><br>
            Risk Level: <strong>${riskLevel}</strong>
        </div>
    `;
}

// Contact form validation
function validateContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let isValid = true;
    let errors = [];

    // Name validation
    if (name.length < 2) {
        isValid = false;
        errors.push('Name must be at least 2 characters long.');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        errors.push('Please enter a valid email address.');
    }

    // Message validation
    if (message.length < 10) {
        isValid = false;
        errors.push('Message must be at least 10 characters long.');
    }

    const errorDiv = document.getElementById('formErrors');
    if (!isValid) {
        errorDiv.innerHTML = errors.map(error => `<div class="alert alert-danger">${error}</div>`).join('');
        errorDiv.style.display = 'block';
    } else {
        errorDiv.style.display = 'none';
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    }
}

// Glossary functionality
const glossaryTerms = {
    'WMSN': 'Wireless Medical Sensor Network - A network of sensors that monitor patient health data wirelessly.',
    'HIPAA': 'Health Insurance Portability and Accountability Act - US law protecting patient health information.',
    'GDPR': 'General Data Protection Regulation - EU regulation for data protection and privacy.',
    'AES': 'Advanced Encryption Standard - A symmetric encryption algorithm widely used for securing data.',
    'ECC': 'Elliptic Curve Cryptography - Public-key cryptography based on elliptic curves, efficient for resource-constrained devices.',
    'DoS': 'Denial of Service - An attack that makes a service unavailable to its intended users.',
    'RBAC': 'Role-Based Access Control - Access control method based on user roles within an organization.',
    'ABE': 'Attribute-Based Encryption - Encryption scheme where access is determined by user attributes.',
    'IoT': 'Internet of Things - Network of physical devices connected to the internet.',
    'Blockchain': 'Distributed ledger technology that maintains a continuously growing list of records secured from tampering.'
};

function showGlossary() {
    const modal = document.getElementById('glossaryModal');
    const content = document.getElementById('glossaryContent');

    content.innerHTML = Object.entries(glossaryTerms)
        .map(([term, definition]) => `<div class="mb-3"><strong>${term}:</strong> ${definition}</div>`)
        .join('');

    if (modal) {
        modal.style.display = 'block';
    }
}

function closeGlossary() {
    const modal = document.getElementById('glossaryModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Event listeners for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Load dark mode preference
    loadDarkModePreference();

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', searchContent);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchContent();
            }
        });
    }

    // Reading progress
    window.addEventListener('scroll', updateReadingProgress);

    // Encryption demo
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');

    if (encryptBtn) {
        encryptBtn.addEventListener('click', function() {
            const input = document.getElementById('encryptInput').value;
            const key = parseInt(document.getElementById('encryptKey').value) || 3;
            const result = simpleEncrypt(input, key);
            document.getElementById('encryptOutput').value = result;
        });
    }

    if (decryptBtn) {
        decryptBtn.addEventListener('click', function() {
            const input = document.getElementById('decryptInput').value;
            const key = parseInt(document.getElementById('decryptKey').value) || 3;
            const result = simpleDecrypt(input, key);
            document.getElementById('decryptOutput').value = result;
        });
    }

    // Risk calculator
    const calculateBtn = document.getElementById('calculateRiskBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateRisk);
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }

    // Glossary
    const glossaryBtn = document.getElementById('glossaryBtn');
    const closeGlossaryBtn = document.getElementById('closeGlossary');

    if (glossaryBtn) {
        glossaryBtn.addEventListener('click', showGlossary);
    }
    if (closeGlossaryBtn) {
        closeGlossaryBtn.addEventListener('click', closeGlossary);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('glossaryModal');
        if (event.target === modal) {
            closeGlossary();
        }
    });

    // Smooth scrolling for navigation links (if any remain)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});