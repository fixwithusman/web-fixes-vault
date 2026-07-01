/**
 * Lead Generation Form & Theme Controller
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Theme Switcher Logic (Local Storage Persistent)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    const rootElement = document.documentElement;

    // Read stored user choices or fallback to system configuration settings
    const currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Initialize current UI layout runtime state
    if (currentTheme === 'dark') {
        rootElement.setAttribute('data-theme', 'dark');
        themeText.textContent = 'Light Mode';
    } else {
        rootElement.removeAttribute('data-theme');
        themeText.textContent = 'Dark Mode';
    }

    // Toggle interaction listener
    themeToggleBtn.addEventListener('click', () => {
        const isDark = rootElement.hasAttribute('data-theme');
        
        if (isDark) {
            rootElement.removeAttribute('data-theme');
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            rootElement.setAttribute('data-theme', 'dark');
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================================================
    // 2. Validation & Request Pipeline
    // ==========================================================================
    const leadForm = document.getElementById('leadForm');
    const formCard = document.getElementById('formCard');
    const successState = document.getElementById('successState');
    
    const fields = {
        name: document.getElementById('userName'),
        phone: document.getElementById('userPhone'),
        service: document.getElementById('serviceType'),
        message: document.getElementById('userMessage')
    };

    const toggleFieldError = (inputElement, isValid) => {
        const formGroup = inputElement.parentElement;
        if (isValid) {
            formGroup.classList.remove('invalid-field');
        } else {
            formGroup.classList.add('invalid-field');
        }
    };

    const validateField = (field) => {
        let isValid = true;
        const value = field.value.trim();

        if (field === fields.name) {
            isValid = value.length > 0;
        } 
        else if (field === fields.phone) {
            const phoneRegex = /^\d{11}$/;
            isValid = phoneRegex.test(value);
        } 
        else if (field === fields.service) {
            isValid = value !== "" && value !== null;
        } 
        else if (field === fields.message) {
            isValid = value.length > 0;
        }

        toggleFieldError(field, isValid);
        return isValid;
    };

    // Live feedback listener validation loops
    Object.values(fields).forEach(field => {
        const eventType = field.tagName === 'SELECT' ? 'change' : 'input';
        field.addEventListener(eventType, () => validateField(field));
    });

    // Intercept form dispatch actions
    leadForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        let isFormValid = true;

        Object.values(fields).forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            formCard.classList.add('hidden');
            successState.classList.remove('hidden');
        }
    });
});