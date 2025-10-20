document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            const isVisible = navList.style.display === 'flex';
            navList.style.display = isVisible ? 'none' : 'flex';
            
            if (!isVisible) {
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '100%';
                navList.style.left = '0';
                navList.style.right = '0';
                navList.style.background = 'var(--background)';
                navList.style.padding = '1rem';
                navList.style.boxShadow = 'var(--shadow-lg)';
                navList.style.gap = '1rem';
            }
        });
    }

    
    document.addEventListener('click', function(e) {
        if (navList && navList.style.display === 'flex' && 
            !e.target.closest('.nav') && 
            !e.target.closest('.mobile-menu-btn')) {
            navList.style.display = 'none';
        }
    });

    
    const contactForm = document.getElementById('contactFormMain');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactMessage = document.getElementById('contactMessage');
    const submitBtn = document.querySelector('.btn-submit');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const closeSuccess = document.getElementById('closeSuccess');

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,50}$/;

    
    if (contactName) {
        contactName.addEventListener('input', function() {
            validateName();
        });
    }

    if (contactEmail) {
        contactEmail.addEventListener('input', function() {
            validateEmail();
        });
    }

    if (contactMessage) {
        contactMessage.addEventListener('input', function() {
            validateMessage();
        });
    }

    
    function validateName() {
        const value = contactName.value.trim();
        
        if (!value) {
            showError(contactName, nameError, 'Имя обязательно для заполнения');
            return false;
        }
        
        if (!namePattern.test(value)) {
            showError(contactName, nameError, 'Имя должно содержать только буквы и быть от 2 до 50 символов');
            return false;
        }
        
        showSuccess(contactName, nameError);
        return true;
    }

    function validateEmail() {
        const value = contactEmail.value.trim();
        
        if (!value) {
            showError(contactEmail, emailError, 'Email обязателен для заполнения');
            return false;
        }
        
        if (!emailPattern.test(value)) {
            showError(contactEmail, emailError, 'Введите корректный email адрес');
            return false;
        }
        
        showSuccess(contactEmail, emailError);
        return true;
    }

    function validateMessage() {
        const value = contactMessage.value.trim();
        
        if (!value) {
            showError(contactMessage, messageError, 'Сообщение обязательно для заполнения');
            return false;
        }
        
        if (value.length < 10) {
            showError(contactMessage, messageError, 'Сообщение должно содержать не менее 10 символов');
            return false;
        }
        
        if (value.length > 1000) {
            showError(contactMessage, messageError, 'Сообщение не должно превышать 1000 символов');
            return false;
        }
        
        showSuccess(contactMessage, messageError);
        return true;
    }

    
    function showError(input, errorElement, message) {
        if (input && errorElement) {
            input.parentElement.classList.add('error');
            input.parentElement.classList.remove('success');
            errorElement.textContent = message;
        }
    }

    
    function showSuccess(input, errorElement) {
        if (input && errorElement) {
            input.parentElement.classList.remove('error');
            input.parentElement.classList.add('success');
            errorElement.textContent = '';
        }
    }

    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.classList.add('loading');
                    submitBtn.textContent = '';
                }
                
                
                setTimeout(() => {
                    
                    const formData = {
                        name: contactName.value.trim(),
                        email: contactEmail.value.trim(),
                        message: contactMessage.value.trim(),
                        timestamp: new Date().toISOString()
                    };
                    
                    
                    saveContactMessage(formData);
                    
                    
                    showSuccessModal();
                    
                    
                    contactForm.reset();
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('loading');
                        submitBtn.textContent = '📨 Отправить сообщение';
                    }
                    
                    
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('success');
                    });
                    
                }, 2000);
            } else {
                
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }

    
    function saveContactMessage(formData) {
        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        console.log('Сообщение сохранено:', formData);
    }

    
    function showSuccessModal() {
        if (successModal) {
            successModal.classList.add('active');
        }
    }

    function closeSuccessModalFunc() {
        if (successModal) {
            successModal.classList.remove('active');
        }
    }

    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', closeSuccessModalFunc);
    }

    if (closeSuccess) {
        closeSuccess.addEventListener('click', closeSuccessModalFunc);
    }

    
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModalFunc();
        }
    });

    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('.contact-item, .additional-info').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    
    let draftTimeout;
    if (contactForm) {
        contactForm.addEventListener('input', function() {
            clearTimeout(draftTimeout);
            draftTimeout = setTimeout(saveDraft, 1000);
        });
    }

    function saveDraft() {
        const draft = {
            name: contactName ? contactName.value : '',
            email: contactEmail ? contactEmail.value : '',
            message: contactMessage ? contactMessage.value : ''
        };
        localStorage.setItem('contactDraft', JSON.stringify(draft));
    }

    
    function loadDraft() {
        const draft = JSON.parse(localStorage.getItem('contactDraft'));
        if (draft && contactName && contactEmail && contactMessage) {
            contactName.value = draft.name || '';
            contactEmail.value = draft.email || '';
            contactMessage.value = draft.message || '';
        }
    }

    
    function clearDraft() {
        localStorage.removeItem('contactDraft');
    }

    
    if (contactForm) {
        const originalSubmit = contactForm.onsubmit;
        contactForm.onsubmit = function(e) {
            if (originalSubmit) originalSubmit.call(this, e);
            clearDraft();
        };
    }

    
    loadDraft();
});