/* ===============================================
   DMD ERECTORS WEBSITE - JAVASCRIPT CODE
   =============================================== */

// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Open/Close mobile menu when hamburger clicked
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when navigation link clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.getElementById('scrollTop');

// Show button when scrolled down
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Scroll to top smoothly when clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== SMOOTH SCROLL NAVIGATION ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default if there's a valid target
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // GET FORM VALUES
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // ========== VALIDATION ==========
    
    // Check if required fields are empty
    if (!name || !email || !phone || !service || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Validate phone number (10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        showMessage('Please enter a valid 10-digit phone number.', 'error');
        return;
    }

    // ========== SUCCESS MESSAGE ==========
    
    // Log form data to console
    const formData = {
        name: name,
        email: email,
        phone: phone,
        company: company,
        service: service,
        message: message,
        timestamp: new Date().toLocaleString()
    };
    
    console.log('Form Submitted:', formData);

    // Show success message
    showMessage('✓ Thank you! Your message has been sent successfully. We will contact you within 24 hours.', 'success');

    // Reset the form
    contactForm.reset();

    // Scroll to form to show message
    contactForm.scrollIntoView({ behavior: 'smooth' });
});

// ==================== SHOW MESSAGE FUNCTION ====================
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ==================== FORM FIELD ANIMATIONS ====================
const formFields = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formFields.forEach(field => {
    // Scale up when focused
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
    });
    
    // Scale back down when blurred
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation when element comes into view
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards, portfolio cards, testimonial cards, and stat boxes
const animatedElements = document.querySelectorAll(
    '.service-card, .portfolio-card, .testimonial-card, .stat-box'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ==================== PAGE LOAD COMPLETE ====================
window.addEventListener('load', () => {
    console.log('✓ DMD Erectors Website Loaded Successfully!');
    console.log('');
    console.log('📞 Contact Form Data (submitted forms will appear here):');
    console.log('');
});

// ==================== HELPER FUNCTIONS ====================

// Function to validate email
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to validate phone
function isValidPhone(phone) {
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length === 10;
}

// Function to validate form inputs
function validateForm(name, email, phone, service, message) {
    if (!name || !email || !phone || !service || !message) {
        return { valid: false, message: 'Please fill in all required fields.' };
    }
    
    if (!isValidEmail(email)) {
        return { valid: false, message: 'Please enter a valid email address.' };
    }
    
    if (!isValidPhone(phone)) {
        return { valid: false, message: 'Please enter a valid 10-digit phone number.' };
    }
    
    return { valid: true, message: 'Form is valid.' };
}

// ==================== KEYBOARD SHORTCUTS ====================

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ==================== ADVANCED FEATURES ====================

// Track form submissions
let submissionCount = 0;

contactForm.addEventListener('submit', function(e) {
    // This runs after the form submission handler above
    submissionCount++;
    
    // You could send this to an analytics service
    console.log(`Total form submissions: ${submissionCount}`);
});

// ==================== UTILITY FUNCTIONS ====================

// Get current date and time
function getCurrentDateTime() {
    const now = new Date();
    return {
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        fullDateTime: now.toLocaleString()
    };
}

// Format phone number for display
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `+91 ${match[1]} ${match[2]} ${match[3]}`;
    }
    return phone;
}

// ==================== LOCAL STORAGE (Optional - for advanced use) ====================

// Save form draft to browser's local storage
function saveDraft() {
    const draft = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    localStorage.setItem('contactFormDraft', JSON.stringify(draft));
    console.log('Draft saved to local storage');
}

// Load form draft from browser's local storage (optional)
function loadDraft() {
    const draft = localStorage.getItem('contactFormDraft');
    if (draft) {
        const data = JSON.parse(draft);
        document.getElementById('name').value = data.name || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('company').value = data.company || '';
        document.getElementById('service').value = data.service || '';
        document.getElementById('message').value = data.message || '';
        console.log('Draft loaded from local storage');
    }
}

// Clear form draft
function clearDraft() {
    localStorage.removeItem('contactFormDraft');
    console.log('Draft cleared');
}

// Auto-save draft every 30 seconds (optional)
// Uncomment the next line to enable auto-save
// setInterval(saveDraft, 30000);

// ==================== ANALYTICS (Optional) ====================

// Track page sections viewed
const sections = document.querySelectorAll('section');
const viewedSections = new Set();

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id || 'unnamed';
            viewedSections.add(sectionId);
        }
    });
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ==================== DEBUG MODE ====================

// Uncomment window.DEBUG = true; to enable debug logs
// window.DEBUG = false;

// if (window.DEBUG) {
//     console.log('Debug Mode Enabled');
//     console.log('Viewed Sections:', viewedSections);
// }

// ==================== INITIALIZATION ====================

console.log('==============================');
console.log('DMD Erectors Website');
console.log('Version 1.0');
console.log('==============================');
console.log('');
console.log('Features Enabled:');
console.log('✓ Mobile Navigation');
console.log('✓ Smooth Scrolling');
console.log('✓ Form Validation');
console.log('✓ Scroll Animations');
console.log('✓ Scroll to Top Button');
console.log('');
console.log('Form Validation Rules:');
console.log('- Name: Required, any text');
console.log('- Email: Required, valid email format');
console.log('- Phone: Required, 10-digit number');
console.log('- Service: Required, select from dropdown');
console.log('- Message: Required, any text');
console.log('');
console.log('Phone Number Format: +91 XXXXX XXXXX');
console.log('Email Pattern: example@domain.com');
console.log('');