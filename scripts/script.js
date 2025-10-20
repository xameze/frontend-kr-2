document.addEventListener('DOMContentLoaded', function() {
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn) {
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

    
    const resumeModal = document.getElementById('resumeModal');
    const uploadResumeBtn = document.getElementById('uploadResumeBtn');
    const closeResumeModal = document.getElementById('closeResumeModal');
    const cancelUpload = document.getElementById('cancelUpload');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const resumeFile = document.getElementById('resumeFile');
    const confirmUpload = document.getElementById('confirmUpload');
    const uploadArea = document.getElementById('uploadArea');

    
    uploadResumeBtn.addEventListener('click', () => {
        resumeModal.classList.add('active');
    });

    
    function closeResumeModalFunc() {
        resumeModal.classList.remove('active');
        resumeFile.value = '';
        confirmUpload.disabled = true;
    }

    closeResumeModal.addEventListener('click', closeResumeModalFunc);
    cancelUpload.addEventListener('click', closeResumeModalFunc);

    
    selectFileBtn.addEventListener('click', () => {
        resumeFile.click();
    });

    resumeFile.addEventListener('change', function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            const validTypes = ['application/pdf', 'application/msword', 
                              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024) {
                confirmUpload.disabled = false;
                uploadArea.innerHTML = `
                    <div class="upload-icon">✅</div>
                    <p>Файл выбран: ${file.name}</p>
                    <p>Размер: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                `;
            } else {
                alert('Пожалуйста, выберите файл PDF или DOC до 5MB');
                this.value = '';
            }
        }
    });

    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            resumeFile.files = e.dataTransfer.files;
            const event = new Event('change');
            resumeFile.dispatchEvent(event);
        }
    });

    
    confirmUpload.addEventListener('click', () => {
        const file = resumeFile.files[0];
        if (file) {
            
            alert(`Резюме "${file.name}" успешно загружено!`);
            closeResumeModalFunc();
            
            
            const downloadLink = document.querySelector('a[download]');
            if (downloadLink) {
                const newBlob = URL.createObjectURL(file);
                downloadLink.href = newBlob;
            }
        }
    });

    
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeContactModal');
    const cancelContact = document.getElementById('cancelContact');
    const contactForm = document.getElementById('contactForm');
    const sendMessage = document.getElementById('sendMessage');

    
    window.openContactModal = function() {
        contactModal.classList.add('active');
    };

    
    function closeContactModalFunc() {
        contactModal.classList.remove('active');
        contactForm.reset();
    }

    closeContactModal.addEventListener('click', closeContactModalFunc);
    cancelContact.addEventListener('click', closeContactModalFunc);

    
    sendMessage.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            
            alert(`Сообщение от ${name} отправлено!`);
            closeContactModalFunc();
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });

    
    window.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            closeResumeModalFunc();
        }
        if (e.target === contactModal) {
            closeContactModalFunc();
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

    
    document.querySelectorAll('.section-card, .mini-project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

function formatDateForDiary(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'short' });
    return `${day} ${month}`;
}